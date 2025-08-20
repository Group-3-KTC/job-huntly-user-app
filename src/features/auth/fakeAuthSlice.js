import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const saveToCookie = (key, value) => {
    try {
        const cookieValue =
            typeof value === "object" ? JSON.stringify(value) : value;
        Cookies.set(key, cookieValue, {
            expires: 7,
            path: "/",
        });
    } catch (error) {
        console.error("Error saving to cookie:", error);
    }
};

const removeFromCookie = (key) => {
    try {
        Cookies.remove(key, { path: "/" });
    } catch (error) {
        console.error("Error removing cookie:", error);
    }
};

const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthHydrated: false,
};

export const fakeAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {
            const { user, token } = action.payload;

            state.isLoading = false;
            state.isLoggedIn = true;
            state.user = user;
            state.token = token;
            state.error = null;

            saveToCookie("authUser", user);
            saveToCookie("authToken", token);
        },

        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            state.error = null;
            state.isLoading = false;
            state.isAuthHydrated = true;

            removeFromCookie("authUser");
            removeFromCookie("authToken");
        },
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.isAuthHydrated = true;
        },
        setAuthHydrated: (state) => {
            state.isAuthHydrated = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setCredentials,
    setAuthHydrated,
} = fakeAuthSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthHydrated = (state) => state.auth.isAuthHydrated;

export default fakeAuthSlice.reducer;
