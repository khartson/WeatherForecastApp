namespace api.Models.Responses
{
    public record ForecastResponse(
        ForecastAddress Address,
        Data Data
    );

    public record ForecastAddress(
        string Street,
        string City,
        string State,
        string Zip
    );


    public record Data(
        IReadOnlyList<ForecastPeriod> Periods
    );

}
