import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fakeFetchApi } from "./fakeApiProfile";

// Tạo custom baseQuery function
const fakeBaseQuery = async (args, api, extraOptions) => {
    try {
        console.log("fakeBaseQuery called with args:", args);

        // Xử lý args - có thể là string hoặc object
        const url = typeof args === "string" ? args : args.url;
        const method = typeof args === "string" ? "GET" : args.method || "GET";
        const body = typeof args === "string" ? null : args.body;

        // Tạo full URL (thêm base URL nếu cần)
        const fullUrl = `http://localhost:3000/${url}`;

        console.log("Calling fakeFetchApi with:", { fullUrl, method, body });

        const result = await fakeFetchApi(fullUrl, method, body);
        const text = await result.text();
        const responseData = text ? JSON.parse(text) : {};

        console.log("fakeFetchApi response:", responseData);

        // RTK Query expects { data } format
        return { data: responseData.data };
    } catch (error) {
        console.error("fakeBaseQuery error:", error);
        return {
            error: {
                status: "FETCH_ERROR",
                error: error.message,
            },
        };
    }
};

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fakeBaseQuery, // Sử dụng custom baseQuery
    tagTypes: [
        "UserProfile",
        "CandidateProfile",
        "Skills",
        "Education",
        "WorkExperience",
        "Language",
        "Certificates",
    ],
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => "profile", // Chỉ cần return endpoint path
            providesTags: ["UserProfile"],
        }),
        getCandidateProfile: builder.query({
            query: () => "candidateProfile",
            providesTags: ["CandidateProfile"],
        }),
        updateCandidateProfile: builder.mutation({
            query: (data) => ({
                url: "candidateProfile",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["UserProfile", "CandidateProfile"],
        }),
        getSectionItems: builder.query({
            query: (section) => section,
            providesTags: (result, error, section) => [{ type: section }],
        }),
        addSectionItem: builder.mutation({
            query: ({ section, data }) => ({
                url: section,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, { section }) => [
                "UserProfile",
                { type: section },
            ],
        }),
        updateSectionItem: builder.mutation({
            query: ({ section, itemId, data }) => ({
                url: `${section}/${itemId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { section }) => [
                "UserProfile",
                { type: section },
            ],
        }),
        deleteSectionItem: builder.mutation({
            query: ({ section, itemId }) => ({
                url: `${section}/${itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { section }) => [
                "UserProfile",
                { type: section },
            ],
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useGetCandidateProfileQuery,
    useUpdateCandidateProfileMutation,
    useGetSectionItemsQuery,
    useAddSectionItemMutation,
    useUpdateSectionItemMutation,
    useDeleteSectionItemMutation,
} = profileApi;