"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Briefcase, FileText, Gift } from "lucide-react";
import { useAppDispatch } from "../../../store/hooks.js";
import { addToast } from "../../../store/slices/toastSlices.js";
import JobReviewPage from "./reviewpage.jsx";

// Import custom components
import StepIndicator from "./components/StepIndicator";
import JobInformationForm from "./components/JobInformationForm";
import JobDescriptionForm from "./components/JobDescriptionForm";
import BenefitsForm from "./components/BenefitsForm";
import RecentJobsList from "./components/RecentJobsList";

export default function JobPostingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showReview, setShowReview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [errors, setErrors] = useState({
        jobTitle: "",
        workType: "",
        city: "",
        address: "",
        category: "",
    });

    const [jobLevels, setJobLevels] = useState([]);
    const [isLoadingLevels, setIsLoadingLevels] = useState(true);
    const [lastSyncTime, setLastSyncTime] = useState(null);

    const [availableSkills, setAvailableSkills] = useState([
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "Java",
        "TypeScript",
        "HTML/CSS",
        "Vue.js",
        "Angular",
        "PHP",
        "C++",
        "C#",
        "Ruby",
        "Go",
        "Swift",
        "Kotlin",
        "Flutter",
        "React Native",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "GCP",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "GraphQL",
        "REST API",
        "Git",
        "Agile",
        "Scrum",
        "UI/UX Design",
        "Figma",
        "Adobe Creative Suite",
        "Graphic Design",
        "Communication",
        "Illustrator",
        "Photoshop",
    ]);

    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        jobTitle: "",
        category: "",
        city: [],
        address: "",
        workType: [],
        salaryRange: [5000, 22000],
        level: [],
        skill: ["Graphic Design", "Communication", "Illustrator"],
        benefits: [
            {
                id: "1",
                title: "Full Healthcare",
                description:
                    "We believe in thriving communities and that starts with our team being happy and healthy.",
                icon: "heart",
            },
            {
                id: "2",
                title: "Unlimited Vacation",
                description:
                    "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
                icon: "plane",
            },
            {
                id: "3",
                title: "Skill Development",
                description:
                    "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
                icon: "graduation",
            },
        ],
        jobDescription: "",
        niceToHaves: "",
        requirments: "",
        datePost: new Date().toISOString().split("T")[0],
        expiredDate: "",
    });

    const steps = [
        { number: 1, title: "Job Information", icon: Briefcase },
        { number: 2, title: "Job Description", icon: FileText },
        { number: 3, title: "Perks & Benefit", icon: Gift },
    ];

    const [workTypes, setWorkTypes] = useState([
        "Full-Time",
        "Part-Time",
        "Remote",
        "Internship",
        "Contract",
    ]);
    const [isLoadingWorkTypes, setIsLoadingWorkTypes] = useState(true);

    const jobCategories = [
        "Technology",
        "Marketing",
        "Finance",
        "Healthcare",
        "Education",
        "Design",
        "Sales",
        "Human Resources",
        "Customer Service",
        "Operations",
    ];

    // Auto-sync job levels every 30 seconds
    useEffect(() => {
        fetchJobsAndSyncData();

        const interval = setInterval(() => {
            fetchJobsAndSyncData(true); // Silent sync
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, []);

    const extractJobLevelsAndWorkTypesFromData = (jobsData) => {
        const levelHierarchy = [
            "Entry Level",
            "Junior Level",
            "Mid Level",
            "Senior Level",
            "Lead Level",
            "Manager Level",
            "Director Level",
        ];

        const defaultWorkTypes = [
            "Full-Time",
            "Part-Time",
            "Remote",
            "Internship",
            "Contract",
        ];

        // Extract all unique levels from jobs data
        const allLevels = jobsData.reduce((levels, job) => {
            if (job.level) {
                if (Array.isArray(job.level)) {
                    job.level.forEach((level) => {
                        if (
                            level &&
                            typeof level === "string" &&
                            level.trim() &&
                            !levels.includes(level.trim())
                        ) {
                            levels.push(level.trim());
                        }
                    });
                } else if (typeof job.level === "string" && job.level.trim()) {
                    if (!levels.includes(job.level.trim())) {
                        levels.push(job.level.trim());
                    }
                }
            }
            return levels;
        }, []);

        // Extract all unique work types from jobs data
        const allWorkTypes = jobsData.reduce((workTypes, job) => {
            if (job.workType) {
                if (Array.isArray(job.workType)) {
                    job.workType.forEach((type) => {
                        if (
                            type &&
                            typeof type === "string" &&
                            type.trim() &&
                            !workTypes.includes(type.trim())
                        ) {
                            workTypes.push(type.trim());
                        }
                    });
                } else if (
                    typeof job.workType === "string" &&
                    job.workType.trim()
                ) {
                    if (!workTypes.includes(job.workType.trim())) {
                        workTypes.push(job.workType.trim());
                    }
                }
            }
            return workTypes;
        }, []);

        // Sort levels according to hierarchy, then alphabetically for unknown levels
        const sortedLevels = allLevels.sort((a, b) => {
            const indexA = levelHierarchy.indexOf(a);
            const indexB = levelHierarchy.indexOf(b);

            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
            }
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });

        // Sort work types with default types first, then alphabetically
        const sortedWorkTypes = allWorkTypes.sort((a, b) => {
            const indexA = defaultWorkTypes.indexOf(a);
            const indexB = defaultWorkTypes.indexOf(b);

            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
            }
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });

        return {
            levels: sortedLevels.length > 0 ? sortedLevels : levelHierarchy,
            workTypes:
                sortedWorkTypes.length > 0 ? sortedWorkTypes : defaultWorkTypes,
        };
    };

    const fetchJobsAndSyncData = async (silent = false) => {
        try {
            if (!silent) {
                setIsLoadingLevels(true);
                setIsLoadingWorkTypes(true);
            }

            const response = await fetch(
                "https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/jobs"
            );

            if (response.ok) {
                const data = await response.json();
                setJobs(data);

                // Extract and sync job levels and work types
                const { levels, workTypes: extractedWorkTypes } =
                    extractJobLevelsAndWorkTypesFromData(data);
                setJobLevels(levels);
                setWorkTypes(extractedWorkTypes);
                setLastSyncTime(new Date());

                if (!silent) {
                }
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching jobs and syncing data:", error);

            // Fallback to default values if API fails
            const defaultLevels = [
                "Entry Level",
                "Junior Level",
                "Mid Level",
                "Senior Level",
                "Lead Level",
                "Manager Level",
                "Director Level",
            ];
            const defaultWorkTypes = [
                "Full-Time",
                "Part-Time",
                "Remote",
                "Internship",
                "Contract",
            ];

            setJobLevels(defaultLevels);
            setWorkTypes(defaultWorkTypes);

            if (!silent) {
            }
        } finally {
            if (!silent) {
                setIsLoadingLevels(false);
                setIsLoadingWorkTypes(false);
            }
        }
    };

    const validateStep1 = () => {
        let isValid = true;
        const newErrors = {
            jobTitle: "",
            workType: "",
            city: "",
            address: "",
            category: "",
        };

        if (!formData.jobTitle.trim()) {
            newErrors.jobTitle = "Job title is required";
            isValid = false;
        }

        if (!formData.category.trim()) {
            newErrors.category = "Job category is required";
            isValid = false;
        }

        if (formData.city.length === 0) {
            newErrors.city = "City selection is required";
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
            isValid = false;
        }

        if (formData.workType.length === 0) {
            newErrors.workType = "Please select at least one employment type";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleWorkTypeChange = (type, checked) => {
        setFormData((prev) => ({
            ...prev,
            workType: checked
                ? [...prev.workType, type]
                : prev.workType.filter((t) => t !== type),
        }));
        if (checked && errors.workType) {
            setErrors((prev) => ({ ...prev, workType: "" }));
        }
    };

    const handleLevelChange = (level, checked) => {
        setFormData((prev) => ({
            ...prev,
            level: checked
                ? [...prev.level, level]
                : prev.level.filter((l) => l !== level),
        }));
    };

    const handleJobTitleChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, jobTitle: value }));
        if (value.trim() && errors.jobTitle) {
            setErrors((prev) => ({ ...prev, jobTitle: "" }));
        }
    };

    const handleCategoryChange = (value) => {
        setFormData((prev) => ({ ...prev, category: value }));
        if (value.trim() && errors.category) {
            setErrors((prev) => ({ ...prev, category: "" }));
        }
    };

    const handleCityChange = (city) => {
        const cityArray = formData.city.includes(city)
            ? formData.city.filter((c) => c !== city)
            : [...formData.city, city];
        setFormData((prev) => ({ ...prev, city: cityArray }));
        if (cityArray.length > 0 && errors.city) {
            setErrors((prev) => ({ ...prev, city: "" }));
        }
    };

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, address: value }));
        if (value.trim() && errors.address) {
            setErrors((prev) => ({ ...prev, address: "" }));
        }
    };

    const handleSkillAdd = (skill, isNew = false) => {
        if (skill && !formData.skill.includes(skill)) {
            setFormData((prev) => ({
                ...prev,
                skill: [...prev.skill, skill],
            }));
            if (isNew) {
                setAvailableSkills((prev) => [...prev, skill]);
            }
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skill: prev.skill.filter((skill) => skill !== skillToRemove),
        }));
    };

    const handleBenefitAdd = (benefit) => {
        setFormData((prev) => ({
            ...prev,
            benefits: [...prev.benefits, benefit],
        }));
        dispatch(
            addToast({
                title: "Benefit Added",
                description: "New benefit has been added successfully!",
                variant: "success",
            })
        );
    };

    const handleBenefitRemove = (benefitId) => {
        setFormData((prev) => ({
            ...prev,
            benefits: prev.benefits.filter(
                (benefit) => benefit.id !== benefitId
            ),
        }));
    };

    const handleDescriptionChange = (value) => {
        setFormData((prev) => ({ ...prev, jobDescription: value }));
    };

    const handleRequirementsChange = (value) => {
        setFormData((prev) => ({ ...prev, requirments: value }));
    };

    const handleNiceToHavesChange = (value) => {
        setFormData((prev) => ({ ...prev, niceToHaves: value }));
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (!validateStep1()) {
                return;
            }
        }
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (showReview) {
        return (
            <JobReviewPage
                formData={formData}
                onReturn={() => setShowReview(false)}
                setParentFormData={setFormData}
                setParentIsLoading={setIsLoading}
                setParentJobs={setJobs}
                parentJobs={jobs}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Step Indicator */}
                <StepIndicator steps={steps} currentStep={currentStep} />

                {/* Form Content */}
                <Card className="w-full">
                    <CardContent className="p-8">
                        {/* Step 1: Job Information */}
                        {currentStep === 1 && (
                            <JobInformationForm
                                formData={formData}
                                errors={errors}
                                jobCategories={jobCategories}
                                workTypes={workTypes}
                                isLoadingWorkTypes={isLoadingWorkTypes}
                                jobLevels={jobLevels}
                                isLoadingLevels={isLoadingLevels}
                                availableSkills={availableSkills}
                                onFormChange={setFormData}
                                onJobTitleChange={handleJobTitleChange}
                                onCategoryChange={handleCategoryChange}
                                onAddressChange={handleAddressChange}
                                onCityChange={handleCityChange}
                                onWorkTypeChange={handleWorkTypeChange}
                                onLevelChange={handleLevelChange}
                                onSkillAdd={handleSkillAdd}
                                onSkillRemove={handleSkillRemove}
                            />
                        )}

                        {/* Step 2: Job Description */}
                        {currentStep === 2 && (
                            <JobDescriptionForm
                                formData={formData}
                                onDescriptionChange={handleDescriptionChange}
                                onRequirementsChange={handleRequirementsChange}
                                onNiceToHavesChange={handleNiceToHavesChange}
                            />
                        )}

                        {/* Step 3: Perks & Benefits */}
                        {currentStep === 3 && (
                            <BenefitsForm
                                formData={formData}
                                onBenefitAdd={handleBenefitAdd}
                                onBenefitRemove={handleBenefitRemove}
                            />
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-8 border-t">
                            <div>
                                {currentStep > 1 && (
                                    <Button
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={isLoading}
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Previous Step
                                    </Button>
                                )}
                            </div>
                            <div>
                                {currentStep < 3 ? (
                                    <Button
                                        onClick={nextStep}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        Next Step
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setShowReview(true)}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        Review & Publish
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Jobs Display */}
                <RecentJobsList jobs={jobs} />
            </div>
        </div>
    );
}
