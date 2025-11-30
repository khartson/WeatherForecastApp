using Microsoft.AspNetCore.Mvc.Testing;
using System.Text.Json;
using api.Models.Requests;
using api.Models.Responses;
using System.Net.Http;

public class BasicTests 
    : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public BasicTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task PostForecastWithValidData_ShouldReturnSuccessStatusCode()
    {
        // Arrange
        var newProduct = new
        {
            Street = "1600 Pennsylvania Ave NW",
            City = "Washington",
            State = "DC",
            Zip = "20500"
        };
        // Serialize the body data to JSON
        var jsonContent = new StringContent(
            JsonSerializer.Serialize(newProduct)
        );

        var client = _factory.CreateClient();
        jsonContent.Headers.ContentType = 
            new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");
        // Act
        var response = await client.PostAsync("/api/forecast", jsonContent);

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
    }

    [Fact]
    public async Task PostForecastWithInvalidData_ShouldReturnBadRequest()
    {
        // Arrange
        var newProduct = new
        {
            Street = "1600 Pennsylvania Ave NW",
            City = "Washington",
            State = "DistrictOfColumbia",
            Zip = "20500"
        };
        // Serialize the body data to JSON
        var jsonContent = new StringContent(
            JsonSerializer.Serialize(newProduct)
        );

        var client = _factory.CreateClient();
        jsonContent.Headers.ContentType = 
            new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");
        // Act
        var response = await client.PostAsync("/api/forecast", jsonContent);

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.BadRequest, response.StatusCode);
    }

}