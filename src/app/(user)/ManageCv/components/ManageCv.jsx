"use client";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedTemplateId } from "@/features/templateCv/cvTemplateSlice";
import { useGetAllTemplatesQuery } from "@/services/cvTemplateService";
import PreviewCv from "./PreviewCv";
import { useEffect } from "react";

export default function ManageCv() {
    const dispatch = useDispatch();
    const { data: templates = [], isLoading } = useGetAllTemplatesQuery();
    const selectedTemplateId = useSelector(
        (state) => state.cvTemplate.selectedTemplateId
    );

    const selectedTemplate = templates.find(
        (tpl) => tpl.id === selectedTemplateId
    );

    useEffect(() => {
        if (!isLoading && templates.length > 0 && !selectedTemplateId) {
            dispatch(setSelectedTemplateId(templates[0].id));
        }
    }, [isLoading, templates, selectedTemplateId, dispatch]);

    if (isLoading) return <p>Loading templates...</p>;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="mb-4 text-lg font-bold text-gray-800">
                    Choose Your CV Template
                </h2>
                <div className="flex flex-wrap gap-4">
                    {templates.map((tpl) => {
                        const isSelected = tpl.id === selectedTemplateId;
                        return (
                            <div
                                key={tpl.id}
                                onClick={() =>
                                    dispatch(setSelectedTemplateId(tpl.id))
                                }
                                className={`cursor-pointer w-40 p-3 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md
                                    ${
                                        isSelected
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-gray-200 bg-white hover:border-blue-300"
                                    }`}
                            >
                                <div className="relative w-full h-40 p-2 overflow-hidden rounded-md">
                                    <img
                                        src={tpl.previewImageUrl}
                                        alt={tpl.name}
                                        className="object-contain w-full h-full"
                                    />
                                    <div className="absolute inset-0 transition-all hover:bg-black/20" />
                                </div>

                                <p
                                    className={`mt-2 text-sm font-medium text-center truncate ${
                                        isSelected
                                            ? "text-blue-700"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {tpl.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedTemplate && (
                <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
                    <PreviewCv
                        templateId={selectedTemplate.id}
                        templateName={selectedTemplate.name}
                    />
                </div>
            )}
        </div>
    );
}
