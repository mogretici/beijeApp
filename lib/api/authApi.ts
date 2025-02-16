import { axiosPublic } from "@/lib/api/apiClient";
import {getToken, setToken} from "@/lib/helpers/authHelpers";

export const loginUserApi = async (): Promise<string | null> => {
    let token = await getToken()

    if (!token) {
        const { data } = await axiosPublic.post<{ token: string }>("/sign-in-request", {
            email: process.env.EXPO_PUBLIC_EMAIL,
            password: process.env.EXPO_PUBLIC_PASSWORD,
        });

        token = data.token;
        await setToken(token);
    }

    return token;
};