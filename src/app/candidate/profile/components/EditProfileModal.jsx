// components/EditProfileModal.jsx
"use client";
import { useState } from "react";

export default function EditProfileModal({ section, onSave, onClose }) {
  const { id, title, data } = section;

  // Khởi tạo formData dựa trên loại section
  const initialFormData =
    id === "awards"
      ? data || [] // Sử dụng mảng cho awards
      : data || {}; // Sử dụng object cho các section khác
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (id === "awards" && name === "awards") {
      setFormData(value.split("\n").filter(Boolean)); // Cập nhật mảng trực tiếp
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const renderForm = () => {
    switch (id) {
      case "aboutMe":
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="text"
              defaultValue={formData.text || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
        );
      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                School
              </label>
              <input
                name="school"
                defaultValue={formData.school || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                name="degree"
                defaultValue={formData.degree || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                name="date"
                defaultValue={formData.date || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Note
              </label>
              <textarea
                name="note"
                defaultValue={formData.note || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
          </div>
        );
      case "workExperience":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                name="position"
                defaultValue={formData.position || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                name="time"
                defaultValue={formData.time || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={formData.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project
              </label>
              <textarea
                name="project"
                defaultValue={formData.project || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
          </div>
        );
      case "language":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <input
                name="name"
                defaultValue={formData.name || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <select
                name="level"
                defaultValue={formData.level || "Intermediate"}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
              </select>
            </div>
          </div>
        );
      case "awards":
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Awards (one per line)
            </label>
            <textarea
              name="awards"
              defaultValue={Array.isArray(formData) ? formData.join("\n") : ""}
              onChange={(e) =>
                setFormData(e.target.value.split("\n").filter(Boolean))
              }
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
        );
      default:
        return (
          <p className="text-sm text-gray-500">
            No form available for this section.
          </p>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl">
        <h2 className="mb-4 text-xl font-bold">Edit {title}</h2>
        {renderForm()}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
