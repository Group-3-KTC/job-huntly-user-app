import * as yup from "yup";
export const candidateRegisterSchema = yup.object().shape({
    fullname: yup
        .string()
        .required("Họ và tên là bắt buộc")
        .min(2, "Họ và tên phải có ít nhất 2 ký tự")
        .max(50, "Họ và tên không được quá 50 ký tự"),
    email: yup
        .string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
    phone: yup
        .string()
        .required("Số điện thoại là bắt buộc")
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không được quá 11 số"),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
        ),
    confirmPassword: yup
        .string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
    terms: yup.boolean().oneOf([true], "Bạn phải chấp nhận điều khoản sử dụng"),
});

// Schema cho đăng ký nhà tuyển dụng
export const recruiterRegisterSchema = yup.object().shape({
    fullname: yup
        .string()
        .required("Họ và tên là bắt buộc")
        .min(2, "Họ và tên phải có ít nhất 2 ký tự")
        .max(50, "Họ và tên không được quá 50 ký tự"),
    email: yup
        .string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
    phone: yup
        .string()
        .required("Số điện thoại là bắt buộc")
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không được quá 11 số"),
    password: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
        ),
    confirmPassword: yup
        .string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
    taxCode: yup
        .string()
        .required("Mã số thuế là bắt buộc")
        .matches(/^[0-9]+$/, "Mã số thuế chỉ được chứa số")
        .min(10, "Mã số thuế phải có ít nhất 10 số")
        .max(13, "Mã số thuế không được quá 13 số"),
    companyName: yup
        .string()
        .required("Tên công ty là bắt buộc")
        .min(2, "Tên công ty phải có ít nhất 2 ký tự")
        .max(100, "Tên công ty không được quá 100 ký tự"),
    isHiring: yup.string().required("Vui lòng chọn nhu cầu tuyển dụng"),
    terms: yup.boolean().oneOf([true], "Bạn phải chấp nhận điều khoản sử dụng"),
});
