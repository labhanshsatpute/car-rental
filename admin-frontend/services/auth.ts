import axios from "axios";

export const login = async (data: Object) => {
    try {
        
        const response = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`, data );
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const sendPasswordResetOtp = async (data: Object) => {
    try {
        
        const response = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/send-password-reset-otp`, data );
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const resetPassword = async (data: Object) => {
    try {
        
        const response = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/rest-password`, data );
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}