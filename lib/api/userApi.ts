import { axiosClient } from "@/lib/api/apiClient";
import { RootState } from "@/lib/store";

// **Genel API Fetcher (Token ile istek yapma)**
const fetchData = async <T>(endpoint: string, getState: () => RootState): Promise<T> => {
    const token = getState().user.token;
    if (!token) throw new Error("Token not found");

    const response = await axiosClient.get<T>(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response.data);
    return response.data;
};

// **Profil Verisini Getir**
export const fetchProfileApi = (getState: () => RootState) => fetchData<Profile>("/profile", getState);

// **Menstruation Günlerini Getir**
export const fetchMenstruationDaysApi = (getState: () => RootState) =>
    fetchData<{ menstrationDays: MenstruationDay[] }>("/menstruation-days", getState).then((res) => res.menstrationDays);

// **Insights Verilerini Getir**
export const fetchInsightsApi = (getState: () => RootState) =>
    fetchData<{ insights: Insights[] }>("/insights", getState).then((res) => res.insights);