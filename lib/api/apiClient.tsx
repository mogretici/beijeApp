import axios, { AxiosRequestHeaders } from "axios";
import { getToken } from "@/lib/helpers/authHelpers";

export const axiosClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_PRODUCTION_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60000,
});

axiosClient.interceptors.request.use(
    async (config) => {
        const tokenStr = await getToken();
        config.headers = {
            ...config?.headers,
            Authorization: `Bearer ${tokenStr}`,
        } as AxiosRequestHeaders;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => {
        if (response.data?.success) {
            return response.data;
        } else {
            throw new Error(response.data?.error);
        }
    },
    async (error) => {
        if (error.code === "ERR_BAD_RESPONSE") {
            return Promise.reject("Network error");
        }
        return Promise.reject(error?.response?.data?.error || error);
    }
);

export const axiosPublic = axios.create({
    baseURL: process.env.EXPO_PUBLIC_PRODUCTION_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60000,
});

axiosPublic.interceptors.response.use(
    (response) => {
        if (response.data?.success) {
            return response.data;
        } else {
            throw new Error(response.data?.error);
        }
    },
    async (error) => {
        if (error.code === "ERR_BAD_RESPONSE") {
            return Promise.reject("Network error");
        }
        return Promise.reject(error?.response?.data?.error || error);
    }
);