import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "@/services/jobService";
import { authApi } from "@/features/auth/authApi";
import toastSlice from "../store/slices/toastSlices";
import { profileApi } from "@/services/profileService";
import authReducer from "@/features/auth/authSlice";

export const appStore = configureStore({
    reducer: {
        [profileApi.reducerPath]: profileApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        toast: toastSlice,
        auth: authReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            jobApi.middleware,
            profileApi.middleware,
        ),
});

export default appStore;
