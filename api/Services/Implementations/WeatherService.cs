using api.Models.External;
using api.Models.Requests;
using api.Models.Responses;
using api.Services.Interfaces;

namespace api.Services.Implementations
{

    public class WeatherService : IWeatherService
    {
        
        private readonly HttpClient _geoCodeClient;

        public WeatherService(IHttpClientFactory httpClientFactory)
        {
            _geoCodeClient = httpClientFactory.CreateClient("GeocodeClient");;
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
            string street = request.Street.Trim(); 
            string city   = request.City.Trim();
            string state  = request.State.Trim();
            string zip    = request.Zip.Trim();

            string encodedAddress = WebUtility.UrlEncode($"{street}, {city}, {state} {zip}");

            GeoCodeRootResponse res = await _geoCodeClient.GetFromJsonAsync<GeoCodeRootResponse>(
                $"locations/onelineaddress?address={encodedAddress}&benchmark=4&format=json"
            );

            Coordinates coordinates = res.Result.AddressMatches.First().Coordinates;
            return (coordinates.X, coordinates.Y);
        }    
    }

}