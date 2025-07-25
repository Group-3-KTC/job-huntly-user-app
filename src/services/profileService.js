import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
    reducerPath: "profileApi", // Phải khớp với key trong store
    baseQuery: fetchBaseQuery({
        baseUrl: "https://6875b558814c0dfa6539359d.mockapi.io/api/1/",
    }),
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        // Lấy dữ liệu hồ sơ theo ID
        getProfile: builder.query({
            query: (id = "1") => `userProfile/${id}`, // Mặc định lấy ID "1"
            providesTags: ["Profile"],
        }),
        // Cập nhật toàn bộ dữ liệu hồ sơ theo ID
        updateProfile: builder.mutation({
            query: ({ id, ...profileData }) => ({
                url: `userProfile/${id}`,
                method: "PUT",
                body: profileData,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
