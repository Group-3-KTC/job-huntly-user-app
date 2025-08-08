"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    useGetUserProfileQuery,
    useUpdateCandidateProfileMutation,
    useAddSectionItemMutation,
    useUpdateSectionItemMutation,
    useDeleteSectionItemMutation,
} from "@/services/profileService";
import { getProfileSectionData } from "@/app/(user)/profile/components/profileData";
import ProfileSidebarRight from "@/app/(user)/components/ProfileSidebarRight";
import SectionCard from "@/app/(user)/components/SectionCard";
import GenericModal from "@/app/(user)/components/GenericModal";
import { profileSectionConfigs } from "@/app/(user)/profile/components/profileSectionConfigs";
import {
    setNormalizedProfile,
    selectNormalizedProfile,
} from "@/features/profile/profileSlice";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const normalizedProfileData = useSelector(selectNormalizedProfile);
    const {
        data: profileData,
        isLoading,
        error,
        isSuccess,
    } = useGetUserProfileQuery();
    console.log("useGetUserProfileQuery result:", {
        profileData,
        isLoading,
        error,
        isSuccess,
    });

    const [updateCandidateProfile] = useUpdateCandidateProfileMutation();
    const [addSectionItem] = useAddSectionItemMutation();
    const [updateSectionItem] = useUpdateSectionItemMutation();
    const [deleteSectionItem] = useDeleteSectionItemMutation();
    const [isDeleting, setIsDeleting] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [editingItemIndex, setEditingItemIndex] = useState(null);

    useEffect(() => {
        console.log("useEffect triggered:", {
            profileData,
            isLoading,
            error,
            isSuccess,
        });

        if (isSuccess && profileData) {
            console.log("Profile data from API:", profileData);
            const normalizedData = {
                personalDetail: {
                    name: profileData?.name,
                    title: profileData?.title,
                    email: profileData?.email,
                    dateOfBirth: profileData?.dateOfBirth,
                    address: profileData?.address,
                    phone: profileData?.phone,
                    gender: profileData?.gender,
                    personalLink: profileData?.personalLink,
                    avatar: profileData?.avatar,
                },
                aboutMe: { text: profileData?.aboutMe || "" },
                skills: profileData?.skills || [],
                education: profileData?.education || [],
                workExperience: profileData?.workExperience || [],
                language: profileData?.language || [],
                certificates: profileData?.certificates || [],
                id: profileData?.id || "1",
            };
            console.log("Normalized data:", normalizedData);
            dispatch(setNormalizedProfile(normalizedData));
        }
    }, [profileData, isSuccess, dispatch]);

    const profileSectionData = getProfileSectionData(
        normalizedProfileData || {}
    );

    const isArraySection = (sectionId) => {
        return [
            "skills",
            "education",
            "workExperience",
            "language",
            "certificates",
        ].includes(sectionId);
    };

    const hasMeaningfulContent = (sectionId, sectionData) => {
        if (sectionId === "aboutMe") {
            return sectionData?.text?.trim().length > 0;
        }
        if (sectionId === "personalDetail") {
            return Object.keys(sectionData || {}).length > 0;
        }
        return Array.isArray(sectionData)
            ? sectionData.length > 0
            : Object.keys(sectionData || {}).length > 0;
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
        // Không hỗ trợ xóa section
    };

    const handleEditItem = (section, itemIndex) => {
        setCurrentSection(section);
        setEditingItemIndex(itemIndex);
        setIsModalOpen(true);
    };

    const handleDeleteItem = async (section, itemIndex) => {
        if (
            window.confirm(
                `Are you sure you want to delete this ${section.title} item?`
            )
        ) {
            setIsDeleting(true);
            try {
                const itemId =
                    normalizedProfileData[section.id]?.[itemIndex]?.id;
                if (itemId) {
                    console.log(`Deleting item ${itemId} from ${section.id}`);
                    await deleteSectionItem({
                        section: section.id,
                        profileId: "1",
                        itemId,
                    });
                } else {
                    console.log("No itemId found for deletion");
                }
            } catch (error) {
                console.error("Delete error:", error);
                alert("Failed to delete item");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleSave = async (newData) => {
        try {
            if (
                currentSection.id === "personalDetail" ||
                currentSection.id === "aboutMe"
            ) {
                const updatedData = {
                    ...profileData,
                    ...(currentSection.id === "aboutMe"
                        ? { aboutMe: newData.text }
                        : newData),
                };
                await updateCandidateProfile({ id: "1", ...updatedData });
            } else if (isArraySection(currentSection.id)) {
                if (editingItemIndex !== null) {
                    const itemId =
                        normalizedProfileData[currentSection.id]?.[
                            editingItemIndex
                        ]?.id;
                    if (itemId) {
                        await updateSectionItem({
                            section: currentSection.id,
                            profileId: "1",
                            itemId,
                            data: newData,
                        });
                    }
                } else {
                    await addSectionItem({
                        section: currentSection.id,
                        profileId: "1",
                        data: newData,
                    });
                }
            }
            setIsModalOpen(false);
            setCurrentSection(null);
            setEditingItemIndex(null);
        } catch (error) {
            console.error("Save error:", error);
            alert("Failed to save data");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentSection(null);
        setEditingItemIndex(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("API error details:", JSON.stringify(error, null, 2));
        return (
            <div>
                Error:{" "}
                {error?.data?.message ||
                    error?.error ||
                    error?.message ||
                    "Unable to load data"}
            </div>
        );
    }

    if (!isLoading && !error && !normalizedProfileData) {
        return <div>No profile data available</div>;
    }

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
                        );

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
                                            <strong>
                                                {item.name || "Unnamed"}
                                            </strong>{" "}
                                            ({item.level || "N/A"})
                                            <button
                                                onClick={() =>
                                                    handleDeleteItem(
                                                        section,
                                                        index
                                                    )
                                                }
                                                className="ml-2 text-red-500"
                                                disabled={isDeleting}
                                            >
                                                {isDeleting
                                                    ? "Deleting..."
                                                    : "Delete"}
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
                                    isArraySection(section.id) || !hasContent
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
                <GenericModal
                    sectionId={currentSection.id}
                    sectionTitle={currentSection.title}
                    config={profileSectionConfigs[currentSection.id]}
                    validationSchema={
                        profileSectionConfigs[currentSection.id]
                            .validationSchema
                    }
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