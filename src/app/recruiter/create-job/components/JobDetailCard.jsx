"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import BenefitItem from "./BenefitItem";

const JobDetailCard = ({
    description,
    requirements,
    benefits,
    skills,
    levels,
}) => {
    const safeRequirements = requirements || "";
    const safeBenefits = Array.isArray(benefits) ? benefits : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeLevels = Array.isArray(levels) ? levels : [];

    return (
        <div className="space-y-6">
            {/* Job Description */}
            {description && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Job Description
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {description}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Requirements */}
            {safeRequirements && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {safeRequirements}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Skills */}
            {safeSkills.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Skills
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {safeSkills.map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-sm"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Levels */}
            {safeLevels.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {safeLevels.map((level, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-sm"
                                >
                                    {level}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Benefits */}
            {safeBenefits.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Benefits & Perks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {safeBenefits.map((benefit, index) => (
                                <BenefitItem
                                    key={benefit.id || index}
                                    benefit={benefit}
                                    onRemove={() => {}}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default JobDetailCard;
