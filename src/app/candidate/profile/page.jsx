"use client";

import { useState } from "react";
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
} from "@/services/profileService";
import { getProfileSectionData } from "@/app/candidate/profile/components/profileData";
import ProfileSidebarRight from "@/app/candidate/components/ProfileSidebarRight";
import SectionCard from "@/app/candidate/components/SectionCard";
import SectionModal from "@/app/candidate/components/SectionModal";

export default function ProfilePage() {
    const { data: profileData, isLoading, error } = useGetProfileQuery("1");
    const [updateProfile] = useUpdateProfileMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [editingItemIndex, setEditingItemIndex] = useState(null);

    // Chuẩn hóa dữ liệu aboutMe
    const normalizedProfileData = {
        ...profileData,
        aboutMe: profileData?.aboutMe || { text: "" }, // Đảm bảo aboutMe luôn là object
        id: profileData?.id || "1",
    };

    const profileSectionData = getProfileSectionData(
        normalizedProfileData || {}
    );

    const isArraySection = (sectionId) => {
        const arrayTypes = [
            "education",
            "workExperience",
            "skills",
            "certificates",
            "awards",
            "highlightProject",
            "language",
        ];
        return arrayTypes.includes(sectionId);
    };

    // Hàm kiểm tra nội dung có ý nghĩa
    const hasMeaningfulContent = (sectionId, sectionData) => {
        if (sectionId === "aboutMe") {
            return sectionData?.text?.trim().length > 0; // Chỉ có nội dung khi text không rỗng
        }
        return Array.isArray(sectionData)
            ? sectionData.length > 0
            : Object.keys(sectionData).length > 0;
    };

    const handleEdit = (section) => {
        setCurrentSection(section);
        setEditingItemIndex(null);
        setIsModalOpen(true);
    };

    const handleAdd = (section) => {
        setCurrentSection(section);
        setEditingItemIndex(null);
        setIsModalOpen(true);
    };

    const handleDelete = (section) => {
        if (section.isCustom) {
            const updatedProfile = structuredClone({
                ...normalizedProfileData,
            });
            delete updatedProfile[section.id];
            updateProfile(updatedProfile);
        }
    };

    const handleEditItem = (section, itemIndex) => {
        setCurrentSection(section);
        setEditingItemIndex(itemIndex);
        setIsModalOpen(true);
    };

    const handleDeleteItem = (section, itemIndex) => {
        const updatedProfile = structuredClone({ ...normalizedProfileData });
        if (updatedProfile[section.id]) {
            updatedProfile[section.id].splice(itemIndex, 1);
            updateProfile(updatedProfile);
        }
    };

    const handleSave = (newData) => {
        const updatedProfile = structuredClone({ ...normalizedProfileData });
        if (isArraySection(currentSection.id)) {
            if (editingItemIndex !== null) {
                if (updatedProfile[currentSection.id]) {
                    updatedProfile[currentSection.id][editingItemIndex] =
                        newData;
                }
            } else {
                if (!updatedProfile[currentSection.id]) {
                    updatedProfile[currentSection.id] = [];
                }
                updatedProfile[currentSection.id].push(newData);
            }
        } else {
            updatedProfile[currentSection.id] = newData;
        }
        updateProfile(updatedProfile);
        setIsModalOpen(false);
        setCurrentSection(null);
        setEditingItemIndex(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentSection(null);
        setEditingItemIndex(null);
    };

    if (isLoading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error.message}</div>;

    return (
        <div className="flex flex-col w-full gap-6 lg:flex-row lg:items-start">
            <div className="flex-1 w-full xl:max-w-[78%]">
                <div className="grid grid-cols-1 gap-4">
                    {profileSectionData.map((section) => {
                        const sectionData =
                            normalizedProfileData?.[section.id] ||
                            (isArraySection(section.id) ? [] : {});
                        const hasContent = hasMeaningfulContent(
                            section.id,
                            sectionData
                        );

                        console.log(
                            `Section: ${section.id}, hasContent: ${hasContent}, data:`,
                            sectionData
                        ); // Debug

                        let content = null;
                        if (hasContent && section.renderComponent) {
                            const Component = section.renderComponent;
                            content = (
                                <Component
                                    data={sectionData}
                                    onEdit={
                                        isArraySection(section.id)
                                            ? (itemIndex) =>
                                                  handleEditItem(
                                                      section,
                                                      itemIndex
                                                  )
                                            : undefined
                                    }
                                    onDelete={
                                        isArraySection(section.id)
                                            ? (itemIndex) =>
                                                  handleDeleteItem(
                                                      section,
                                                      itemIndex
                                                  )
                                            : undefined
                                    }
                                />
                            );
                        } else if (
                            isArraySection(section.id) &&
                            sectionData.length > 0
                        ) {
                            content = (
                                <ul>
                                    {sectionData.map((item, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-gray-700"
                                        >
                                            <strong>{item.name}</strong> (
                                            {item.level})
                                            <button
                                                onClick={() =>
                                                    handleDeleteItem(
                                                        section,
                                                        index
                                                    )
                                                }
                                                className="ml-2 text-red-500"
                                            >
                                                Xóa
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            );
                        }

                        return (
                            <SectionCard
                                key={section.id}
                                id={section.id}
                                title={section.title}
                                description={section.description}
                                imageSrc={section.imageSrc}
                                imageAlt={section.imageAlt}
                                content={content}
                                data={sectionData}
                                onEdit={
                                    hasContent && !isArraySection(section.id)
                                        ? () => handleEdit(section)
                                        : undefined
                                }
                                onAdd={
                                    isArraySection(section.id)
                                        ? () => handleAdd(section)
                                        : !hasContent
                                        ? () => handleAdd(section)
                                        : undefined
                                }
                                onDelete={
                                    section.isCustom
                                        ? () => handleDelete(section)
                                        : undefined
                                }
                            />
                        );
                    })}
                </div>
            </div>

            <div className="w-full lg:max-w-[25%] shrink-0 sticky top-24 h-fit max-h-[calc(100vh-2rem)]">
                <ProfileSidebarRight />
            </div>

            {isModalOpen && currentSection && (
                <SectionModal
                    sectionId={currentSection.id}
                    sectionTitle={currentSection.title}
                    initialData={
                        editingItemIndex !== null
                            ? normalizedProfileData?.[currentSection.id]?.[
                                  editingItemIndex
                              ] || {}
                            : isArraySection(currentSection.id)
                            ? {}
                            : normalizedProfileData?.[currentSection.id] || {}
                    }
                    onSave={handleSave}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}