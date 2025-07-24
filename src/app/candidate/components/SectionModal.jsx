"use client";
import { useState } from "react";

const sectionConfigs = {
  aboutMe: {
    fields: [
      {
        key: "text",
        label: "Description",
        type: "textarea",
        placeholder: "Introduce your strengths and years of experience",
      },
    ],
  },
  personalDetail: {
    fields: [
      {
        key: "name",
        label: "Name",
        type: "text",
        placeholder: "Your full name",
      },
      {
        key: "title",
        label: "Title",
        type: "text",
        placeholder: "Your job title",
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        placeholder: "Your email address",
      },
      { key: "dateOfBirth", label: "Date of Birth", type: "date" },
      {
        key: "address",
        label: "Address",
        type: "text",
        placeholder: "Your current address",
      },
      {
        key: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "Your phone number",
      },
      {
        key: "gender",
        label: "Gender",
        type: "text",
        placeholder: "Your gender",
      },
      {
        key: "personalLink",
        label: "Personal Link",
        type: "url",
        placeholder: "Your portfolio/website",
      },
    ],
  },
  language: {
    fields: [
      {
        key: "name",
        label: "Language",
        type: "text",
        placeholder: "e.g., English",
      },
      {
        key: "level",
        label: "Level",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced", "Native"],
      },
    ],
  },
  skills: {
    fields: [
      {
        key: "name",
        label: "Skill Name",
        type: "text",
        placeholder: "e.g., React",
      },
      {
        key: "level",
        label: "Level",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced", "Expert"],
      },
    ],
  },
  education: {
    fields: [
      {
        key: "school",
        label: "School",
        type: "text",
        placeholder: "University/School name",
      },
      {
        key: "degree",
        label: "Degree",
        type: "text",
        placeholder: "e.g., Bachelor - Computer Science",
      },
      {
        key: "major",
        label: "Major",
        type: "text",
        placeholder: "Your major/field of study",
      },
      {
        key: "date",
        label: "Date",
        type: "text",
        placeholder: "e.g., 08/2021 - NOW",
      },
      {
        key: "note",
        label: "Note",
        type: "textarea",
        placeholder: "Additional information",
      },
    ],
  },
  workExperience: {
    fields: [
      {
        key: "position",
        label: "Position",
        type: "text",
        placeholder: "Job title",
      },
      {
        key: "company",
        label: "Company",
        type: "text",
        placeholder: "Company name",
      },
      {
        key: "time",
        label: "Duration",
        type: "text",
        placeholder: "e.g., 02/2020 - NOW",
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Job description",
      },
      {
        key: "project",
        label: "Project",
        type: "textarea",
        placeholder: "Projects worked on",
      },
    ],
  },
  certificates: {
    fields: [
      {
        key: "name",
        label: "Certificate Name",
        type: "text",
        placeholder: "Certificate title",
      },
      {
        key: "issuer",
        label: "Issuer",
        type: "text",
        placeholder: "Issuing organization",
      },
      {
        key: "date",
        label: "Issue Date",
        type: "text",
        placeholder: "e.g., 06/2023",
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Certificate description",
      },
    ],
  },
  awards: {
    fields: [
      {
        key: "name",
        label: "Award Name",
        type: "text",
        placeholder: "e.g., Dean's List",
      },
      {
        key: "organization",
        label: "Organization",
        type: "text",
        placeholder: "Awarding organization",
      },
      {
        key: "issueDate.month",
        label: "Month",
        type: "select",
        options: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      {
        key: "issueDate.year",
        label: "Year",
        type: "number",
        placeholder: "e.g., 2023",
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Award description",
      },
    ],
  },
  highlightProject: {
    fields: [
      {
        key: "title",
        label: "Project Title",
        type: "text",
        placeholder: "Project name",
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Project description",
      },
      {
        key: "date",
        label: "Duration",
        type: "text",
        placeholder: "e.g., 03/2022 - 06/2022",
      },
      {
        key: "link",
        label: "Project Link",
        type: "url",
        placeholder: "https://example.com",
      },
    ],
  },
};

export default function SectionModal({
  sectionId,
  sectionTitle,
  initialData = {},
  onClose,
  onSave,
}) {
  const config = sectionConfigs[sectionId];

  // Initialize form data
  const initializeFormData = () => {
    const defaultData = {};
    config.fields.forEach((field) => {
      if (field.key.includes(".")) {
        // Handle nested objects like issueDate.month
        const [parent, child] = field.key.split(".");
        if (!defaultData[parent]) defaultData[parent] = {};
        defaultData[parent][child] = initialData[parent]?.[child] || "";
      } else {
        defaultData[field.key] = initialData[field.key] || "";
      }
    });
    return defaultData;
  };

  const [formData, setFormData] = useState(initializeFormData());

  const handleChange = (key, value) => {
    if (key.includes(".")) {
      // Handle nested objects
      const [parent, child] = key.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!config) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-white rounded-xl">
        <h2 className="mb-4 text-xl font-semibold">
          {initialData && Object.keys(initialData).length > 0 ? "Edit" : "Add"}{" "}
          {sectionTitle}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {config.fields.map((field) => {
            const value = field.key.includes(".")
              ? formData[field.key.split(".")[0]]?.[field.key.split(".")[1]] ||
                ""
              : formData[field.key] || "";

            return (
              <div key={field.key}>
                <label className="block mb-1 font-medium text-gray-700">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={3}
                  />
                ) : field.type === "select" ? (
                  <select
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    value={value}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    min={field.type === "number" ? "1950" : undefined}
                    max={field.type === "number" ? "2030" : undefined}
                  />
                )}
              </div>
            );
          })}
        </form>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
