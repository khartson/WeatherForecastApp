namespace api.Models.Responses
{
    public record ForecastPeriod(
        int Number,
        string Name,
        bool IsDaytime,
        int Temperature,
        string TemperatureUnit,
        PrecipitationForecast? ProbabilityOfPrecipitation,
        string Windspeed,
        string WindDirection,
        string Icon,
        string ShortForecast,
        string DetailedForecast
    );

    public record PrecipitationForecast(
        string UnitCode,
        int Value
    );
}