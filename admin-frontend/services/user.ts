import axios from "axios";
import { getCookie } from "cookies-next";

export const getAllUser = async () => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/user`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}