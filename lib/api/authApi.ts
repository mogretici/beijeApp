import { axiosPublic } from "@/lib/api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setToken} from "@/lib/helpers/authHelpers";

export const loginUserApi = async (): Promise<string | null> => {
    let token = await AsyncStorage.getItem("token");

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