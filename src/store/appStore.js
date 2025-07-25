import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/features/profile/profileSlice";
import authReducer from "@/features/auth/authSlice";
import { jobApi } from "@/services/jobService";
import { authApi } from "@/features/auth/authApi";
import toastSlice from "../store/slices/toastSlices";
import { profileApi } from "@/services/profileService";

export const appStore = configureStore({
    reducer: {
        profile: profileReducer,
        auth: authReducer,
        toast: toastSlice,
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            jobApi.middleware,
            profileApi.middleware,
        ),
});

export default appStore;
