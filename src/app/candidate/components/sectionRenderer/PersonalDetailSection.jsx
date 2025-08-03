import { Mail, Gift, MapPin, Phone, User, Link, Camera } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import userImg from "@/assets/images/user-img.png";

export default function PersonalDetailSection({ data }) {
    const [tempAvatar, setTempAvatar] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Vui lòng chọn file ảnh!");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert("File ảnh không được vượt quá 5MB!");
                return;
            }

            setIsUploading(true);
            const tempImageUrl = URL.createObjectURL(file);

            setTimeout(() => {
                setTempAvatar(tempImageUrl);
                setIsUploading(false);
                console.log("Ảnh upload tạm thời:", tempImageUrl);
            }, 500);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };


    const getDisplayAvatar = () => {
        if (tempAvatar) return tempAvatar;
        return data.avatar || userImg;
    };

    const displayAvatar = getDisplayAvatar();
    const shouldUseImgTag =
        displayAvatar &&
        typeof displayAvatar === "string" &&
        (displayAvatar.startsWith("http") || displayAvatar.startsWith("blob:"));

    return (
        <div className="space-y-4 text-lg text-gray-700">
            <div className="flex items-center gap-2">
                <div className="relative w-[60px] h-[60px] group">
                    
                    <div className="w-full h-full overflow-hidden bg-gray-100 rounded-full">
                        {shouldUseImgTag ? (
                            <img
                                src={displayAvatar}
                                alt="User Image"
                                className="object-cover object-center w-full h-full transition-opacity cursor-pointer group-hover:opacity-75"
                                onClick={handleImageClick}
                                onError={(e) => {
                                    if (tempAvatar) {
                                        setTempAvatar(null);
                                    }
                                }}
                            />
                        ) : (
                            <Image
                                src={displayAvatar}
                                alt="User Image"
                                width={60}
                                height={60}
                                className="object-cover object-center w-full h-full transition-opacity rounded-full cursor-pointer group-hover:opacity-75"
                                onClick={handleImageClick}
                            />
                        )}
                    </div>

                    <div
                        className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-full opacity-0 cursor-pointer group-hover:opacity-100"
                        onClick={handleImageClick}
                    >
                        {isUploading ? (
                            <div className="w-6 h-6 border-2 border-white rounded-full border-b-transparent animate-spin"></div>
                        ) : (
                            <Camera size={20} className="text-white" />
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-black">
                        {data.name || "Your Name Here"}
                    </h1>
                    <p className="mt-2 font-semibold text-gray-600 text-md">
                        {data.title || "Your Title Here"}
                    </p>
                </div>
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="w-full space-y-2 sm:w-1/2">
                    <p className="flex items-center">
                        <Mail size={18} className="mr-2 text-gray-500" />
                        {data.email || "Your Email Here"}
                    </p>
                    <p className="flex items-center">
                        <Gift size={18} className="mr-2 text-gray-500" />
                        {data.dateOfBirth
                            ? new Date(data.dateOfBirth)
                                  .toISOString()
                                  .split("T")[0]
                            : "Your Date of Birth Here"}
                    </p>
                    <p className="flex items-center">
                        <MapPin size={18} className="mr-2 text-gray-500" />
                        {data.address || "Your Address Here"}
                    </p>
                </div>
                <div className="w-full space-y-2 sm:w-1/2">
                    <p className="flex items-center">
                        <Phone size={18} className="mr-2 text-gray-500" />
                        {data.phone || "Your Phone Number Here"}
                    </p>
                    <p className="flex items-center">
                        <User size={18} className="mr-2 text-gray-500" />
                        {data.gender || "Your Gender Here"}
                    </p>
                    <p className="flex items-center">
                        <Link size={18} className="mr-2 text-gray-500" />
                        {data.personalLink ? (
                            <a
                                href={data.personalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base text-blue-500 hover:underline truncate max-w-[200px] inline-block align-middle"
                                title={data.personalLink}
                            >
                                {data.personalLink}
                            </a>
                        ) : (
                            "Your Personal Link Here"
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
