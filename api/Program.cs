using System.Net;
using System.Net.Http.Headers;
using api.Services.Interfaces;
using api.Services.Implementations;
using Microsoft.AspNetCore.Mvc; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IWeatherService, WeatherService>();
builder.Services.AddControllers(); 

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string>()?.Split(",");
        var allowedMethods = builder.Configuration.GetSection("CorsSettings:AllowedMethods").Get<string>()?.Split(",");
        var allowedHeaders = builder.Configuration.GetSection("CorsSettings:AllowedHeaders").Get<string>()?.Split(",");

        if (allowedOrigins != null)
        {
            policy.WithOrigins(allowedOrigins) 
                .AllowAnyMethod()
                .AllowAnyHeader(); 

        }
    });
});
// 1) Configure Httpclient for Geocoding API
// We are using named clients for multiple configurations 
builder.Services.AddHttpClient("GeocodeClient", client =>
{
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json")
    );
    client.BaseAddress = new Uri("https://geocoding.geo.census.gov/geocoder/");
});

builder.Services.AddHttpClient("NwsClient", client =>
{
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/geo+json")
    );
    client.BaseAddress = new Uri("https://api.weather.gov/");
    client.DefaultRequestHeaders.UserAgent.ParseAdd("WeatherForecastApp (https://github.com/khart/WeatherForecastApp)");
}); 

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseCors("CorsPolicy");

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

public partial class Program { } // Make the implicit Program class public for testing
