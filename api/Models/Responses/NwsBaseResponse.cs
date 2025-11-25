using System.Text.Json.Serialization;

namespace api.Models.Responses
{

    public abstract record BaseProperties(
        [property: JsonPropertyName("@id")] string Id,
        [property: JsonPropertyName("@type")] string Type
    );

    public abstract record NwsResponseRoot<TProperties>
    (
        string Id,
        [property: JsonPropertyName("type")] string Type,
        TProperties Properties
    ) where TProperties : BaseProperties; 

}