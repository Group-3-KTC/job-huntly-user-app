// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as authService from "@/services/authService";
//
// const initialState = {
//     user: null,
//     token: null,
//     error: null,
// };
//
// export const loginUser = createAsyncThunk(
//     "/login",
//
//     async (credentials, { rejectWithValue }) => {
//         try {
//             const res = await authService.login(credentials);
//             return res;
//         } catch (err) {
//             return rejectWithValue(err.message);
//         }
//     },
// );
//
// export const registerUser = createAsyncThunk(
//     "/register",
//     async (newUser, { rejectWithValue }) => {
//         try {
//             const res = await authService.register(newUser);
//             return res.user;
//         } catch (err) {
//             return rejectWithValue(err.message);
//         }
//     },
// );
//
// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setCredentials: (state, action) => {
//             const { user, token, role } = action.payload;
//             state.user = user;
//             state.token = token;
//             state.role = role;
//             console.log(user + role + token);
//         },
//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//             state.role = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Login
//             .addCase(loginUser.pending, (state) => {
//                 state.status = "loading";
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.user = action.payload;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.payload;
//             })
//             // Register
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.user = action.payload;
//             });
//     },
// });
//
// export const { logout, setCredentials } = authSlice.actions;
//
// export default authSlice.reducer;
