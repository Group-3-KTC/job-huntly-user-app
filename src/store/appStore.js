import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "@/services/jobService";
import { authApi } from "@/features/auth/authApi";

export const appStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, jobApi.middleware),
});
