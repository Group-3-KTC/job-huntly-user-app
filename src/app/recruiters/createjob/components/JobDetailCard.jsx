"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import BenefitItem from "./BenefitItem";

const JobDetailCard = ({ formData }) => {
  const safeRequirments = formData?.requirments || "";
  const safeBenefits = Array.isArray(formData?.benefits) ? formData.benefits : [];
  const safeSkills = Array.isArray(formData?.skill) ? formData.skill : [];

  const formatSalary = (min, max) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()} USD`;
  };

  return (
    <div className="space-y-6">
      {/* Job Description */}
      {formData.jobDescription && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {formData.jobDescription}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requirements */}
      {safeRequirments && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {safeRequirments
                .split("\n")
                .map((requirement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      {requirement}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nice-To-Haves */}
      {formData.niceToHaves && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Nice-To-Haves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.niceToHaves
                .split("\n")
                .map((niceToHave, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      {niceToHave}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Perks & Benefits */}
      {safeBenefits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Perks & Benefits</CardTitle>
            <p className="text-gray-600">
              This job comes with several perks and benefits
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {safeBenefits.map((benefit) => (
                <div key={benefit.id} className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {safeSkills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {safeSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
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

export default JobDetailCard; 