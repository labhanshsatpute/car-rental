import axios from "axios";
import { getCookie } from "cookies-next";

export const getBrands = async () => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/brand`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`,
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const getIndividualBrands = async (id: any) => {
    try {
        
        const response = axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/brand/${id}`, {
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`,
            },
        });
        return (await response).data;
        
    } catch (error) {
        return false;
    }
}

export const addBrand = async (data: {
    name: string
    slug: string
    logo: Object
}) => {
    try {
        
        const response = axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/brand`, {
            name: data.name,
            slug: data.slug,
            logo: data.logo,
        }, {
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

export const editBrand = async (id: any ,data: {
    name: string
    slug: string
    logo: Object
}) => {
    try {
        
        const response = axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/brand/${id}`, {
            name: data.name,
            slug: data.slug,
            logo: data.logo,
        }, {
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