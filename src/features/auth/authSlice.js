import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/authService";
import { profileApi } from "@/services/profileService"; //  invalidate tags
import { clearNormalizedProfile } from "@/features/profile/profileSlice";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            return await authService.login(credentials);
        } catch (err) {
            return rejectWithValue(err?.response?.data || err.message);
        }
    },
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            return await authService.register(payload);
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
                console.log("remove localStorage");
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
        setUser(state, action) {
            state.user = action.payload || null;
            state.hydrated = true;
        },
        clearError(state) {
            state.error = null;
        },
        // authHydrated: (state, action) => {
        //     const user = action.payload || {};
        //     if (user !== undefined) state.user = user;
        //     state.hydrated = true;
        // },
        authHydrated: (state, action) => {
            state.user = action.payload?.user ?? null;
            state.hydrated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // -- Login --
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
            // -- Register --
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
            // -- Me --
            .addCase(meThunk.fulfilled, (s, a) => {
                s.user = a.payload || null;
                s.hydrated = true;
            })
            .addCase(meThunk.rejected, (s) => {
                s.user = null;
                s.hydrated = true;
            })
            // -- Logout --
            .addCase(logoutThunk.fulfilled, (s) => {
                s.user = null;
                s.error = null;
                s.hydrated = true;
            })
            .addCase(logoutThunk.rejected, (s) => {
                s.user = null;
                s.hydrated = true;
            });
    },
});

export const { authHydrated } = authSlice.actions;
export default authSlice.reducer;
