"use client";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X, Save } from "lucide-react";

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
            {
                key: "avatar",
                label: "Avatar URL",
                type: "url",
                placeholder: "URL to your avatar image",
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
                options: ["beginner", "intermediate", "advanced", "native"],
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
                options: ["beginner", "intermediate", "advanced", "expert"],
            },
        ],
    },
    education: {
        fields: [
            {
                key: "school",
                label: "School",
                type: "text",
                placeholder: "University/school name",
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
                label: "Time",
                type: "text",
                placeholder: "e.g., 08/2021 - now",
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
                placeholder: "e.g., 02/2020 - now",
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
};

export default function SectionModal({
    sectionId,
    sectionTitle,
    initialData = {},
    onClose,
    onSave,
}) {
    const config = sectionConfigs[sectionId];
    const getValidationSchema = () => {
        const baseSchema = {};
        config.fields.forEach((field) => {
            let fieldSchema = yup.string().nullable();
            switch (field.key) {
                case "email":
                    fieldSchema = fieldSchema.email("Invalid email format");
                    break;
                case "phone":
                    fieldSchema = fieldSchema
                        .matches(
                            /^\d{10,11}$/,
                            "Phone must contain only numbers and be 10-11 digits"
                        )
                        .required("Phone is required");
                    break;
                case "personalLink":
                case "avatar":
                    fieldSchema = fieldSchema.url("Invalid URL");
                    break;
                case "dateOfBirth":
                    fieldSchema = yup
                        .date()
                        .typeError("Invalid date format")
                        .min(new Date(1900, 0, 1), "Date must be after 1900")
                        .max(new Date(), "Date cannot be in the future")
                        .nullable();
                    break;
                case "date":
                    fieldSchema = fieldSchema
                        .matches(
                            /^(0[1-9]|1[0-2])\/\d{4}$|^[a-zA-Z]+ \d{4}$|^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$|^(0[1-9]|1[0-2])\/\d{4} - now$/,
                            "Invalid date format (e.g., MM/YYYY or Month YYYY or MM/YYYY - now)"
                        )
                        .max(500, "Maximum 500 characters");
                    break;
                case "level":
                    if (sectionId === "language" || sectionId === "skills") {
                        fieldSchema = yup
                            .string()
                            .oneOf(
                                sectionId === "language"
                                    ? [
                                          "beginner",
                                          "intermediate",
                                          "advanced",
                                          "native",
                                      ]
                                    : [
                                          "beginner",
                                          "intermediate",
                                          "advanced",
                                          "expert",
                                      ],
                                "Invalid level"
                            );
                    }
                    break;
                default:
                    fieldSchema = fieldSchema.max(
                        500,
                        "Maximum 500 characters"
                    );
                    break;
            }
            baseSchema[field.key] = fieldSchema;
        });
        return yup.object().shape(baseSchema);
    };

    const methods = useForm({
        resolver: yupResolver(getValidationSchema()),
        defaultValues: initialData,
        mode: "onBlur",
    });

    const {
        register,
        handleSubmit,
        formState: { isDirty, errors },
        reset,
        watch,
    } = methods;

    const formValues = watch();
    const hasChanges = () => {
        return (
            isDirty ||
            JSON.stringify(formValues) !== JSON.stringify(initialData)
        );
    };

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        onSave(data);
        onClose();
    };

    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

    if (!config) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between pb-3 mb-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {Object.keys(initialData).length > 0 ? "Edit" : "Add"}{" "}
                        {sectionTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto space-y-4">
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {config.fields.map((field) => (
                                <div
                                    key={field.key}
                                    className="flex flex-col gap-1 p-2"
                                >
                                    <label className="text-sm font-medium text-gray-700 capitalize">
                                        {field.label}
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            {...register(field.key)}
                                            placeholder={field.placeholder}
                                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors[field.key]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                    ) : field.type === "select" ? (
                                        <select
                                            {...register(field.key)}
                                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors[field.key]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            <option value="" disabled>
                                                Select {field.label}
                                            </option>
                                            {field.options?.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type || "text"}
                                            {...register(field.key)}
                                            placeholder={field.placeholder}
                                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors[field.key]
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                        />
                                    )}
                                    {errors[field.key] && (
                                        <p className="text-xs text-red-500">
                                            {errors[field.key].message}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </form>
                    </FormProvider>
                </div>
                <div className="flex justify-end gap-3 pt-3 mt-5 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        disabled={!hasChanges()}
                        className="px-3 py-1.5 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                    >
                        <Save className="inline w-4 h-4 mr-1" />
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}