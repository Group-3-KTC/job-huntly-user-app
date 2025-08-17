"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import ProvinceCombobox from "./province-combobox";
import SkillSelector from "./SkillSelector";

const JobInformationForm = ({
  formData,
  errors,
  jobCategories,
  workTypes,
  isLoadingWorkTypes,
  jobLevels,
  isLoadingLevels,
  availableSkills,
  onFormChange,
  onJobTitleChange,
  onCategoryChange,
  onAddressChange,
  onCityChange,
  onWorkTypeChange,
  onLevelChange,
  onSkillAdd,
  onSkillRemove
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600">
          This information will be displayed publicly
        </p>
      </div>

      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-base font-medium">
          Job Title
        </Label>
        <p className="text-sm text-gray-600">
          Job titles must describe one position
        </p>
        <Input
          id="jobTitle"
          placeholder="e.g. Software Engineer"
          value={formData.jobTitle}
          onChange={onJobTitleChange}
          className={`mt-2 ${errors.jobTitle ? "border-red-500" : ""}`}
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
        )}
      </div>

      {/* Job Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-base font-medium">
          Job Category
        </Label>
        <p className="text-sm text-gray-600">
          Select the primary category for this job
        </p>
        <Select onValueChange={onCategoryChange} value={formData.category}>
          <SelectTrigger
            className={`w-full ${errors.category ? "border-red-500" : ""}`}
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {jobCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      {/* City and Address */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* City Selection */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Cities</Label>
          <p className="text-sm text-gray-600">
            Select job locations (multiple allowed)
          </p>
          <div>
            <ProvinceCombobox
              value={formData.city.length > 0 ? formData.city[0] : ""}
              onChange={onCityChange}
              error={errors.city}
              multiple={true}
            />
            {formData.city.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.city.map((city) => (
                  <Badge key={city} variant="secondary" className="px-3 py-1">
                    {city}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                      onClick={() => onCityChange(city)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-base font-medium">
            Address
          </Label>
          <p className="text-sm text-gray-600">
            Enter the specific address
          </p>
          <Input
            id="address"
            placeholder="e.g. 123 Main Street, District 1"
            value={formData.address}
            onChange={onAddressChange}
            className={`mt-2 ${errors.address ? "border-red-500" : ""}`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      {/* Work Type */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Type of Employment</Label>
        <p className="text-sm text-gray-600">
          You can select multiple types of employment
        </p>
        {isLoadingWorkTypes ? (
          <div className="flex items-center justify-center py-4">
            <div className="text-sm text-gray-500">
              Synchronizing work types from API...
            </div>
          </div>
        ) : (
          <div
            className={`space-y-3 ${
              errors.workType ? "border border-red-500 rounded-md p-3" : ""
            }`}
          >
            {workTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={formData.workType.includes(type)}
                  onCheckedChange={(checked) => onWorkTypeChange(type, checked)}
                />
                <Label htmlFor={type} className="text-sm font-normal">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        )}
        {errors.workType && (
          <p className="text-red-500 text-sm">{errors.workType}</p>
        )}
      </div>

      {/* Salary Slider */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Salary</Label>
        <p className="text-sm text-gray-600">
          Please specify the estimated salary range for the role. *You can leave this blank
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">$</span>
              <Input
                type="number"
                value={formData.salaryRange[0]}
                onChange={(e) =>
                  onFormChange({
                    ...formData,
                    salaryRange: [
                      Number.parseInt(e.target.value) || 0,
                      formData.salaryRange[1],
                    ],
                  })
                }
                className="w-24"
              />
            </div>
            <span className="text-sm text-gray-500">to</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">$</span>
              <Input
                type="number"
                value={formData.salaryRange[1]}
                onChange={(e) =>
                  onFormChange({
                    ...formData,
                    salaryRange: [
                      formData.salaryRange[0],
                      Number.parseInt(e.target.value) || 0,
                    ],
                  })
                }
                className="w-24"
              />
            </div>
          </div>
          <div className="px-2">
            <div className="py-6 relative">
              <Slider
                value={formData.salaryRange}
                onValueChange={(value) =>
                  onFormChange({
                    ...formData,
                    salaryRange: value,
                  })
                }
                max={100000}
                min={1000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>$1,000</span>
                <span>$50,000</span>
                <span>$100,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Levels */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Job Levels</Label>
        <p className="text-sm text-gray-600">
          Select appropriate job levels (multiple allowed)
        </p>
        {isLoadingLevels ? (
          <div className="flex items-center justify-center py-4">
            <div className="text-sm text-gray-500">
              Synchronizing job levels from API...
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {jobLevels.length > 0 ? (
              jobLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={formData.level.includes(level)}
                    onCheckedChange={(checked) => onLevelChange(level, checked)}
                  />
                  <Label htmlFor={level} className="text-sm font-normal">
                    {level}
                  </Label>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 py-4">
                No job levels found in API. Please add some jobs first.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Required Skills */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Required Skills</Label>
        <p className="text-sm text-gray-600">Add required skills for the job</p>
        <SkillSelector 
          skills={availableSkills}
          selectedSkills={formData.skill}
          onSkillAdd={onSkillAdd}
          onSkillRemove={onSkillRemove}
        />
      </div>
    </div>
  );
};

export default JobInformationForm; 