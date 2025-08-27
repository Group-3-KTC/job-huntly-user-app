import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/features/profile/profileSlice";
import authReducer from "@/features/auth/authSlice";
import applicationReducer from "@/features/application/applicationSlice";
import { jobApi } from "@/services/jobService";
import toastSlice from "../store/slices/toastSlices";
import { profileApi } from "@/services/profileService";
import { applicationApi } from "@/services/applicationService";
import { savedCompaniesApi } from "@/services/savedCompaniesService";
import savedCompaniesReducer from "@/features/savedCompanies/savedCompaniesSlice";
import { attachStore } from "@/lib/api";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        auth: authReducer,
        application: applicationReducer,
        toast: toastSlice,
        savedCompanies: savedCompaniesReducer,
        [jobApi.reducerPath]: jobApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
        [savedCompaniesApi.reducerPath]: savedCompaniesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            jobApi.middleware,
            profileApi.middleware,
            applicationApi.middleware,
            savedCompaniesApi.middleware,
        ),
});

attachStore(store);
