using api.Models.Requests;
using api.Models.Responses;

namespace api.Services.Interfaces
{
    public interface IWeatherService
    {
        ForecastResponse GetForecast(AddressRequest address);
    }
}