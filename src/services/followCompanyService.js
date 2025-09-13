import { createApi } from "@reduxjs/toolkit/query/react";
import api from "@/lib/api";

const axiosBaseQuery =
    () =>
    async (
        { url, method = "GET", data, headers, responseType },
        { signal }
    ) => {
        try {
            const config = {
                url: `/follows${url || ""}`,
                method,
                data,
                signal,
                responseType: responseType || "json",
                headers: { ...headers },
            };

            if (data instanceof FormData) {
                delete config.headers?.["Content-Type"];
            } else {
                config.headers = {
                    "Content-Type": "application/json",
                    ...headers,
                };
            }

            const result = await api(config);
            return { data: result.data };
        } catch (axiosError) {
            return {
                error: {
                    status: axiosError.response?.status,
                    data: axiosError.response?.data || axiosError.message,
                },
            };
        }
    };

export const followCompanyApi = createApi({
    reducerPath: "followCompanyApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["FollowStatus", "FollowList", "FollowCount"],
    endpoints: (builder) => ({
        getFollowStatus: builder.query({
            query: (companyId) => ({
                url: `/status?company_id=${companyId}`,
                method: "GET",
            }),
            providesTags: (result, error, companyId) =>
                result ? [{ type: "FollowStatus", id: companyId }] : [],
        }),

        // Follow company
        followCompany: builder.mutation({
            query: (companyId) => ({
                url: "",
                method: "POST",
                data: { companyId },
            }),
            invalidatesTags: (result, error, companyId) => [
                { type: "FollowStatus", id: companyId },
                { type: "FollowList" },
                { type: "FollowCount", id: companyId },
            ],
        }),

        // Unfollow company
        unfollowCompany: builder.mutation({
            query: (companyId) => ({
                url: `?company_id=${companyId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, companyId) => [
                { type: "FollowStatus", id: companyId },
                { type: "FollowList" },
                { type: "FollowCount", id: companyId },
            ],
        }),


        getFollowCount: builder.query({
            query: (companyId) => ({
                url: `/count?company_id=${companyId}`,
                method: "GET",
            }),
            providesTags: (result, error, companyId) =>
                result ? [{ type: "FollowCount", id: companyId }] : [],
        }),

        // Get danh sách company mà current user đang follow
        getFollowedCompaniesByUser: builder.query({
            query: () => ({
                url: "/by-user",
                method: "GET",
            }),
            providesTags: ["FollowList"],
        }),
    }),
});

export const {
    useGetFollowStatusQuery,
    useLazyGetFollowStatusQuery,
    useFollowCompanyMutation,
    useUnfollowCompanyMutation,
    useGetFollowCountQuery,
    useGetFollowedCompaniesByUserQuery,
} = followCompanyApi;
