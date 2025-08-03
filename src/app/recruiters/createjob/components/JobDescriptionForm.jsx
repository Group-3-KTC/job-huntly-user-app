"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import TextEditor from "./TextEditor";

const JobDescriptionForm = ({
  formData,
  onDescriptionChange,
  onRequirementsChange,
  onNiceToHavesChange,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Details</h2>
        <p className="text-gray-600">
          Add the description of the job, responsibilities, who you are, and
          nice-to-haves.
        </p>
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Job Description</Label>
        <p className="text-sm text-gray-600">
          Describe the job position and what it entails
        </p>
        <TextEditor
          placeholder="Enter job description"
          value={formData.jobDescription}
          onChange={onDescriptionChange}
          maxLength={5000}
          minHeight="200px"
        />
      </div>

      {/* Requirements */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Requirements</Label>
        <p className="text-sm text-gray-600">
          List the main requirements for this position (one per line)
        </p>
        <TextEditor
          placeholder="Enter job requirements (one per line)"
          value={formData.requirments}
          onChange={onRequirementsChange}
          maxLength={2000}
          minHeight="150px"
        />
      </div>

      {/* Nice-To-Haves */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Nice-To-Haves</Label>
        <p className="text-sm text-gray-600">
          Add nice-to-have skills and qualifications for the role to encourage a
          more diverse set of candidates to apply
        </p>
        <TextEditor
          placeholder="Enter nice-to-haves"
          value={formData.niceToHaves}
          onChange={onNiceToHavesChange}
          maxLength={1500}
          minHeight="120px"
        />
      </div>
    </div>
  );
};

export default JobDescriptionForm; 