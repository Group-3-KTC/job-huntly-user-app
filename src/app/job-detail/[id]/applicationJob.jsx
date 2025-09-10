"use client";

import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import applicationSchema from "@/validation/applicationSchema";

const APPLY_ENDPOINT = `/api/v1/application`;

const ApplicationModal = ({ onClose, jobTitle = "", jobId }) => {
    const fileInputRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(applicationSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            cvFile: null,
            coverLetter: "",
        },
    });

    const selectedFile = watch("cvFile");

    const handleChooseFileClick = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setValue("cvFile", file ?? null, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        if (!jobId) {
            toast.error("Thiếu jobId để nộp hồ sơ. Vui lòng thử lại.");
            return;
        }
        if (!data.cvFile) {
            toast.warning("Bạn chưa chọn tệp CV.");
            return;
        }

        try {
            setSubmitting(true);

            const formData = new FormData();
            formData.append("jobId", String(jobId));
            formData.append("cvFile", data.cvFile);
            formData.append("email", data.email);
            formData.append("phoneNumber", data.phoneNumber);
            formData.append("candidateName", data.fullName);
            if (data.coverLetter)
                formData.append("description", data.coverLetter);

            const res = await fetch(APPLY_ENDPOINT, {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const readErrorPayload = async (response) => {
                const ct = response.headers.get("content-type") || "";
                try {
                    if (ct.includes("application/json"))
                        return await response.json();
                    return await response.text();
                } catch {
                    return null;
                }
            };

            if (!res.ok) {
                const payload = await readErrorPayload(res);
                console.error("Apply error:", res.status, payload);
                const fieldMap = {
                    candidateName: "fullName",
                    phone_number: "phoneNumber",
                    phoneNumber: "phoneNumber",
                    email: "email",
                    cvFile: "cvFile",
                    description: "coverLetter",
                };

                if (payload && typeof payload === "object") {
                    if (Array.isArray(payload.errors)) {
                        payload.errors.forEach((e) => {
                            if (e?.field && e?.message) {
                                const feField = fieldMap[e.field] || e.field;
                                setError(feField, {
                                    type: "server",
                                    message: e.message,
                                });
                            }
                        });
                    }

                    const summary =
                        payload.message ||
                        payload.detail ||
                        payload.error ||
                        (Array.isArray(payload.errors) &&
                            payload.errors
                                .map((x) => x.message)
                                .filter(Boolean)
                                .join("\n")) ||
                        `Yêu cầu thất bại (${res.status}).`;

                    if (res.status === 409) {
                        toast.info(
                            summary || "Bạn đã ứng tuyển công việc này rồi."
                        );
                    } else if (res.status === 401) {
                        toast.error(
                            summary || "Bạn cần đăng nhập để nộp hồ sơ."
                        );
                    } else if (res.status === 400 || res.status === 422) {
                        toast.warning(
                            summary ||
                                "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại."
                        );
                    } else {
                        toast.error(summary);
                    }
                } else {
                    const text = typeof payload === "string" ? payload : "";
                    if (
                        res.status === 409 &&
                        text.toLowerCase().includes("duplicate")
                    ) {
                        toast.info(
                             "Bạn đã ứng tuyển công việc này rồi."
                        );
                    } else if (res.status === 401) {
                        toast.error(
                             "Bạn cần đăng nhập để nộp hồ sơ."
                        );
                    } else {
                        toast.error(text || `Nộp hồ sơ thất bại (${res.status}).`);
                    }
                }
                return;
            }
            toast.success("Nộp hồ sơ thành công!");
            reset();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra khi nộp hồ sơ.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-start justify-between">
                        <div>
                            <Dialog.Title className="mb-1 text-lg font-semibold text-blue-600">
                                Apply for {jobTitle}
                            </Dialog.Title>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-4 space-y-4 border border-gray-300 rounded-lg">
                            <div>
                                <p className="mb-1 text-sm font-medium text-gray-700">
                                    Select CV:
                                </p>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleChooseFileClick}
                                    disabled={submitting}
                                >
                                    {selectedFile ? "Đổi CV" : "Chọn tệp"}
                                </Button>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                {selectedFile && (
                                    <p className="mt-2 text-sm text-gray-700">
                                        Tệp đã chọn:{" "}
                                        <span className="font-medium">
                                            {selectedFile.name}
                                        </span>
                                    </p>
                                )}
                                {errors.cvFile && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.cvFile.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3 text-sm text-gray-800">
                                <div>
                                    <label className="block mb-1 font-medium">
                                        FullName:
                                    </label>
                                    <input
                                        {...register("fullName")}
                                        type="text"
                                        className="w-full p-2 text-sm border rounded-md"
                                        placeholder="Enter your fullname"
                                        disabled={submitting}
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Email:
                                    </label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        className="w-full p-2 text-sm border rounded-md"
                                        placeholder="Enter email"
                                        disabled={submitting}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Phone number:
                                    </label>
                                    <input
                                        {...register("phoneNumber")}
                                        type="tel"
                                        className="w-full p-2 text-sm border rounded-md"
                                        placeholder="Phone number"
                                        disabled={submitting}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.phoneNumber.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block mt-3 mb-1 text-sm font-medium text-gray-700">
                                Cover letter:
                            </label>
                            <textarea
                                {...register("coverLetter")}
                                rows={4}
                                placeholder="Well-written cover letter will help you make an impression...."
                                className="w-full p-2 text-sm text-gray-800 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                disabled={submitting}
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={onClose}
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="text-white bg-blue-600 hover:bg-blue-700"
                                disabled={submitting}
                            >
                                {submitting ? "Processing..." : "Apply"}
                            </Button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ApplicationModal;
