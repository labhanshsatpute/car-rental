import axios from "axios";
import { getCookie } from "cookies-next";

export const getAllVehicles = async () => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/vehicle`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`,
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const getIndividualVehicle = async (id: any) => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/vehicle/${id}`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`,
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const addVehicle = async (data: {
    name: string
    summary: string
    thumbnailImage: Object
    vehicleImages: Array<Object>
    brandId: string
    type: string
    fuelType: string
    engineType: string
    transmissionType: string
    seatingCapacity: string
    manufacturingYear: string
    mileage: string
    price: string
    priceUnit: string
    latitude: string
    longitude: string
}) => {
    try {
        
        const response = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/vehicle`, data, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`,
                'Content-Type': 'multipart/form-data'
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const editVehicle = async (id: any ,data: {
    name: string
    summary: string
    thumbnailImage: Object
    vehicleImages: Array<Object>
    brandId: string
    type: string
    fuelType: string
    engineType: string
    transmissionType: string
    seatingCapacity: string
    manufacturingYear: string
    mileage: string
    price: string
    priceUnit: string
    latitude: string
    longitude: string
}) => {
    try {
        
        const response = axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/vehicle/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`,
                'Content-Type': 'multipart/form-data'
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const deleteVehicle = async (id: any) => {
    try {
        
        const response = axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/vehicle/${id}`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}