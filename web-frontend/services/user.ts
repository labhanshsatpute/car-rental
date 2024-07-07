import axios from "axios";
import { getCookie } from "cookies-next";

export const getUser = async () => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const updateProfile = async (data: any) => {
    try {
        
        const response = axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile-image`, data, {
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

export const getLoggedInDevices = async () => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/logged-in/devices`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const logoutDevice = async (id: string) => {
    try {
        
        const response = axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/logout/device/${id}`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}