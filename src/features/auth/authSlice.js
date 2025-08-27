import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/authService";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await authService.login(credentials);
            return res;
        } catch (err) {
            return rejectWithValue(err?.response?.data || err.message);
        }
    },
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await authService.register(payload);
            return res;
        } catch (err) {
            return rejectWithValue(err?.response?.data || err.message);
        }
    },
);

export const meThunk = createAsyncThunk(
    "auth/me",
    async (_, { rejectWithValue }) => {
        try {
            const res = await authService.me();
            return res.user;
        } catch (e) {
            return rejectWithValue({ message: "Not authenticated" });
        }
    },
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            // BE sẽ xóa httpOnly cookie
            await authService.logout();
            return true;
        } catch (err) {
            const data = err?.response?.data;
            const message =
                data?.detail ||
                data?.title ||
                data?.message ||
                err?.message ||
                "Logout failed";
            return rejectWithValue({ message, raw: data });
        } finally {
            try {
                localStorage.removeItem("authState");
            } catch {}
        }
    },
);

const initialState = {
    user: null,
    loading: false,
    error: null,
    hydrated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authTokenReceived: (state, action) => {
            const { accessToken, refreshToken } = action.payload || {};
            if (accessToken) state.accessToken = accessToken;
            if (refreshToken) state.refreshToken = refreshToken;
        },
        authLoggedOut: () => ({ ...initialState, hydrated: true }), // hydrated: true để tránh flicker
        authHydrated: (state, action) => {
            const { accessToken, refreshToken, user } = action.payload || {};
            if (accessToken !== undefined) state.accessToken = accessToken;
            if (refreshToken !== undefined) state.refreshToken = refreshToken;
            if (user !== undefined) state.user = user;
            state.hydrated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(loginThunk.fulfilled, (s, a) => {
                s.loading = false;
                s.user = a.payload?.user ?? s.user ?? null;
                s.hydrated = true;
            })
            .addCase(loginThunk.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload || "Login failed";
            })
            .addCase(registerThunk.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(registerThunk.fulfilled, (s) => {
                s.loading = false;
            })
            .addCase(registerThunk.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload || "Register failed";
            })
            .addCase(meThunk.fulfilled, (s, a) => {
                s.user = a.payload;
                s.hydrated = true;
            })
            .addCase(meThunk.rejected, (s) => {
                s.hydrated = true;
            })
            .addCase(logoutThunk.fulfilled, (s) => {
                s.user = null;
            });
    },
});

export const { authTokenReceived, authLoggedOut, authHydrated } =
    authSlice.actions;
export default authSlice.reducer;
