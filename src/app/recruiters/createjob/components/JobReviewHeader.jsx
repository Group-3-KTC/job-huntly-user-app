"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, MapPin, Clock, Users } from "lucide-react";

const JobReviewHeader = ({ formData, onReturn }) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-400 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
          {formData.jobTitle.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formData.jobTitle}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{formData.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {formData.workType.join(", ")}
              </span>
            </div>
            {formData.level && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="capitalize">
                  {formData.level} Level
                </span>
              </div>
            )}
          </div>
          {formData.address && (
            <div className="mt-2 text-sm text-gray-500">
              <span>
                {formData.address}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobReviewHeader; 