// Constants cho API endpoints
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// export const BASE_API_URL = "http://18.142.226.139:8080/api/v1";

// Company endpoints
export const COMPANY_API = {
    GET_COMPANY_DETAIL: (id) => `${BASE_API_URL}/companies/${id}`,
    GET_ALL_COMPANIES: `${BASE_API_URL}/companies`,
    GET_COMPANIES_BY_CATEGORIES: (categoryIds) =>
        `${BASE_API_URL}/companies/by-categories?categoryIds=${categoryIds}`,
    GET_COMPANIES_BY_LOCATION: (location) =>
        `${BASE_API_URL}/companies/by-location?location=${encodeURIComponent(
            location
        )}`,
    GET_COMPANY_BY_NAME: (name) =>
        `${BASE_API_URL}/companies/by-name?name=${encodeURIComponent(name)}`,
    GET_COMPANY_LOCATIONS: `${BASE_API_URL}/companies/locations`,
    GET_ALL_CATEGORIES: `${BASE_API_URL}/category`,
    SEARCH_COMPANIES: (params) => {
        const queryParams = new URLSearchParams();
        if (params.name) queryParams.append("name", params.name);
        if (params.location) queryParams.append("location", params.location);
        if (params.categoryIds && params.categoryIds.length)
            queryParams.append("categoryIds", params.categoryIds.join(","));
        return `${BASE_API_URL}/companies/search?${queryParams.toString()}`;
    },
};

// Job endpoints
export const JOB_API = {
    GET_JOBS_BY_COMPANY: (companyId) =>
        `${BASE_API_URL}/job/company/${companyId}`,
    SEARCH_JOBS_BY_COMPANY: (companyId, queryString = "") =>
        `${BASE_API_URL}/job/company/${companyId}/search${queryString ? `?${queryString}` : ""}`,
};
