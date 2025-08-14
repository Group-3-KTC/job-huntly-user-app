import api from "@/lib/api";

export const login = ({ email, password, role }) => {
    return api.post("/auth/login", { email, password, role });
};

// POST http://localhost:8080/api/auth/register
export const register = ({ email, password, fullName, role }) => {
    return api.post("/auth/register", { email, password, fullName, role });
};

// GET http://localhost:8080/api/auth/activate?token=...
export const activate = (token) => {
    return api.get("/auth/activate", { params: { token } });
};

export const logout = () => api.post("/auth/logout");
