import { createApi } from "@reduxjs/toolkit/query/react";
import api from "@/lib/api";

const axiosBaseQuery =
    (basePath = "") =>
    async (
        { url, method = "GET", data, headers, responseType },
        { signal }
    ) => {
        try {
            const config = {
                url: `${basePath}${url || ""}`,
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

export const jobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: axiosBaseQuery("/job"),
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => ({
                url: "/all",
                method: "GET",
            }),
            transformResponse: (response) => ({
                jobs: response.content || [],
                totalPages: response.totalPages,
                totalElements: response.totalElements,
            }),
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
        }),
        searchJobs: builder.mutation({
            query: (body) => ({
                url: "/search-lite",
                method: "POST",
                data: body,
            }),
            transformResponse: (res) => {
                if (Array.isArray(res)) {
                    return {
                        jobs: res,
                        totalPages: 1,
                        totalElements: res.length,
                    };
                }
                return {
                    jobs: res?.content || [],
                    totalPages: res?.totalPages ?? 1,
                    totalElements:
                        res?.totalElements ?? res?.content?.length ?? 0,
                };
            },
        }),
    }),
});

export const { useGetJobsQuery, useGetJobByIdQuery, useSearchJobsMutation } =
    jobApi;