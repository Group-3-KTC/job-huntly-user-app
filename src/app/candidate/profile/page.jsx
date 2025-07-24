"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSection,
  addArrayItem,
  updateArrayItem,
  deleteArrayItem,
  deleteSection,
  syncFromLocalStorage,
} from "@/features/profile/profileSlice";
import { getProfileSectionData } from "@/app/candidate/profile/components/profileData";
import ProfileSidebarRight from "@/app/candidate/components/ProfileSidebarRight";
import SectionCard from "@/app/candidate/components/SectionCard";
import SectionModal from "@/app/candidate/components/SectionModal";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profileData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [editingItemIndex, setEditingItemIndex] = useState(null);

  const profileSectionData = getProfileSectionData(profileData);

  useEffect(() => {
    // Đồng bộ dữ liệu từ localStorage khi client mount
    dispatch(syncFromLocalStorage());
  }, [dispatch]);

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
      dispatch(deleteSection({ sectionId: section.id }));
    }
  };

  const handleEditItem = (section, itemIndex) => {
    setCurrentSection(section);
    setEditingItemIndex(itemIndex);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (section, itemIndex) => {
    dispatch(
      deleteArrayItem({
        sectionId: section.id,
        index: itemIndex,
      }),
    );
  };

  const handleSave = (newData) => {
    if (isArraySection(currentSection.id)) {
      if (editingItemIndex !== null) {
        dispatch(
          updateArrayItem({
            sectionId: currentSection.id,
            index: editingItemIndex,
            item: newData,
          }),
        );
      } else {
        dispatch(
          addArrayItem({
            sectionId: currentSection.id,
            item: newData,
          }),
        );
      }
    } else {
      dispatch(
        updateSection({
          sectionId: currentSection.id,
          data: newData,
        }),
      );
    }

    setIsModalOpen(false);
    setCurrentSection(null);
    setEditingItemIndex(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSection(null);
    setEditingItemIndex(null);
  };

  return (
    <div className="flex flex-col w-full gap-6 lg:flex-row lg:items-start">
      <div className="flex-1 w-full xl:max-w-[78%]">
        <div className="grid grid-cols-1 gap-4">
          {profileSectionData.map((section) => {
            const sectionData =
              profileData[section.id] || (isArraySection(section.id) ? [] : {});
            const hasContent = Array.isArray(sectionData)
              ? sectionData.length > 0
              : Object.keys(sectionData).length > 0;

            let content = null;
            if (hasContent && section.renderComponent) {
              const Component = section.renderComponent;
              content = (
                <Component
                  data={sectionData}
                  onEdit={
                    isArraySection(section.id)
                      ? (itemIndex) => handleEditItem(section, itemIndex)
                      : undefined
                  }
                  onDelete={
                    isArraySection(section.id)
                      ? (itemIndex) => handleDeleteItem(section, itemIndex)
                      : undefined
                  }
                />
              );
            } else if (isArraySection(section.id) && sectionData.length > 0) {
              content = (
                <ul>
                  {sectionData.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      <strong>{item.name}</strong> ({item.level})
                      <button
                        onClick={() => handleDeleteItem(section, index)}
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
                  !hasContent || isArraySection(section.id)
                    ? () => handleAdd(section)
                    : undefined
                }
                onDelete={
                  section.isCustom ? () => handleDelete(section) : undefined
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
              ? profileData[currentSection.id][editingItemIndex] || {}
              : isArraySection(currentSection.id)
              ? {}
              : profileData[currentSection.id] || {}
          }
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}