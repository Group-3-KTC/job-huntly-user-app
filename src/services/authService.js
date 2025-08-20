import api from "@/lib/api";

const authService = {
    async login(credentials) {
        const { data } = await api.post("/auth/login", credentials);
        return {
            accessToken: data.access_token,
            refreshToken: null,
            user: {
                id: data.user_id,
                email: data.email,
                fullname: data.fullName,
                role: data.role,
                tokenType: data.token_type,
                expiresIn: data.expires_in,
            },
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
