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
import { X, Loader2 } from "lucide-react";
import ProvinceCombobox from "./province-combobox";
import SkillSelector from "./SkillSelector";

const JobInformationForm = ({
    formData,
    onInputChange,
    errors,
    jobLevels = [],
    cities = [],
    wards = [],
    categories = [],
    skills = [],
    workTypes = [],
    isLoadingLevels = false,
    isLoadingCities = false,
    isLoadingCategories = false,
    isLoadingWorkTypes = false,
    isLoadingSkills = false,
}) => {
    const handleSalaryTypeChange = (type) => {
        onInputChange("salaryType", type);
    };

    const handleWorkTypeChange = (workType, checked) => {
        const currentWorkTypes = formData.workType || [];
        if (checked) {
            onInputChange("workType", [...currentWorkTypes, workType]);
        } else {
            onInputChange(
                "workType",
                currentWorkTypes.filter((wt) => wt !== workType)
            );
        }
    };

    const handleLevelChange = (level, checked) => {
        const currentLevels = formData.level || [];
        if (checked) {
            onInputChange("level", [...currentLevels, level]);
        } else {
            onInputChange(
                "level",
                currentLevels.filter((l) => l !== level)
            );
        }
    };

    const handleSkillAdd = (skill) => {
        const currentSkills = formData.skill || [];
        if (!currentSkills.includes(skill)) {
            onInputChange("skill", [...currentSkills, skill]);
        }
    };

    const handleSkillRemove = (skill) => {
        const currentSkills = formData.skill || [];
        onInputChange(
            "skill",
            currentSkills.filter((s) => s !== skill)
        );
    };

    const handleWardChange = (wardId, checked) => {
        const currentWardIds = formData.wardIds || [];
        if (checked) {
            onInputChange("wardIds", [...currentWardIds, wardId]);
        } else {
            onInputChange(
                "wardIds",
                currentWardIds.filter((id) => id !== wardId)
            );
        }
    };

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
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                    id="jobTitle"
                    value={formData.jobTitle || ""}
                    onChange={(e) => onInputChange("jobTitle", e.target.value)}
                    placeholder="Example: Senior Frontend Developer"
                    className={errors.jobTitle ? "border-red-500" : ""}
                />
                {errors.jobTitle && (
                    <p className="text-red-500 text-sm">{errors.jobTitle}</p>
                )}
            </div>

            {/* Category */}
            <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                    value={formData.category || ""}
                    onValueChange={(value) => onInputChange("category", value)}
                >
                    <SelectTrigger
                        className={errors.category ? "border-red-500" : ""}
                    >
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {isLoadingCategories ? (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Loading...
                            </div>
                        ) : (
                            categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.name}
                                >
                                    {category.name}
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
                {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category}</p>
                )}
            </div>

            {/* City */}
            <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Select
                    value={formData.city || ""}
                    onValueChange={(value) => onInputChange("city", value)}
                >
                    <SelectTrigger
                        className={errors.city ? "border-red-500" : ""}
                    >
                        <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                        {isLoadingCities ? (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Loading...
                            </div>
                        ) : (
                            cities.map((city, index) => (
                                <SelectItem key={index} value={city.city_name}>
                                    {city.city_name}
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
                {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                )}
            </div>

            {/* Wards */}
            {formData.city && (
                <div className="space-y-2">
                    <Label>District/Ward *</Label>
                    {wards.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                            {wards.map((ward) => (
                                <div
                                    key={ward.id}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`ward-${ward.id}`}
                                        checked={
                                            formData.wardIds?.includes(
                                                ward.id
                                            ) || false
                                        }
                                        onCheckedChange={(checked) =>
                                            handleWardChange(ward.id, checked)
                                        }
                                    />
                                    <Label
                                        htmlFor={`ward-${ward.id}`}
                                        className="text-sm"
                                    >
                                        {ward.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500 p-4 border border-gray-200 rounded-md">
                            No district/ward found in city: {formData.city}
                        </div>
                    )}
                </div>
            )}

            {/* Address */}
            <div className="space-y-2">
                <Label htmlFor="address">Detailed address *</Label>
                <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => onInputChange("address", e.target.value)}
                    placeholder="Example: 123 ABC Street, District 1"
                    className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                )}
            </div>

            {/* Work Type */}
            <div className="space-y-2">
                <Label>Job Type *</Label>
                <div className="grid grid-cols-2 gap-2">
                    {isLoadingWorkTypes ? (
                        <div className="flex items-center justify-center p-4 col-span-2">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Loading...
                        </div>
                    ) : (
                        workTypes.map((workType) => (
                            <div
                                key={workType.name}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`workType-${workType.name}`}
                                    checked={
                                        formData.workType?.includes(
                                            workType.name
                                        ) || false
                                    }
                                    onCheckedChange={(checked) =>
                                        handleWorkTypeChange(
                                            workType.name,
                                            checked
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`workType-${workType.name}`}
                                    className="text-sm"
                                >
                                    {workType.name}
                                </Label>
                            </div>
                        ))
                    )}
                </div>
                {errors.workType && (
                    <p className="text-red-500 text-sm">{errors.workType}</p>
                )}
            </div>

            {/* Salary */}
            <div className="space-y-4">
                <Label>Salary</Label>
                <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="salary-range"
                                checked={formData.salaryType === 0}
                                onCheckedChange={() =>
                                    handleSalaryTypeChange(0)
                                }
                            />
                            <Label htmlFor="salary-range">Salary Range</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="salary-negotiate"
                                checked={formData.salaryType === 1}
                                onCheckedChange={() =>
                                    handleSalaryTypeChange(1)
                                }
                            />
                            <Label htmlFor="salary-negotiate">Negotiable</Label>
                        </div>
                    </div>

                    {formData.salaryType === 0 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="salaryMin">
                                        Minimum Salary (VND)
                                    </Label>
                                    <Input
                                        id="salaryMin"
                                        type="number"
                                        value={formData.salaryMin || ""}
                                        onChange={(e) =>
                                            onInputChange(
                                                "salaryMin",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        placeholder="Example: 10000000"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="salaryMax">
                                        Maximum Salary (VND)
                                    </Label>
                                    <Input
                                        id="salaryMax"
                                        type="number"
                                        value={formData.salaryMax || ""}
                                        onChange={(e) =>
                                            onInputChange(
                                                "salaryMax",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        placeholder="Example: 20000000"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Level */}
            <div className="space-y-2">
                <Label>Level *</Label>
                <div className="grid grid-cols-2 gap-2">
                    {isLoadingLevels ? (
                        <div className="flex items-center justify-center p-4 col-span-2">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Loading...
                        </div>
                    ) : (
                        jobLevels.map((level) => (
                            <div
                                key={level.id}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`level-${level.id}`}
                                    checked={
                                        formData.level?.includes(level.name) ||
                                        false
                                    }
                                    onCheckedChange={(checked) =>
                                        handleLevelChange(level.name, checked)
                                    }
                                />
                                <Label
                                    htmlFor={`level-${level.id}`}
                                    className="text-sm"
                                >
                                    {level.name}
                                </Label>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
                <Label>Skills</Label>
                {formData.category ? (
                    <SkillSelector
                        availableSkills={skills}
                        selectedSkills={formData.skill || []}
                        onSkillAdd={handleSkillAdd}
                        onSkillRemove={handleSkillRemove}
                        isLoading={isLoadingSkills}
                    />
                ) : (
                    <div className="text-sm text-gray-500 p-4 border border-gray-200 rounded-md">
                        Please select a category before viewing the skill list
                    </div>
                )}
            </div>

            {/* Selected Skills Display */}
            {formData.skill && formData.skill.length > 0 && (
                <div className="space-y-2">
                    <Label>Selected Skills</Label>
                    <div className="flex flex-wrap gap-2">
                        {formData.skill.map((skill) => (
                            <Badge
                                key={skill}
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                {skill}
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => handleSkillRemove(skill)}
                                />
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobInformationForm;