"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ApplicationModal = ({ onClose, jobTitle = "" }) => {
    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl space-y-5 overflow-y-auto max-h-[90vh]">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <Dialog.Title className="text-lg font-semibold text-blue-600 mb-1">
                                Ứng tuyển {jobTitle} - Đi Làm Ngay
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

                    {/* Option 1: CV gần nhất */}
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            name="cvOption"
                            value="latestCV"
                            className="hidden peer"
                            defaultChecked
                        />
                        <div className="border border-blue-500 rounded-lg p-4 bg-blue-50 peer-checked:border-blue-700 peer-checked:bg-blue-100">
                            <p className="text-sm text-blue-600 font-medium">
                                CV ứng tuyển gần nhất:{" "}
                                <span className="text-blue-700 font-semibold underline cursor-pointer">
                                    NguyenAnhHuy-CV2.pdf
                                </span>{" "}
                                <span className="ml-2 text-blue-600 hover:underline cursor-pointer">
                                    Xem
                                </span>
                            </p>
                            <div className="text-sm text-gray-800 mt-2 space-y-1">
                                <p>
                                    <strong>Họ và tên:</strong> Nguyen Anh Huy
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    anhhuy598598@gmail.com
                                </p>
                                <p>
                                    <strong>Số điện thoại:</strong> 0945547819
                                </p>
                            </div>
                        </div>
                    </label>

                    {/* Option 2: Thư viện CV */}
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            name="cvOption"
                            value="libraryCV"
                            className="hidden peer"
                        />
                        <div className="border rounded-lg p-3 peer-checked:border-blue-700 peer-checked:bg-blue-100 hover:bg-gray-50">
                            <p className="text-sm font-medium text-gray-700">
                                Chọn CV khác trong thư viện CV của tôi
                            </p>
                        </div>
                    </label>

                    {/* Option 3: Upload CV */}
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            name="cvOption"
                            value="uploadCV"
                            className="hidden peer"
                        />
                        <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 peer-checked:border-blue-700 peer-checked:bg-blue-100 text-center text-sm text-gray-600 hover:bg-gray-50">
                            <p className="mb-2">
                                Tải lên CV từ máy tính, chọn hoặc kéo thả
                            </p>
                            <Button variant="outline">Chọn CV</Button>
                            <p className="text-xs mt-1 text-gray-400">
                                Hỗ trợ định dạng .doc, .docx, pdf có kích thước
                                dưới 5MB
                            </p>
                        </div>
                    </label>

                    {/* Cover letter */}
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

                    {/* Actions */}
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
