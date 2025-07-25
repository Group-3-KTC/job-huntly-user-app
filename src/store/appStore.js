import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "@/services/jobService";
import { authApi } from "@/features/auth/authApi";
import toastSlice from "../store/slices/toastSlices";
import { profileApi } from "@/services/profileService";

export const appStore = configureStore({
    reducer: {
        [profileApi.reducerPath]: profileApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        toast: toastSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            jobApi.middleware,
            profileApi.middleware
        ),
});

export default appStore;
