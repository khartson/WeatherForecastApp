import { AddressRequest, Forecast } from "../types/Forecast";

export const GetForecast = async (addressRequest: AddressRequest): Promise<Forecast> => {
    console.log("GetForecast called with:", addressRequest, "to: ", `${process.env.API_URL}/api/forecast`);
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/forecast`,
        {   
            method: "POST",
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
