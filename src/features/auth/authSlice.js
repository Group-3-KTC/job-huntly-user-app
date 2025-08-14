import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import * as authService from "@/services/authService";

const saveToCookie = (key, value) => {
    try {
        const cookieValue =
            typeof value === "object" ? JSON.stringify(value) : value;
        Cookies.set(key, cookieValue, { expires: 7, path: "/" });
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

// Chuẩn hoá lỗi (hỗ trợ RFC 7807)
const normalizeError = (err) => {
    const res = err?.response;
    if (res?.data) return res.data; // { title, detail, status, ... }
    return { title: "Error", detail: err?.message || "Unknown error" };
};

const pickAuthPayload = (data) => {
    const token =
        data?.accessToken ??
        data?.token ??
        data?.jwt ??
        data?.data?.accessToken ??
        data?.data?.token ??
        null;

    const user =
        data?.user ??
        data?.data?.user ??
        (data?.email || data?.username
            ? { email: data.email, username: data.username }
            : null);

    return { token, user };
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (payload, thunkAPI) => {
        try {
            const res = await authService.login(payload); // POST /auth/login
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(normalizeError(err));
        }
    },
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (payload, thunkAPI) => {
        try {
            const res = await authService.register(payload); // POST /auth/register
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(normalizeError(err));
        }
    },
);

export const activateAccount = createAsyncThunk(
    "auth/activateAccount",
    async (token, thunkAPI) => {
        try {
            const res = await authService.activate(token); // GET /auth/activate?token=...
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(normalizeError(err));
        }
    },
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            if (authService.logout) await authService.logout(); // POST /auth/logout (nếu có)
        } catch {
            //
        }
        return true;
    },
);

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
            const { user, token } = action.payload || {};
            state.isLoading = false;
            state.isLoggedIn = true;
            state.user = user || null;
            state.token = token || null;
            state.error = null;
            if (user) saveToCookie("authUser", user);
            if (token) saveToCookie("authToken", token);
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
            state.token = action.payload?.token ?? null;
            state.user = action.payload?.user ?? null;
            state.isLoggedIn = !!(
                action.payload?.user || action.payload?.token
            );
            state.isAuthHydrated = true;
            if (state.user) saveToCookie("authUser", state.user);
            if (state.token) saveToCookie("authToken", state.token);
        },
        setAuthHydrated: (state) => {
            state.isAuthHydrated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const { token, user } = pickAuthPayload(action.payload);
                state.isLoggedIn = !!(token || user);
                state.user = user;
                state.token = token;
                state.error = null;
                if (user) saveToCookie("authUser", user);
                if (token) saveToCookie("authToken", token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(activateAccount.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(activateAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                const { token, user } = pickAuthPayload(action.payload);
                if (token || user) {
                    state.isLoggedIn = true;
                    state.user = user;
                    state.token = token;
                    if (user) saveToCookie("authUser", user);
                    if (token) saveToCookie("authToken", token);
                }
            })
            .addCase(activateAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.error = null;
                state.isLoading = false;
                state.isAuthHydrated = true;
                removeFromCookie("authUser");
                removeFromCookie("authToken");
            });
    },
});

// ================= Exports =================
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
