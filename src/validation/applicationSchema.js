import * as yup from "yup";

const applicationSchema = yup.object().shape({
    fullName: yup.string().required("Vui lòng điền tên của bạn"),
    email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ"),
    phoneNumber: yup
        .string()
        .required("Vui lòng điền số điện thoại")
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không được quá 11 số"),

    cvFile: yup
        .mixed()
        .when(["$isReapply", "$keepCurrentCV"], (isReapply, keepCurrentCV) => {
            if (isReapply && keepCurrentCV) {
                return yup.mixed().nullable(true).notRequired();
            }
            return yup.mixed().required("Vui lòng chọn một file CV");
        }),
});

export default applicationSchema;
