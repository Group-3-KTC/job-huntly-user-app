import { users } from "@/mock/users";
import { signToken } from "@/lib/jwt";

const API_BASE_URL = "https://6870769d7ca4d06b34b6dc65.mockapi.io/api/v1/users";

export const login = async ({ email, password, role }) => {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) {
        throw new Error("Không thể kết nối tới máy chủ.");
    }
    const users = await res.json();

    const user = users.find(
        (u) => u.email === email && u.password === password,
    );
    if (!user) {
        throw new Error("Invalid email or password");
    }
    if (user.role !== role) {
        throw new Error(
            `Tài khoản này là ${user.role === "candidate" ? "Ứng viên" : "Nhà tuyển dụng"}, không thể đăng nhập ở vai trò ${role === "candidate" ? "Ứng viên" : "Nhà tuyển dụng"}.`,
        );
    }
    const token = await signToken({ email: user.email, role: user.role });
    return new Promise((resolve) =>
        setTimeout(() => resolve({ user, token }), 3000),
    );
};

export const register = async ({ email, password, fullname, role }) => {
    if (!["candidate", "recruiter"].includes(role)) {
        throw new Error("Vai trò không hợp lệ");
    }
    const checkRes = await fetch(API_BASE_URL);
    const allUsers = await checkRes.json();
    const exists = allUsers.some((u) => u.email === email);
    if (exists) throw new Error("Email đã được đăng ký");

    const newUser = {
        email,
        password,
        fullname,
        role,
    };

    const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });

    return new Promise((resolve) =>
        setTimeout(() => resolve({ user: newUser }), 500),
    );
};
