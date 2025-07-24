import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";

export const appStore = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
  },
});
