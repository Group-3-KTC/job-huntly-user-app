import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/features/profile/profileSlice";
import authReducer from "@/features/auth/authSlice";
import { jobApi } from "@/services/jobService";
import { authApi } from "@/features/auth/authApi";
import toastSlice from "../store/slices/toastSlices";

export const appStore = configureStore({
    reducer: {
        profile: profileReducer,
        auth: authReducer,
        toast: toastSlice,
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, jobApi.middleware),
});

export default appStore;
