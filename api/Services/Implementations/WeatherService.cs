using api.Models.External;
using api.Models.Requests;
using api.Models.Responses;
using api.Services.Interfaces;
using System.Net;

// TODO: Logging and error handling, retries, etc.

namespace api.Services.Implementations
{

    public class WeatherService : IWeatherService
    {
        
        private readonly HttpClient _geoCodeClient;
        private readonly HttpClient _nwsClient;

        public WeatherService(IHttpClientFactory httpClientFactory)
        {
            _geoCodeClient = httpClientFactory.CreateClient("GeocodeClient");;
            _nwsClient = httpClientFactory.CreateClient("NwsClient");
        }
        public async Task<ForecastResponse> GetForecast(AddressRequest address)
        {
            // 1) Geocode the address to lat/lon 
            // For now, take the first result TODO: offer multiple/no result handlers
            AddressMatch addressMatch = await GetCoordinatesFromAddressAsync(address);
            Coordinates coordinates   = addressMatch.Coordinates;

            // 2) Get the NWS gridpoints from lat/long 
            NwsGridResponse gridResponse = await GetGridpointsFromGeoCodeAsync(
                coordinates.X,
                coordinates.Y
            );
            string forecastUrl = gridResponse.Properties.Forecast;

            // 3) Retrieve the 7-day forecast from the gridpoints
            NwsForecastResponse forecastResponse = await GetForecastFromGridResponseAsync(forecastUrl);

            // 4) Map the forecast to our internal model and return
            ForecastResponse response = new ForecastResponse
            (
                addressMatch.MatchedAddress,
                coordinates.Y,
                coordinates.X,
                new Data(
                     [.. forecastResponse.Properties.Periods.Select(p => new ForecastPeriod
                     (
                        p.Number,
                        p.Name,
                        p.IsDaytime,
                        p.Temperature,
                        p.TemperatureUnit,
                        null,
                        p.Windspeed,
                        p.WindDirection,
                        p.Icon,
                        p.ShortForecast,
                        p.DetailedForecast
                     ))]
                )
            );
            return response; 
        }

        private async Task<AddressMatch> GetCoordinatesFromAddressAsync(AddressRequest address)
        {
            string street = address.Street.Trim(); 
            string city   = address.City.Trim();
            string state  = address.State.Trim();
            string zip    = address.Zip.Trim();

            string encodedAddress = WebUtility.UrlEncode($"{street}, {city}, {state} {zip}");
            Console.WriteLine($"Encoded Address: {encodedAddress}");
            Console.WriteLine($"Request URL: locations/onelineaddress?address={encodedAddress}&benchmark=4&format=json");
            GeocodeRootResponse res = await _geoCodeClient.GetFromJsonAsync<GeocodeRootResponse>(
                $"locations/onelineaddress?address={encodedAddress}&benchmark=4&format=json"
            );

            AddressMatch addressMatch = res.Result.AddressMatches.First();
            return addressMatch;
        }   
        private async Task<NwsGridResponse> GetGridpointsFromGeoCodeAsync(double x, double y)
        {
            
            NwsGridResponse res = await _nwsClient.GetFromJsonAsync<NwsGridResponse>(
                $"points/{y},{x}"
            );

            return res; 
        }         

        private async Task<NwsForecastResponse> GetForecastFromGridResponseAsync(string forecastUrl)
        {
            NwsForecastResponse res = await _nwsClient.GetFromJsonAsync<NwsForecastResponse>(
                forecastUrl.Replace("https://api.weather.gov/", "")
            );

            return res;
        }
    }



}