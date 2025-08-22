import axios from "axios";
import { authLoggedOut, authTokenReceived } from "@/features/auth/authSlice";
import {
    selectAccessToken,
    selectRefreshToken,
} from "@/features/auth/authSelectors";
import { API_CONFIG } from "./config";

let reduxStore = null;
export function attachStore(store) {
    reduxStore = store;
}

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    withCredentials: true,
});

// tránh vòng lặp do interceptor bắt lỗi 401
const refreshClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    withCredentials: true,
});

// refresh queue tránh refresh song song
let isRefreshing = false;
let refreshQueue = []; // each cb: (newToken, err) => void

function subscribeTokenRefresh(cb) {
    refreshQueue.push(cb);
}
function onRefreshed(newToken) {
    refreshQueue.forEach((cb) => cb(newToken, null));
    refreshQueue = [];
}
function clearQueueError(err) {
    refreshQueue.forEach((cb) => cb(null, err));
    refreshQueue = [];
}

function getTokens() {
    if (!reduxStore) return { accessToken: null, refreshToken: null };
    const state = reduxStore.getState?.();
    return {
        accessToken: selectAccessToken(state),
        refreshToken: selectRefreshToken(state),
    };
}

api.interceptors.request.use((config) => {
    const { accessToken } = getTokens();
    if (accessToken && !config.headers?.Authorization) {
        config.headers = {
            ...(config.headers || {}),
            Authorization: `Bearer ${accessToken}`,
        };
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config || {};
        const status = error?.response?.status;

        if (status !== 401) return Promise.reject(error);
        if (originalRequest._retry) return Promise.reject(error);
        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh((newToken, err) => {
                    if (err || !newToken) return reject(err || error);
                    originalRequest.headers = {
                        ...(originalRequest.headers || {}),
                        Authorization: `Bearer ${newToken}`,
                    };
                    resolve(api(originalRequest));
                });
            });
        }

        isRefreshing = true;
        try {
            const { refreshToken } = getTokens();
            if (!refreshToken) throw new Error("No refresh token available");

            const resp = await refreshClient.post("/auth/refresh", {
                refreshToken,
            });

            const newAccessToken =
                resp?.data?.accessToken ||
                resp?.data?.token ||
                resp?.data?.access_token;
            const newRefreshToken = resp?.data?.refreshToken ?? refreshToken;

            if (!newAccessToken) {
                throw new Error(
                    "Refresh response does not contain access token",
                );
            }

            // Cập nhật Redux
            if (reduxStore) {
                reduxStore.dispatch(
                    authTokenReceived({
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    }),
                );
            }

            // Báo queue & retry request cũ
            onRefreshed(newAccessToken);
            originalRequest.headers = {
                ...(originalRequest.headers || {}),
                Authorization: `Bearer ${newAccessToken}`,
            };
            return api(originalRequest);
        } catch (err) {
            if (reduxStore) reduxStore.dispatch(authLoggedOut());
            clearQueueError(err);
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    },
);

export default api;
