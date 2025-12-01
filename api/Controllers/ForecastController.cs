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

        [HttpPost]
        public async Task<IActionResult> GetForecast([FromBody] AddressRequest address)
        {
            try{
                var forecast = await _weatherService.GetForecast(address);
                return Ok(forecast);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}