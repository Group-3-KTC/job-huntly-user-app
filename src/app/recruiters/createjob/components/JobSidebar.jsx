"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const JobSidebar = ({ formData, reviewData, formatDate }) => {
  const safeWorkType = Array.isArray(formData?.workType) ? formData.workType : [];
  const safeSalary = Array.isArray(formData?.salaryRange) ? formData.salaryRange : [0, 0];
  const safeSkills = Array.isArray(formData?.skill) ? formData.skill : [];

  const formatSalary = (min, max) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()} USD`;
  };

  return (
    <div className="space-y-6">
      {/* About This Role */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About this role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Category</span>
            <span className="font-medium">
              {formData.category || "Not set"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Location</span>
            <span className="font-medium">
              {formData.city}
            </span>
          </div>
          {formData.address && (
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Address</span>
              <span className="font-medium text-right text-sm">
                {formData.address}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Apply Before</span>
            <span className="font-medium">
              {reviewData.expiredDate
                ? formatDate(reviewData.expiredDate)
                : "Not set"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Job Posted On</span>
            <span className="font-medium">
              {reviewData.datePost
                ? formatDate(reviewData.datePost)
                : "Not set"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Job Type</span>
            <span className="font-medium">
              {safeWorkType.join(", ")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Salary</span>
            <span className="font-medium">
              {formatSalary(safeSalary[0], safeSalary[1])}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Required Skills */}
      {safeSkills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {safeSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobSidebar; 