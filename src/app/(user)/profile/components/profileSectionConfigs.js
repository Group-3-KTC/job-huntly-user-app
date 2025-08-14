import * as yup from "yup";

export const profileSectionConfigs = {
    aboutMe: {
        fields: [
            {
                key: "text",
                label: "Description",
                type: "textarea",
                placeholder: "Introduce your strengths and years of experience",
            },
        ],
        validationSchema: yup.object().shape({
            text: yup.string().max(500, "Maximum 500 characters").nullable(),
        }),
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
        validationSchema: yup.object().shape({
            name: yup.string().max(500, "Maximum 500 characters").nullable(),
            title: yup.string().max(500, "Maximum 500 characters").nullable(),
            email: yup.string().email("Invalid email format").nullable(),
            dateOfBirth: yup
                .date()
                .typeError("Invalid date format")
                .min(new Date(1900, 0, 1), "Date must be after 1900")
                .max(new Date(), "Date cannot be in the future")
                .nullable(),
            address: yup.string().max(500, "Maximum 500 characters").nullable(),
            phone: yup
                .string()
                .matches(
                    /^\d{10,11}$/,
                    "Phone must contain only numbers and be 10-11 digits"
                )
                .required("Phone is required"),
            gender: yup.string().max(500, "Maximum 500 characters").nullable(),
            personalLink: yup.string().url("Invalid URL").nullable(),
            avatar: yup.string().url("Invalid URL").nullable(),
        }),
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
        validationSchema: yup.object().shape({
            name: yup.string().max(500, "Maximum 500 characters").nullable(),
            level: yup
                .string()
                .oneOf(
                    ["beginner", "intermediate", "advanced", "native"],
                    "Invalid level"
                )
                .nullable(),
        }),
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
        validationSchema: yup.object().shape({
            name: yup.string().max(500, "Maximum 500 characters").nullable(),
            level: yup
                .string()
                .oneOf(
                    ["beginner", "intermediate", "advanced", "expert"],
                    "Invalid level"
                )
                .nullable(),
        }),
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
        validationSchema: yup.object().shape({
            school: yup.string().max(500, "Maximum 500 characters").nullable(),
            degree: yup.string().max(500, "Maximum 500 characters").nullable(),
            major: yup.string().max(500, "Maximum 500 characters").nullable(),
            date: yup
                .string()
                .matches(
                    /^(0[1-9]|1[0-2])\/\d{4}$|^[a-zA-Z]+ \d{4}$|^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$|^(0[1-9]|1[0-2])\/\d{4} - now$/,
                    "Invalid date format (e.g., MM/YYYY or Month YYYY or MM/YYYY - now)"
                )
                .max(500, "Maximum 500 characters")
                .nullable(),
            note: yup.string().max(500, "Maximum 500 characters").nullable(),
        }),
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
        validationSchema: yup.object().shape({
            position: yup
                .string()
                .max(500, "Maximum 500 characters")
                .nullable(),
            company: yup.string().max(500, "Maximum 500 characters").nullable(),
            time: yup.string().max(500, "Maximum 500 characters").nullable(),
            description: yup
                .string()
                .max(500, "Maximum 500 characters")
                .nullable(),
            project: yup.string().max(500, "Maximum 500 characters").nullable(),
        }),
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
        validationSchema: yup.object().shape({
            name: yup.string().max(500, "Maximum 500 characters").nullable(),
            issuer: yup.string().max(500, "Maximum 500 characters").nullable(),
            date: yup.string().max(500, "Maximum 500 characters").nullable(),
            description: yup
                .string()
                .max(500, "Maximum 500 characters")
                .nullable(),
        }),
    },
};
