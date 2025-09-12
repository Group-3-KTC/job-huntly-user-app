"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TextEditor from "./TextEditor";

const JobDescriptionForm = ({ formData, onInputChange }) => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Job Description
                </h2>
                <p className="text-gray-600">
                    Detailed description of the job and requirements
                </p>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description *</Label>
                <TextEditor
                    value={formData.jobDescription || ""}
                    onChange={(value) => onInputChange("jobDescription", value)}
                    placeholder="Detailed description of the job, responsibilities and tasks..."
                />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
                <Label htmlFor="requirements">Requirements *</Label>
                <TextEditor
                    value={formData.requirements || ""}
                    onChange={(value) => onInputChange("requirements", value)}
                    placeholder="Requirements for experience, skills, and qualifications..."
                />
            </div>

            {/* Nice to Haves */}
            <div className="space-y-2">
                <Label htmlFor="niceToHaves">Nice to Haves (optional)</Label>
                <TextEditor
                    value={formData.niceToHaves || ""}
                    onChange={(value) => onInputChange("niceToHaves", value)}
                    placeholder="Optional requirements..."
                />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="datePost">Date Posted</Label>
                    <input
                        id="datePost"
                        type="date"
                        value={formData.datePost || ""}
                        onChange={(e) =>
                            onInputChange("datePost", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="expiredDate">Expired Date *</Label>
                    <input
                        id="expiredDate"
                        type="date"
                        value={formData.expiredDate || ""}
                        onChange={(e) =>
                            onInputChange("expiredDate", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={formData.datePost || ""}
                    />
                </div>
            </div>
        </div>
    );
};

export default JobDescriptionForm;
