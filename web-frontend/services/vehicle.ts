import axios from "axios";

export const getAllVehicles = async () => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicle`);
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const getIndividualVehicle = async (id: any) => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicle/${id}`);
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}