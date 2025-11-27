export interface AddressRequest {
    street: string; 
    city: string; 
    state: string;
    zip: string; 
}

export interface Forecast {
    address: string; 
    latitude: number;
    longitude: number;
    data: {
        periods: ForecastPeriod[]; 
    }
}

export interface ForecastPeriod {
    "number": number;
    name: string;
    isDaytime: boolean;
    temperature: number; 
    temperatureUnit: 'F' | 'C';
    probabilityofPrecipitation: any; 
    windspeed: string;
    windDirection: string;
    icon: string; 
    shortForecast: string; 
    detailedForecast: string; 
    conditions: "Snow" | "Rain" | "Cloud" | "Wind" | "Sun";
}

