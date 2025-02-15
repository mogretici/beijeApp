import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, fetchProfile, fetchMenstruationDays, fetchInsights } from "@/lib/thunks/userThunks";

// **Redux State**
const initialState: UserState = {
    token: null,
    profile: null,
    menstruationDays: [],
    insights: [],
    loading: false,
};

// **Redux Slice**
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string | null>) => {
                state.token = action.payload;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.profile = action.payload;
            })
            .addCase(fetchMenstruationDays.fulfilled, (state, action: PayloadAction<MenstruationDay[]>) => {
                state.menstruationDays = action.payload;
            })
            .addCase(fetchInsights.fulfilled, (state, action: PayloadAction<Insights[]>) => {
                state.insights = action.payload;
            })
            .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
                state.loading = true;
            })
            .addMatcher((action) => action.type.endsWith("/fulfilled"), (state) => {
                state.loading = false;
            });
    },
});

export default userSlice.reducer;