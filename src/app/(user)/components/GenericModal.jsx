"use client";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X, Save } from "lucide-react";

export default function GenericModal({
    sectionId,
    sectionTitle,
    config,
    validationSchema,
    initialData = {},
    onClose,
    onSave,
}) {
    const methods = useForm({
        resolver: yupResolver(validationSchema),
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
