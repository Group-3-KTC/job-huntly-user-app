import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://18.142.226.139:8080/api/v1/job/",
    }),
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: () => "all",
            transformResponse: (response) => ({
                jobs: response.content || [],
                totalPages: response.totalPages,
                totalElements: response.totalElements,
            }),
        }),
        getJobById: builder.query({
            query: (id) => `${id}`,
        }),
        // search + filter ở BE
        searchJobs: builder.mutation({
            query: (body) => ({
                url: "search-lite",
                method: "POST",
                body,
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