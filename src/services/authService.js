import { users } from "@/mock/users";
import { signToken } from "@/lib/jwt";

export const login = async ({ email, password, role }) => {
    // const foundUser = users.find((u) => u.email === email);
    //
    // if (!foundUser) {
    //     throw new Error("Email không tồn tại.");
    // }
    //
    // if (foundUser.password !== password) {
    //     throw new Error("Mật khẩu không chính xác.");
    // }
    //
    // if (foundUser.role !== role) {
    //     throw new Error(
    //         `Tài khoản này là ${foundUser.role === "candidate" ? "Ứng viên" : "Nhà tuyển dụng"}, không thể đăng nhập ở vai trò ${role === "candidate" ? "Ứng viên" : "Nhà tuyển dụng"}.`,
    //     );
    // }
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

export const register = async ({ email, password, name }) => {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) throw new Error("Email already registered");

    const newUser = {
        id: Date.now(),
        email,
        password,
        name,
        role: "candidate",
    };
    users.push(newUser);
    return new Promise((resolve) =>
        setTimeout(() => resolve({ user: newUser }), 500),
    );
};
