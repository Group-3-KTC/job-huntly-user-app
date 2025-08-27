import api from "@/lib/api";

const authService = {
    async login(credentials) {
        const { data } = await api.post("/auth/login", credentials);
        return {
            user: data,
            message: "Đăng nhập thành công",
        };
    },

    async register(payload) {
        const { data } = await api.post("/auth/register", payload);
        return data;
    },

    async me() {
        const { data } = await api.get("/auth/me"); // lấy từ cookie httpOnly
        return { user: data };
    },

    async logout() {
        try {
            await api.post("/auth/logout");
        } catch {}
    },
};

export default authService;
