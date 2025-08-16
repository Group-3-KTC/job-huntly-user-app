// Constants cho API endpoints
export const BASE_API_URL = "http://localhost:8080/api/v1";

// Company endpoints
export const COMPANY_API = {
  GET_COMPANY_DETAIL: (id) => `${BASE_API_URL}/companies/${id}`,
  GET_ALL_COMPANIES: `${BASE_API_URL}/companies`,
};

// Job endpoints
export const JOB_API = {
  GET_JOBS_BY_COMPANY: (companyId) => `${BASE_API_URL}/job/company/${companyId}`,
}; 