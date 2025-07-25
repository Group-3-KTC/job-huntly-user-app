import * as authService from "@/services/authService";
import {
    createApi,
    fakeBaseQuery,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    logout,
} from "@/features/auth/authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation({
            async queryFn(credentials, { dispatch }) {
                try {
                    dispatch(loginStart());
                    const data = await authService.login(credentials);
                    dispatch(
                        loginSuccess({
                            user: data.user,
                            token: data.token,
                        }),
                    );
                    return { data };
                } catch (error) {
                    console.log("Lỗi nhận được là:", error.message);
                    dispatch(loginFailure(error.message));
                    return {
                        error: {
                            status: "CUSTOM_ERROR", // bạn có thể để '400' hoặc 'LOGIN_FAILED'
                            data: {
                                message: error.message,
                            },
                        },
                    };
                }
            },
        }),
        register: builder.mutation({
            async queryFn(data) {
                try {
                    const result = await authService.register(data);
                    return { data: result };
                } catch (error) {
                    return {
                        error: {
                            status: "REGISTER_ERROR",
                            data: {
                                message: error.message,
                            },
                        },
                    };
                }
            },
        }),
        logout: builder.mutation({
            async queryFn(_, { dispatch }) {
                try {
                    // có nên call api để verify token trước khi logout không
                    // await authService.logout();
                    dispatch(logout());

                    return { data: { message: "Đăng xuất thành công" } };
                } catch (error) {
                    dispatch(logout());
                    return { data: { message: "Đăng xuất thành công" } };
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
    authApi;
