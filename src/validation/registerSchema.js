import * as yup from "yup";

export const registerSchema = yup.object({
    name: yup
        .string()
        .required("Họ tên là bắt buộc")
        .min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: yup
        .string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup
        .string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});
