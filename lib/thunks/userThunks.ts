import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { loginUserApi } from "@/lib/api/authApi";
import { fetchProfileApi, fetchMenstruationDaysApi, fetchInsightsApi } from "@/lib/api/userApi";

// **Login İşlemi**
export const loginUser = createAsyncThunk<string | null, void>(
    "user/login",
    async () => await loginUserApi()
);

// **API İstekleri**
export const fetchProfile = createAsyncThunk<Profile, void, { state: RootState }>(
    "user/fetchProfile",
    (_, { getState }) => fetchProfileApi(getState)
);

export const fetchMenstruationDays = createAsyncThunk<MenstruationDay[], void, { state: RootState }>(
    "user/fetchMenstruation",
    (_, { getState }) => fetchMenstruationDaysApi(getState)
);

export const fetchInsights = createAsyncThunk<Insights[], void, { state: RootState }>(
    "user/fetchInsights",
    (_, { getState }) => fetchInsightsApi(getState)
);