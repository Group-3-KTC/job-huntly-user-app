import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "@/services/jobService";
import { authApi } from "@/features/auth/authApi";
import authReducer from "@/features/auth/authSlice";
import toastSlice from "../store/slices/toastSlices";

export const appStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, jobApi.middleware),
  reducer: {
    auth: authReducer,
    toast: toastSlice,
  },
});

