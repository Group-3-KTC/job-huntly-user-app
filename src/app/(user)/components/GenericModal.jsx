"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import DatePicker from "./DatePicker";
import { format, parse, isValid } from "date-fns";

export default function GenericModal({
    sectionId,
    sectionTitle,
    config,
    validationSchema,
    initialData = {},
    onClose,
    onSave,
}) {
    const [hasChanges, setHasChanges] = useState(false);
    const [isOngoing, setIsOngoing] = useState(false);

    // Transform initial data for date fields
    const transformInitialData = () => {
        const transformed = { ...initialData };
        config.fields.forEach((field) => {
            if (field.type === "date" && transformed[field.key]) {
                // Try parsing with "yyyy-MM-dd" (API format)
                let parsed = parse(transformed[field.key], "yyyy-MM-dd", new Date());
                if (!isValid(parsed)) {
                    // Fallback to "dd/MM/yyyy"
                    parsed = parse(transformed[field.key], "dd/MM/yyyy", new Date());
                }
                transformed[field.key] = isValid(parsed) ? parsed : null;
            }
        });
        // Handle duration split into startDate and endDate
        if (
            transformed.duration &&
            !transformed.startDate &&
            !transformed.endDate
        ) {
            const [start, end] = transformed.duration.split(" - ");
            const startParsed = parse(start, "yyyy", new Date());
            transformed.startDate = isValid(startParsed) ? startParsed : null;
            if (end && end !== "now") {
                const endParsed = parse(end, "yyyy", new Date());
                transformed.endDate = isValid(endParsed) ? endParsed : null;
            } else if (end === "now") {
                transformed.endDate = null;
            }
        }
        return transformed;
    };

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: transformInitialData(),
        mode: "onBlur",
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = methods;

    const watchedValues = watch();

    // Set isOngoing based on initial data
    useEffect(() => {
        if (initialData.duration && initialData.duration.endsWith(" - now")) {
            setIsOngoing(true);
            setValue("endDate", null);
        } else {
            setIsOngoing(false);
        }
    }, [initialData, setValue]);

    // Detect changes
    useEffect(() => {
        const hasFormChanges = Object.keys(watchedValues).some((key) => {
            const currentValue = watchedValues[key];
            const initialValue = initialData[key];

            // Check if the field is a date field
            const field = config.fields.find((f) => f.key === key);
            if (field?.type === "date" && currentValue) {
                const formattedCurrent = currentValue
                    ? format(currentValue, "dd/MM/yyyy")
                    : "";
                const formattedInitial = initialValue || "";
                return formattedCurrent !== formattedInitial;
            }

            const normalizedCurrent =
                currentValue == null || currentValue === ""
                    ? ""
                    : String(currentValue);
            const normalizedInitial =
                initialValue == null || initialValue === ""
                    ? ""
                    : String(initialValue);

            return normalizedCurrent !== normalizedInitial;
        });

        setHasChanges(hasFormChanges);
    }, [watchedValues, initialData, config.fields]);

    const onSubmit = (data) => {
        const processedData = { ...data };

        // Convert date fields to YYYY-MM-DD for backend
        config.fields.forEach((field) => {
            if (
                field.type === "file" &&
                data[field.key] &&
                data[field.key][0]
            ) {
                processedData[`${field.key}File`] = data[field.key][0];
                delete processedData[field.key];
            } else if (field.type === "date" && data[field.key]) {
                processedData[field.key] = format(
                    data[field.key],
                    "yyyy-MM-dd"
                );
            }
        });

        // Combine startDate and endDate into duration string
        if (data.startDate) {
            processedData.duration = format(data.startDate, "yyyy");
            if (data.endDate && !isOngoing) {
                processedData.duration += ` - ${format(data.endDate, "yyyy")}`;
            } else if (isOngoing) {
                processedData.duration += " - now";
            }
            delete processedData.startDate;
            delete processedData.endDate;
        }

        onSave(processedData);
        onClose();
    };

    if (!config) return null;

    const isDurationSection = sectionId === "education" || sectionId === "workExperience";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
                {/* Header */}
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

                {/* Form */}
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 max-h-[60vh] overflow-y-auto"
                    >
                        {config.fields.map((field) => (
                            <div
                                key={field.key}
                                className="flex flex-col gap-1"
                            >
                                <label className="text-sm font-medium text-gray-700 capitalize">
                                    {isDurationSection && field.key === "startDate" ? "From" :
                                     isDurationSection && field.key === "endDate" ? "To" : field.label}
                                    {field.required && (
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    )}
                                </label>

                                {field.type === "textarea" ? (
                                    <textarea
                                        {...register(field.key)}
                                        placeholder={field.placeholder}
                                        rows={4}
                                        className={`w-full p-2 border rounded-md resize-none ${
                                            errors[field.key]
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:border-blue-500"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    />
                                ) : field.type === "select" ? (
                                    <select
                                        {...register(field.key)}
                                        className={`w-full p-2 border rounded-md ${
                                            errors[field.key]
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:border-blue-500"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    >
                                        <option value="">
                                            Select {field.label}
                                        </option>
                                        {field.options?.map((option) => (
                                            <option
                                                key={option.value || option}
                                                value={option.value || option}
                                            >
                                                {option.label || option}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === "date" ? (
                                    <div className={
                                        isDurationSection && (field.key === "startDate" || field.key === "endDate")
                                            ? "flex items-start gap-4"
                                            : ""
                                    }>
                                        <DatePicker
                                            value={
                                                watchedValues[field.key] || null
                                            }
                                            onChange={(date) =>
                                                setValue(field.key, date)
                                            }
                                            placeholder={
                                                field.placeholder ||
                                                "DD/MM/YYYY"
                                            }
                                            name={field.key}
                                            error={errors[field.key]?.message}
                                            disabled={field.key === "endDate" && isOngoing}
                                        />
                                        {field.key === "endDate" && (
                                            <label className="flex items-center gap-2 mt-2">
                                                <input
                                                    type="checkbox"
                                                    checked={isOngoing}
                                                    onChange={(e) => {
                                                        setIsOngoing(
                                                            e.target.checked
                                                        );
                                                        if (e.target.checked) {
                                                            setValue(
                                                                "endDate",
                                                                null
                                                            );
                                                        }
                                                    }}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    Ongoing
                                                </span>
                                            </label>
                                        )}
                                    </div>
                                ) : (
                                    <input
                                        type={field.type || "text"}
                                        {...register(field.key)}
                                        placeholder={field.placeholder}
                                        className={`w-full p-2 border rounded-md ${
                                            errors[field.key]
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:border-blue-500"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    />
                                )}

                                {errors[field.key] && field.type !== "date" && (
                                    <p className="text-xs text-red-500">
                                        {errors[field.key].message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </form>
                </FormProvider>

                {/* Footer */}
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
                        disabled={!hasChanges}
                        className={`px-3 py-1.5 text-sm text-white rounded-md flex items-center gap-2 ${
                            hasChanges
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <Save className="inline w-4 h-4 mr-1" />
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}