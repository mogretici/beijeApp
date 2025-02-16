import { axiosClient } from "@/lib/api/apiClient";
import { RootState } from "@/lib/store";
import {getToken} from "@/lib/helpers/authHelpers";

const fetchData = async <T>(endpoint: string, getState: () => RootState): Promise<T> => {
    const token =  await getToken() || getState().user.token;
    if (!token) throw new Error("Token not found");

    const response = await axiosClient.get<T>(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const fetchProfileApi = (getState: () => RootState) => fetchData<Profile>("/profile", getState);

export const fetchMenstruationDaysApi = (getState: () => RootState) =>
    fetchData<{ menstrationDays: MenstruationDay[] }>("/menstruation-days", getState).then((res) => res.menstrationDays);

export const fetchInsightsApi = (getState: () => RootState) =>
    fetchData<{ insights: Insights[] }>("/insights", getState).then((res) => res.insights);