using System.ComponentModel.DataAnnotations;

namespace api.Models.Requests
{
    public record AddressRequest(
        [Required]
        string Street,
        [Required]
        string City,
        [Required]
        [StringLength(2, MinimumLength = 2, ErrorMessage = "State must be in 2 letter abbreviation")]
        string State,
        [Required]
        [StringLength(5, MinimumLength = 5, ErrorMessage = "ZIP must be 5 characters"), RegularExpression(@"^\d+$", ErrorMessage = "ZIP must be numeric")]
        string Zip
    );
}

// A note on [param: ] vs [propert: ] annotation syntax 
/*
    param: applies the attribute to the parameter of the primary constructor.
    property: applies the attribute to the generated property.

    In this case, using [param: ] is appropriate because we want to validate the input 
    parameters when creating an instance of AddressRequest. If we used [property: ],
    the validation would apply to the properties after the object is constructed, 
    resulting in a 500 Internal Server Error instead of a 400 Bad Request when invalid data is provided.
*/
