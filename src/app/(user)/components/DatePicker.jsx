"use client";
import { useState, useEffect } from "react";
import { format, parse, isValid } from "date-fns";

const DatePicker = ({ value, onChange, placeholder, name, error }) => {
    const [inputValue, setInputValue] = useState("");

    // Chuyển đổi giá trị Date thành định dạng yyyy-MM-dd cho input type="date"
    useEffect(() => {
        if (value && isValid(value)) {
            setInputValue(format(value, "yyyy-MM-dd")); // Định dạng cho input date
        } else {
            setInputValue("");
        }
    }, [value]);

    // Xử lý khi người dùng chọn ngày từ native date picker
    const handleInputChange = (e) => {
        const input = e.target.value; // Giá trị từ input date là yyyy-MM-dd
        setInputValue(input);

        if (input) {
            const parsed = parse(input, "yyyy-MM-dd", new Date());
            if (isValid(parsed)) {
                onChange(parsed); // Trả về Date object cho react-hook-form
            } else {
                onChange(null);
            }
        } else {
            onChange(null);
        }
    };

    return (
        <div className="relative">
            <input
                type="date" // Sử dụng native date picker
                name={name}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder || "Select a date"}
                className={`w-full p-2 border rounded-md ${
                    error
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default DatePicker;