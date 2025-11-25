using api.Models.External;
using api.Models.Requests;
using api.Models.Responses;
using api.Services.Interfaces;
using System.Net;

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
        public ForecastResponse GetForecast(AddressRequest address)
        {
            // Dummy implementation for example purpose
            return new ForecastResponse(
                new ForecastAddress("123 Main St", "Anytown", "CA", "12345"),
                new Data(new List<ForecastPeriod>
                {
                    new ForecastPeriod(1, "Monday", true, 75, "F", null, "25mph", "NW", "Icon", "Day", "Sunny all day")
                })
            );
        }
        public async Task<(double x, double y)> GetCoordinatesFromAddressAsync(AddressRequest address)
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

            Coordinates coordinates = res.Result.AddressMatches.First().Coordinates;
            return (coordinates.X, coordinates.Y);
        }   
        public async Task<string> GetGridpointsFromGeoCodeAsync(double x, double y)
        {
            
            NwsGridResponse res = await _nwsClient.GetFromJsonAsync<NwsGridResponse>(
                $"points/{y},{x}"
            );

            return res.Properties.Forecast;
        }         
    }



}