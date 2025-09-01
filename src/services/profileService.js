import { createApi } from "@reduxjs/toolkit/query/react";
import api from "@/lib/api";

const axiosBaseQuery =
    () =>
    async ({ url, method = "GET", body, headers }, { signal }) => {
        try {
            const config = {
                url: `/candidate/profile${url}`,
                method,
                data: body,
                signal,
                headers: { ...headers },
            };

            // Nếu body là FormData → xoá Content-Type, để axios tự thêm boundary
            if (body instanceof FormData) {
                delete config.headers?.["Content-Type"];
            } else {
                // Nếu là object thường → gửi JSON
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

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: [
        "combinedProfile",
        "personalDetail",
        "profile",
        "education",
        "workExperience",
        "awards",
        "certificates",
        "candidateSkills",
        "softSkills",
    ],
    endpoints: (builder) => ({
        // ==========================
        // 1. COMBINED (nguồn chính)
        // ==========================
        getCombinedProfile: builder.query({
            query: () => ({ url: "/combined" }),
            providesTags: ["combinedProfile"],
            keepUnusedDataFor: 60,
        }),

        // ==========================
        // 2. PROFILE (basic info)
        // ==========================
        getProfile: builder.query({
            query: () => ({ url: "" }),
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation({
            query: (body) => ({ url: "", method: "PUT", body }),
            invalidatesTags: ["profile", "combinedProfile"],
        }),

        // ==========================
        // 3. SECTION CRUD (dynamic)
        // ==========================
        getSectionItems: builder.query({
            query: (section) => ({ url: `/${section}` }),
            providesTags: (result, error, section) => [section],
        }),
        addSectionItem: builder.mutation({
            query: ({ section, data }) => ({
                url: `/${section}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (r, e, { section }) => [section],
        }),
        // updateSectionItem: builder.mutation({
        //     query: ({ section, itemId, data }) => ({
        //         url: `/${section}/${itemId}`,
        //         method: "PUT",
        //         body: data,
        //     }),
        //     invalidatesTags: (r, e, { section }) => [section],
        // }),
        updateSectionItem: builder.mutation({
            query: ({ section, itemId, data }) => {
                // Những section thuộc về profile chính
                const profileSections = ["personalDetail", "aboutMe"];

                if (profileSections.includes(section)) {
                    return {
                        url: "",
                        method: "PUT",
                        body: data, // JSON hoặc FormData
                    };
                }

                // Các section còn lại (education, workExperience,...)
                return {
                    url: `/${section}/${itemId}`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: (r, e, { section }) => [
                section,
                "combinedProfile",
            ],
        }),

        deleteSectionItem: builder.mutation({
            query: ({ section, itemId }) => ({
                url: `/${section}/${itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: (r, e, { section }) => [section],
        }),
    }),
});

export const {
    useGetCombinedProfileQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetSectionItemsQuery,
    useLazyGetSectionItemsQuery, // ✅ THÊM lazy hook
    useAddSectionItemMutation,
    useUpdateSectionItemMutation,
    useDeleteSectionItemMutation,
} = profileApi;