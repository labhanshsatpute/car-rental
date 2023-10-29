"use client"

import { AuthUserLogin, AuthUserLogout } from "@/redux/actions/AuthAction";
import axios from "axios";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";

const UserRegister = async (data: any) => {
    try {

        const response: any = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`, {
            name: data.name,
            email: data.email,
            password: data.password
        });

        if (response.data.status) {
            setCookie('accessToken', response.data.data.accessToken)
            return {
                status: true,
                data: response.data
            };
        }
        else {
            return {
                status: false,
                data: response.data,
                message: response.data.message
            };
        }

    } catch (error: any) {
        return {
            status: false,
            error: error,
            message: error.data.message
        };
    }
}

const UserLogin = async (data: any) => {
    try {

        const response: any = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`, {
            email: data.email,
            password: data.password
        });

        if (response.data.status) {
            setCookie('accessToken', response.data.data.accessToken)
            return {
                status: true,
                data: response.data
            };
        }
        else {
            return {
                status: false,
                data: response.data,
                message: response.data.message
            };
        }

    } catch (error: any) {
        return {
            status: false,
            error: error,
            message: error.data.message
        };
    }
}

export {
    UserRegister,
    UserLogin
}