"use client";

import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ApplicationModal = ({ onClose, jobTitle = "" }) => {
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("");
        }
    };

    const handleChooseFileClick = () => {
        fileInputRef.current?.click();
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
                            <p className="text-gray-500 text-sm">
                                Chọn CV để ứng tuyển
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">
                                Chọn CV từ máy:
                            </p>
                            <Button
                                variant="outline"
                                onClick={handleChooseFileClick}
                            >
                                {fileName ? "Đổi CV" : "Chọn tệp"}
                            </Button>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            {fileName && (
                                <p className="text-sm mt-2 text-gray-700">
                                    Tệp đã chọn:{" "}
                                    <span className="font-medium">
                                        {fileName}
                                    </span>
                                </p>
                            )}
                        </div>

                        <div className="text-sm text-gray-800 space-y-3">
                            <div>
                                <label className="block font-medium mb-1">
                                    Họ và tên:
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-md p-2 text-sm"
                                    placeholder="Nhập họ tên"
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    className="w-full border rounded-md p-2 text-sm"
                                    placeholder="Nhập email"
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Số điện thoại:
                                </label>
                                <input
                                    type="tel"
                                    className="w-full border rounded-md p-2 text-sm"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thư giới thiệu:
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn gây ấn tượng..."
                            className="w-full border rounded-md p-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-2 border-t pt-4">
                        <Button variant="ghost" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => {
                                alert("Nộp hồ sơ thành công!");
                                onClose();
                            }}
                        >
                            Nộp hồ sơ ứng tuyển
                        </Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ApplicationModal;
