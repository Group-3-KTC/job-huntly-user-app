import * as authService from "@/services/authService";
import {
    createApi,
    fakeBaseQuery,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation({
            async queryFn(credentials) {
                try {
                    const data = await authService.login(credentials);
                    return { data };
                } catch (error) {
                    console.log("Lỗi nhận được là:", error.message);
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
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
