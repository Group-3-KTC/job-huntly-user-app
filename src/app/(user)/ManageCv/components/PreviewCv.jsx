"use client";

import {
    useGetPreviewQuery,
    useDownloadTemplateMutation,
} from "@/services/cvTemplateService";
import { useSelector } from "react-redux";

export default function PreviewCv({ templateId }) {
    const { html } = useSelector((state) => state.cvTemplate);
    const { data, isFetching } = useGetPreviewQuery(templateId, {
        skip: !templateId,
        refetchOnMountOrArgChange: true,
    });

    const [downloadTemplate] = useDownloadTemplateMutation();

    const handleDownload = async () => {
        if (!templateId) return;
        try {
            const blob = await downloadTemplate(templateId).unwrap();

            console.log("Blob:", blob);

            const file =
                blob instanceof Blob
                    ? blob
                    : new Blob([blob], { type: "application/pdf" });

            const url = window.URL.createObjectURL(file);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `cv-${templateId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed:", err);
        }
    };


    if (!templateId) return <p>Chọn 1 CV để xem preview</p>;

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">CV Preview</h2>
                <button
                    onClick={handleDownload}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Download
                </button>
            </div>

            {isFetching ? (
                <p>Loading preview...</p>
            ) : (
                <iframe
                    srcDoc={data}
                    className="w-full h-[600px] border rounded"
                    title="CV Preview"
                />
            )}
        </div>
    );
}
