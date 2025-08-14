import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
import toastReducer from "@/store/slices/toastSlices";

import { jobApi } from "@/services/jobService";
import { profileApi } from "@/services/profileService";

export const store = configureStore({
    reducer: {
        // slices
        auth: authReducer,
        profile: profileReducer,
        toast: toastReducer,

        // RTK Query reducers
        [jobApi.reducerPath]: jobApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jobApi.middleware, profileApi.middleware),
});

export default store;
