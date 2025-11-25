namespace api.Models.Responses
{
    public record GridProperties(
        string Id,
        string Type,
        int GridX,
        int GridY,
        string Cwa,
        string Forecast,
        string ForecastHourly,
        string ForcastGridData,
        string Timezone
    ) : BaseProperties(
        Id,
        Type
    );

    public record NwsGridResponse(
        string Id,
        string Type,
        GridProperties Properties
    ) : NwsResponseRoot<GridProperties>(
        Id,
        Type,
        Properties
    );
}