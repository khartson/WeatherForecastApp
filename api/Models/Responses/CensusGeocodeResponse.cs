namespace api.Models.Responses
{
    public record GeocodeRootResponse(
        Result Result
    );

    public record Result(
        IReadOnlyList<AddressMatch> AddressMatches
    );

    public record AddressMatch(
        Coordinates Coordinates,
        string MatchedAddress
    );

    public record Coordinates(
        double X,
        double Y
    );
}