using System.Text.RegularExpressions;
using System.Text.Json.Serialization;
using System.Security.Cryptography.X509Certificates;

namespace api.Models.Responses
{
    // Parse these from the short description using regex
    // and restrict it to these values
    public enum WeatherConditions 
    {
        Snow,
        Rain,
        Cloud,
        Wind,
        Sun
    }


    /*
        Here, we opt for source-generated REGEX. This wil generate the 
        expressions at compile time and is a performance optimization
        over use of Regex.IsMatch(string, pattern) which compiles the 
        regex at runtime. It offers better performance and enhances
        security by reducing the risk of regex injection attacks.
    */
    public static partial class Regexes
    {
        [GeneratedRegex(@"\bsnow\b|\bsleet\b|\bblizzard\b", RegexOptions.IgnoreCase)]
        public static partial Regex SnowRegex();

        [GeneratedRegex(@"\brain\b|\bdrizzle\b|\bshowers\b", RegexOptions.IgnoreCase)]
        public static partial Regex RainRegex();

        [GeneratedRegex(@"\bcloudy\b|\bovercast\b|\bclouds\b", RegexOptions.IgnoreCase)]
        public static partial Regex CloudRegex();

        [GeneratedRegex(@"\bwindy\b|\bbreezy\b|\bwind\b", RegexOptions.IgnoreCase)]
        public static partial Regex WindRegex();
    }

    public record ForecastPeriod(
        int Number,
        string Name,
        bool IsDaytime,
        int Temperature,
        string TemperatureUnit,
        PrecipitationForecast? ProbabilityOfPrecipitation,
        string Windspeed,
        string WindDirection,
        string Icon,
        string ShortForecast,
        string DetailedForecast
    )
    {
        // Note on computed properties:
        /*
            Computed properties in record types should be computed on access, 
            not initialized when the instance is created
            https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record#nondestructive-mutation
        */
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public WeatherConditions Conditions => DetermineConditions();

        private WeatherConditions DetermineConditions()
        {
            // A note on Regex optimizations:
            /* 
                You can instantiate a Regex object and call an instance pattern-matching 
                method of a source-generated regular expression. This technique is recommended 
                in most cases. To do so, place the GeneratedRegexAttribute attribute on a partial 
                method that returns Regex.
                https://learn.microsoft.com/en-us/dotnet/standard/base-types/best-practices-regex
            */
            var desc = ShortForecast.ToLower();

            if (Regexes.SnowRegex().IsMatch(desc))
            {
                return WeatherConditions.Snow;
            }
            else if (Regexes.RainRegex().IsMatch(desc))
            {
                return WeatherConditions.Rain;
            }
            else if (Regexes.CloudRegex().IsMatch(desc))
            {
                return WeatherConditions.Cloud;
            }
            else if (Regexes.WindRegex().IsMatch(desc))
            {
                return WeatherConditions.Wind;
            }
            else
            {
                return WeatherConditions.Sun;
            }
        }
    };


    public record PrecipitationForecast(
        string UnitCode,
        int Value
    );
}