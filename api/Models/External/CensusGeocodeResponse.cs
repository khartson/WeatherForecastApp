using System.ComponentModel.DataAnnotations;

namespace api.Models.External
{
    public record GeocodeRootResponse(
        Result Result
    );

    public record Result(
        [property: MinLength(1, ErrorMessage = "No address matches found")]
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