import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "@/services/jobService";
import { authApi } from "@/features/auth/authApi";
import authReducer from "@/features/auth/authSlice";
import toastSlice from "../store/slices/toastSlices";
import { profileApi } from "@/services/profileService";

export const appStore = configureStore({
    reducer: {
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
