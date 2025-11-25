# Project Description

The purpose of this project is to be a demonstration application of a lightweight, full-stack application featuring  
a .NET (9.0) web API and a TypeScript/React frontend. It was created as part of a take-home assessment for an  
application. 

## Scope/Project Statement

This app will enable a user to view 7-day forecast information via a provided frontend form with an address  
submission field. Searching will convert geocode this address for conversion to latitude and longitude coordinates,  
which can then be passed to the [US National Weather Service API](https://www.weather.gov/documentation/services-web-api) to determine the corresponding CWA and location  
coordinates to fetch the area's 7-day weather forecast. The geocoding will be handled by the  [US Census Geocoding <br/> REST API](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf). 

## Project Goals

For __minimum viability__, this project seeks to define the following: 

> *As a user, I should be able to enter address information to recieve accurate and up-to-date weather forecast details for that locale*

And showcase the following technologies/competencies: 

| Competency                  | Definition/Details |
| --------------------------- | ------------------ |
| Full-stack Development      | __Backend__: C#/__.NET 9+__ (Core API)                                                                    |
| External API Integration    | Successful integration with two distinct, public REST APIs (US Census Geocoding, USNWS Reporting APIs)    |
| Backend System Architecture | Basic layered architecture (controller, service) for proper SOC, and DI for service registration          | 
| Frontend Design/Development | A functional, minimal single-page application to handle user stateful user input and response data        | 
| Error Handling, Testing     | Basic handling for external API failures and malformed request bodies, client- and server-side validation |

## Stretch Goals 

### 1) Reusable, portable service architecture 

- [ ] Implementation of dedicated C# (e.g. `NwsClient`, `GeocodeClient`) to encapsulate and reuse raw HTTP handlers
- [ ] Enable SoC and more comprehensively integrated unit tests 

### 2) Performance Optimizations 

- [ ] Introduce lightweight caching mechanisms to improve hits on previously searched items/locales (assuming there is a broad range for weather reports) using `IMemoryCache` 

### 3) Data Persistence, Feature Enhancement 

- [ ] Leverage EF Core with a lightweight SQLite or containerized database 
- [ ] Persistence feature or user login to support search history and CRUD operations 



