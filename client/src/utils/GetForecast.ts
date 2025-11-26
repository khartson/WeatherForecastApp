import { AddressRequest, Forecast } from "../types/Forecast";

export const GetForecast = async (addressRequest: AddressRequest): Promise<Forecast> => {
    const response = await fetch(
        "/api/forecast",
        {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addressRequest),
        }
    ); 

    if (!response.ok) {
        throw new Error(`Error fetching forecast: ${response.statusText}`);
    }

    const responseData: Forecast = await response.json();
    return responseData; 
}
