import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

const removeFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from localStorage:", error);
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

export const authSlice = createSlice({
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

            saveToLocalStorage("authUser", user);
            saveToLocalStorage("authToken", token);
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

            removeFromLocalStorage("authUser");
            removeFromLocalStorage("authToken");
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
} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthHydrated = (state) => state.auth.isAuthHydrated;

export default authSlice.reducer;
