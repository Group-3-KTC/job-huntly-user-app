import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import toastSlice from "../store/slices/toastSlices";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastSlice,
  },
});

