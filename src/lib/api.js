import axios from "axios";
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

export default api;
