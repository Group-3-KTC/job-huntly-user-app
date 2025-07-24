"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import reportSchema from "@/validation/reportSchema";
import axios from "axios";

const ReportModal = ({ open, onClose }) => {
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(reportSchema),
        defaultValues: {
            reportType: "",
            description: "",
            status: "PROCESS"
        },
    });

    const onSubmit = async (data) => {
        try {
            await axios.post(
                "https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/reports",
                data
            );

            console.log("Gửi báo cáo thành công:", data);
            alert("Báo cáo đã được gửi thành công!");
            onClose();
            reset();
        } catch (error) {
            console.error("Lỗi khi gửi báo cáo:", error);
            alert("Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">Gửi báo cáo</DialogTitle>
                    <DialogDescription>
                        Vui lòng điền thông tin báo cáo bên dưới
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-4 py-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="reportType">Loại báo cáo</Label>
                        <Controller
                            name="reportType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) =>
                                        field.onChange(value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn loại báo cáo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Report Job">
                                            Báo cáo bài tuyển dụng
                                        </SelectItem>
                                        <SelectItem value="Report Company">
                                            Báo cáo công ty
                                        </SelectItem>
                                        <SelectItem value="Report User">
                                            Báo cáo người dùng
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.reportType && (
                            <p className="text-sm text-red-500">
                                {errors.reportType.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Nội dung báo cáo</Label>
                        <Input
                            id="description"
                            {...register("description")}
                            placeholder="Nhập mô tả chi tiết..."
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Controller
                            name="confirm"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    id="confirm"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                        <Label htmlFor="confirm" className="text-sm">
                            Tôi cam kết nội dung báo cáo là chính xác
                        </Label>
                    </div>
                    {errors.confirm && (
                        <p className="text-sm text-red-500">
                            {errors.confirm.message}
                        </p>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Quay lại
                        </Button>
                        <Button type="submit">Xác nhận</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
