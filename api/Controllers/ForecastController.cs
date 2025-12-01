using System.Formats.Asn1;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using api.Models.Requests;
using System.ComponentModel.DataAnnotations;

namespace api.Controllers
{
    [ApiController]
    [Route("api/forecast")]
    public class ForecastController : ControllerBase
    {
        private readonly IWeatherService _weatherService;

        public ForecastController(IWeatherService weatherService)
        {
            _weatherService = weatherService; 
        }

        // TODO: Eventually, weatherservice should throw custom exceptions
        // TODO: Add logging
        // TODO: Eventually, refactor weather service to methods that return Result<T, E> types,
        // so that model validation can occur at controller level instead of service level
        [HttpPost]
        public async Task<IActionResult> GetForecast([FromBody] AddressRequest address)
        {
            try{
                var forecast = await _weatherService.GetForecast(address);
                return Ok(forecast);
            }
            catch (ValidationException ex)
            {
                return UnprocessableEntity(new { error = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(502, ex.Message);
            }
        }
    }
}