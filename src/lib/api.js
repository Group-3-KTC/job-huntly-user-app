import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});
api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth?.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshRes = await api.post("/auth/refresh");
                store.dispatch(setCredentials(refreshRes.data));
                originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
                return api(originalRequest);
            } catch (err) {
                store.dispatch(clearCredentials());
            }
        }
        return Promise.reject(error);
    },
);

export default api;
