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
import cvTemplateReducer from "@/features/templateCv/cvTemplateSlice"; 
import { cvTemplateApi } from "@/services/cvTemplateService";
import { attachStore } from "@/lib/api";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        auth: authReducer,
        application: applicationReducer,
        toast: toastSlice,
        savedCompanies: savedCompaniesReducer,
        cvTemplate: cvTemplateReducer,
        [cvTemplateApi.reducerPath]: cvTemplateApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
        [savedCompaniesApi.reducerPath]: savedCompaniesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",

                    "cvTemplateApi/executeMutation/pending",
                    "cvTemplateApi/executeMutation/fulfilled",
                    "cvTemplateApi/executeMutation/rejected",

                    "cvTemplateApi/executeQuery/fulfilled",
                    "cvTemplateApi/executeQuery/pending",
                    "cvTemplateApi/executeQuery/rejected",
                ],
                ignoredActionsPaths: ["payload", "meta.baseQueryMeta"],
                ignoredPaths: [
                    "cvTemplateApi",
                ],
            },
        }).concat(
            jobApi.middleware,
            profileApi.middleware,
            applicationApi.middleware,
            savedCompaniesApi.middleware,
            cvTemplateApi.middleware
        ),
});

attachStore(store);
