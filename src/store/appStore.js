import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});
