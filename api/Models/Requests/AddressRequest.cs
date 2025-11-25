namespace api.Models.Requests
{
    public record AddressRequest(
        string Street,
        string City,
        string State,
        string Zip
    );
}