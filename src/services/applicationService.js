import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
    reducerPath: "applicationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://6873a019c75558e27354be00.mockapi.io/api/v1/",
    }),
    tagTypes: ["Applications"],
    endpoints: (builder) => ({
        getApplications: builder.query({
            query: () => "applications",
            providesTags: ["Applications"],
        }),
        addApplication: builder.mutation({
            query: (data) => ({
                url: "applications",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Applications"],
        }),
        updateApplication: builder.mutation({
            query: ({ id, data }) => ({
                url: `applications/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Applications"],
        }),
        deleteApplication: builder.mutation({
            query: (id) => ({
                url: `applications/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Applications"],
        }),
    }),
});

export const {
    useGetApplicationsQuery,
    useAddApplicationMutation,
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
} = applicationApi;
