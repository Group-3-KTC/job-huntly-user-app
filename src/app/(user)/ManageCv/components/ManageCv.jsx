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

    useEffect(() => {
        if (!isLoading && templates.length > 0 && !selectedTemplateId) {
            dispatch(setSelectedTemplateId(templates[0].id)); 
        }
    }, [isLoading, templates, selectedTemplateId, dispatch]);

    if (isLoading) return <p>Loading templates...</p>;

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 p-4 bg-white rounded-lg shadow">
                <PreviewCv templateId={selectedTemplateId} />
            </div>

            <div className="col-span-4">
                <h2 className="mb-4 text-lg font-bold">Mẫu CV</h2>
                <div className="space-y-4">
                    {templates.map((tpl) => (
                        <div
                            key={tpl.id}
                            onClick={() =>
                                dispatch(setSelectedTemplateId(tpl.id))
                            }
                            className={`cursor-pointer border rounded-lg p-2 hover:shadow-md ${
                                tpl.id === selectedTemplateId
                                    ? "border-blue-500"
                                    : "border-gray-200"
                            }`}
                        >
                            <img
                                src={tpl.previewImageUrl}
                                alt={tpl.name}
                                className="object-cover w-full h-40 rounded"
                            />
                            <p className="mt-2 font-medium text-center">
                                {tpl.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
