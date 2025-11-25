namespace api.Models.Responses
{
    public record ForecastResponse(
        string Address,
        double Latitude,
        double Longitude,
        Data Data
    );

    public record Data(
        IReadOnlyList<ForecastPeriod> Periods
    );

}
