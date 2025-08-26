"use client";

import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import applicationSchema from "@/validation/applicationSchema";

const API_BASE_URL = "http://18.142.226.139:8080";
const APPLY_ENDPOINT = `${API_BASE_URL}/api/v1/application`;

function getAccessToken() {
    try {
        const raw =
            typeof window !== "undefined"
                ? localStorage.getItem("authState")
                : null;
        if (!raw) return null;
        const { accessToken } = JSON.parse(raw);
        return accessToken || null;
    } catch {
        return null;
    }
}

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
            alert("Thiếu jobId để nộp hồ sơ. Vui lòng thử lại.");
            return;
        }
        if (!data.cvFile) {
            alert("Bạn chưa chọn tệp CV.");
            return;
        }

        try {
            setSubmitting(true);

            const accessToken = getAccessToken();

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
                headers: accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : undefined,
                body: formData,
            });

            const responseText = await res.text();
            if (!res.ok) {
                console.error("Apply error:", res.status, responseText);
                if (
                    responseText?.toLowerCase().includes("duplicate") ||
                    responseText?.toLowerCase().includes("constraint")
                ) {
                    alert("Bạn đã ứng tuyển công việc này rồi.");
                } else {
                    alert(`Nộp hồ sơ thất bại (${res.status}).`);
                }
                return;
            }

            alert("Nộp hồ sơ thành công!");
            reset();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi nộp hồ sơ.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start">
                        <div>
                            <Dialog.Title className="text-lg font-semibold text-blue-600 mb-1">
                                Ứng tuyển {jobTitle}
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
                        <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                    Chọn CV từ máy:
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
                                    <p className="text-sm mt-2 text-gray-700">
                                        Tệp đã chọn:{" "}
                                        <span className="font-medium">
                                            {selectedFile.name}
                                        </span>
                                    </p>
                                )}
                                {errors.cvFile && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.cvFile.message}
                                    </p>
                                )}
                            </div>

                            <div className="text-sm text-gray-800 space-y-3">
                                <div>
                                    <label className="block font-medium mb-1">
                                        Họ và tên:
                                    </label>
                                    <input
                                        {...register("fullName")}
                                        type="text"
                                        className="w-full border rounded-md p-2 text-sm"
                                        placeholder="Nhập họ tên"
                                        disabled={submitting}
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Email:
                                    </label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        className="w-full border rounded-md p-2 text-sm"
                                        placeholder="Nhập email"
                                        disabled={submitting}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Số điện thoại:
                                    </label>
                                    <input
                                        {...register("phoneNumber")}
                                        type="tel"
                                        className="w-full border rounded-md p-2 text-sm"
                                        placeholder="Nhập số điện thoại"
                                        disabled={submitting}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.phoneNumber.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                                Thư giới thiệu:
                            </label>
                            <textarea
                                {...register("coverLetter")}
                                rows={4}
                                placeholder="Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn gây ấn tượng..."
                                className="w-full border rounded-md p-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                disabled={submitting}
                            />
                        </div>

                        <div className="flex justify-end gap-2 border-t pt-4">
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={onClose}
                                disabled={submitting}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 text-white hover:bg-blue-700"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Đang nộp..."
                                    : "Nộp hồ sơ ứng tuyển"}
                            </Button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ApplicationModal;
