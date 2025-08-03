"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Loader2 } from "lucide-react";

const PublishingSettings = ({ 
  reviewData, 
  datePostError,
  expiredDateError,
  isLoading,
  handleDatePostChange,
  handleExpiredDateChange,
  handleSubmit,
  onReturn
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="datePost" className="text-sm font-medium">
          Post Date
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="datePost"
            type="date"
            value={reviewData.datePost}
            onChange={handleDatePostChange}
            className={`pl-10 ${datePostError ? "border-red-500" : ""}`}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        {datePostError && (
          <p className="text-red-500 text-sm mt-1">{datePostError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="expiredDate" className="text-sm font-medium">
          Expiration Date
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="expiredDate"
            type="date"
            value={reviewData.expiredDate}
            onChange={handleExpiredDateChange}
            className={`pl-10 ${expiredDateError ? "border-red-500" : ""}`}
            min={
              reviewData.datePost ||
              new Date().toISOString().split("T")[0]
            }
          />
        </div>
        {expiredDateError && (
          <p className="text-red-500 text-sm mt-1">{expiredDateError}</p>
        )}
      </div>

      <div className="h-px w-full bg-gray-200" />

      <div className="space-y-3">
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Publishing...
            </>
          ) : (
            "Post Job"
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onReturn}
          className="w-full bg-transparent"
          disabled={isLoading}
        >
          Return to Edit
        </Button>
      </div>
    </div>
  );
};

export default PublishingSettings; 