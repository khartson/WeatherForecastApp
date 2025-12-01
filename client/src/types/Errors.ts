type Fields = "Zip" | "Street" | "City" | "State";
export interface ValidationError {
    type: string;
    title: string;
    status: number; 
    errors: {
        [key in Fields]: string[]; 
    };
    traceId: string;  
}

export interface ErrorReason {

}