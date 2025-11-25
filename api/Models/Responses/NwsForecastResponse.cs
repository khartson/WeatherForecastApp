namespace api.Models.Responses
{
    public record ForecastProperties(
        string Id,
        string Type,
        IReadOnlyList<Period> Periods
    ) : BaseProperties(
        Id,
        Type
    );
    public record Period(
        int Number,
        string Name,
        string StartTime,
        string EndTime,
        bool IsDaytime,
        int Temperature,
        string TemperatureUnit,
        string Windspeed,
        string WindDirection,
        string Icon,
        string ShortForecast,
        string DetailedForecast
    );

    public record NwsForecastResonse(
        string Id,
        string Type,
        ForecastProperties Properties
    ) : NwsResponseRoot<ForecastProperties>(
        Id,
        Type,
        Properties
    );
}