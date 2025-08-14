"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "../../../store/hooks.js";
import { addToast } from "../../../store/slices/toastSlices.js";
import { ArrowLeft } from "lucide-react";

// Import custom components
import JobReviewHeader from "./components/JobReviewHeader";
import JobDetailCard from "./components/JobDetailCard";
import JobSidebar from "./components/JobSidebar";
import PublishingSettings from "./components/PublishingSettings";
import SuccessDialog from "./components/SuccessDialog";

const API_BASE_URL = "https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/jobs";

export default function JobReviewPage({
    formData,
    onReturn,
    setParentFormData,
    setParentIsLoading,
    setParentJobs,
    parentJobs,
}) {
    const [reviewData, setReviewData] = useState({
        datePost: formData.datePost || "",
        expiredDate: formData.expiredDate || "",
    });
    const [datePostError, setDatePostError] = useState("");
    const [expiredDateError, setExpiredDateError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const dispatch = useAppDispatch();

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getCombinedDescription = () => {
        return [formData.jobDescription, formData.niceToHaves]
            .filter(Boolean)
            .join("\n\n");
    };

    const getRequirmentsArray = () => {
        if (!formData.requirments || !formData.requirments.trim()) {
            return [];
        }
        return formData.requirments
            .split("\n")
            .map((req) => req.trim())
            .filter(Boolean);
    };

    const getBenefitsArray = () => {
        return formData.benefits.map(
            (benefit) => `${benefit.title}:${benefit.description}`
        );
    };

    const submitJob = async () => {
        setIsLoading(true);
        setParentIsLoading(true);
        let datePostISO = null;
        let expiredDateISO = null;

        try {
            if (reviewData.datePost && reviewData.datePost.trim()) {
                const postDate = new Date(reviewData.datePost);
                if (!isNaN(postDate.getTime())) {
                    datePostISO = postDate.toISOString();
                }
            }

            if (reviewData.expiredDate && reviewData.expiredDate.trim()) {
                const expiredDate = new Date(reviewData.expiredDate);
                if (!isNaN(expiredDate.getTime())) {
                    expiredDateISO = expiredDate.toISOString();
                }
            }
        } catch (error) {
            console.error("Date validation error:", error);
            dispatch(
                addToast({
                    title: "Invalid Dates",
                    description: "Please check your date selections.",
                    variant: "destructive",
                })
            );
            setIsLoading(false);
            setParentIsLoading(false);
            return;
        }

        if (!datePostISO || !expiredDateISO) {
            dispatch(
                addToast({
                    title: "Missing Dates",
                    description:
                        "Please select both post date and expiration date.",
                    variant: "destructive",
                })
            );
            setIsLoading(false);
            setParentIsLoading(false);
            return;
        }

        const jobData = {
            title: formData.jobTitle,
            category: formData.category,
            description: getCombinedDescription(),
            requirments: getRequirmentsArray(),
            city: formData.city,
            location: formData.address,
            workType: formData.workType,
            salaryMin: formData.salaryRange[0].toString(),
            salaryMax: formData.salaryRange[1].toString(),
            level: formData.level,
            skill: formData.skill,
            benefits: getBenefitsArray(),
            datePost: datePostISO,
            expiredDate: expiredDateISO,
        };

        try {
            const response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobData),
            });

            if (response.ok) {
                const newJob = await response.json();
                setParentJobs((prev) => [...prev, newJob]);
                dispatch(
                    addToast({
                        title: "Success!",
                        description: "Job posted successfully!",
                        variant: "success",
                    })
                );
                setShowSuccessDialog(true);
                console.log("Job posted successfully:", newJob);
            } else {
                throw new Error("Failed to post job");
            }
        } catch (error) {
            console.error("Error posting job:", error);
            dispatch(
                addToast({
                    title: "Error",
                    description: "Failed to post job. Please try again.",
                    variant: "destructive",
                })
            );
        } finally {
            setIsLoading(false);
            setParentIsLoading(false);
        }
    };

    const handleSubmit = () => {
        let isValid = true;
        let newDatePostError = "";
        let newExpiredDateError = "";

        if (!reviewData.datePost) {
            newDatePostError = "Post Date is required.";
            isValid = false;
        }

        if (!reviewData.expiredDate) {
            newExpiredDateError = "Expiration Date is required.";
            isValid = false;
        }

        if (reviewData.datePost && reviewData.expiredDate) {
            const postDate = new Date(reviewData.datePost);
            const expiredDate = new Date(reviewData.expiredDate);

            if (expiredDate <= postDate) {
                newExpiredDateError =
                    "Expiration date must be after the post date.";
                isValid = false;
            }
        }

        setDatePostError(newDatePostError);
        setExpiredDateError(newExpiredDateError);

        if (!isValid) {
            return;
        }

        setParentFormData((prev) => ({
            ...prev,
            datePost: reviewData.datePost,
            expiredDate: reviewData.expiredDate,
        }));

        submitJob();
    };

    const handleDatePostChange = (e) => {
        setReviewData((prev) => ({ ...prev, datePost: e.target.value }));
        if (datePostError) setDatePostError("");
        if (
            expiredDateError &&
            e.target.value &&
            new Date(reviewData.expiredDate) <= new Date(e.target.value)
        ) {
            setExpiredDateError("");
        }
    };

    const handleExpiredDateChange = (e) => {
        setReviewData((prev) => ({ ...prev, expiredDate: e.target.value }));
        if (expiredDateError) setExpiredDateError("");
        if (
            datePostError &&
            e.target.value &&
            new Date(e.target.value) <= new Date(reviewData.datePost)
        ) {
            setDatePostError("");
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Button
                            variant="ghost"
                            onClick={onReturn}
                            className="p-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Review Job Posting
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Review your job posting details before publishing
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Header */}
                        <Card>
                            <div className="p-8">
                                <JobReviewHeader formData={formData} onReturn={onReturn} />
                            </div>
                        </Card>

                        {/* Job Details */}
                        <JobDetailCard formData={formData} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Job Info and Skills */}
                        <JobSidebar 
                            formData={formData} 
                            reviewData={reviewData} 
                            formatDate={formatDate} 
                        />

                        {/* Publishing Settings */}
                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Publishing Settings</h3>
                                <PublishingSettings
                                    reviewData={reviewData}
                                    datePostError={datePostError}
                                    expiredDateError={expiredDateError}
                                    isLoading={isLoading}
                                    handleDatePostChange={handleDatePostChange}
                                    handleExpiredDateChange={handleExpiredDateChange}
                                    handleSubmit={handleSubmit}
                                    onReturn={onReturn}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Success Dialog */}
            <SuccessDialog 
                open={showSuccessDialog} 
                onOpenChange={setShowSuccessDialog} 
            />
        </div>
    );
}
