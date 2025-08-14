import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/features/profile/profileSlice";
import authReducer from "@/features/auth/authSlice";
import applicationReducer from "@/features/application/applicationSlice";
import { jobApi } from "@/services/jobService";
import { authApi } from "@/features/auth/authApi";
import toastSlice from "../store/slices/toastSlices";
import { profileApi } from "@/services/profileService";
import { applicationApi } from "@/services/applicationService";
import { savedCompaniesApi } from "@/services/savedCompaniesService";
import savedCompaniesReducer from "@/features/savedCompanies/savedCompaniesSlice";

export const appStore = configureStore({
    reducer: {
        profile: profileReducer,
        auth: authReducer,
        application: applicationReducer,
        toast: toastSlice,
        savedCompanies: savedCompaniesReducer,
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
        [savedCompaniesApi.reducerPath]: savedCompaniesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            jobApi.middleware,
            profileApi.middleware,
            applicationApi.middleware,
            savedCompaniesApi.middleware
        ),
});

export default appStore;
