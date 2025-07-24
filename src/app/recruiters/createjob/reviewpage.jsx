"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useAppDispatch } from "../../../store/hooks.js";
import { addToast } from "../../../store/slices/toastSlices.js";
import {
    ArrowLeft,
    Share2,
    MapPin,
    Clock,
    Users,
    Calendar,
    CheckCircle,
    Heart,
    Plane,
    GraduationCap,
    Coffee,
    Car,
    Home,
    Shield,
    Zap,
    Trophy,
    Loader2,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

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

    const safeBenefits = Array.isArray(formData?.benefits)
        ? formData.benefits
        : [];
    const safeSkills = Array.isArray(formData?.skill) ? formData.skill : [];
    const safeWorkType = Array.isArray(formData?.workType)
        ? formData.workType
        : [];
    const safeSalary = Array.isArray(formData?.salaryRange)
        ? formData.salaryRange
        : [0, 0];
    const safeRequirments = formData?.requirments || "";
    const dispatch = useAppDispatch();

    const getBenefitIcon = (iconType) => {
        const iconMap = {
            heart: Heart,
            plane: Plane,
            graduation: GraduationCap,
            coffee: Coffee,
            car: Car,
            home: Home,
            shield: Shield,
            zap: Zap,
            users: Users,
            trophy: Trophy,
            clock: Clock,
        };
        const IconComponent = iconMap[iconType] || Heart;
        return <IconComponent className="w-8 h-8 text-blue-500" />;
    };

    const formatSalary = (min, max) => {
        return `$${min.toLocaleString()} - $${max.toLocaleString()} USD`;
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
            dispatch(
                addToast({
                    title: "Validation Error",
                    description:
                        "Please correct the date errors before publishing.",
                    variant: "destructive",
                })
            );
            return;
        }

        setParentFormData((prev) => ({
            ...prev,
            datePost: reviewData.datePost,
            expiredDate: reviewData.expiredDate,
        }));

        submitJob();
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
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
        <div className="min-h-screen bg-gray-50 py-8">
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
                            <CardContent className="p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-400 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                                            {formData.jobTitle
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                                {formData.jobTitle}
                                            </h1>
                                            <div className="flex items-center gap-4 text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>
                                                        {formData.city.join(
                                                            ", "
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {safeWorkType.join(
                                                            ", "
                                                        )}
                                                    </span>
                                                </div>
                                                {formData.level &&
                                                    formData.level.length >
                                                        0 && (
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4" />
                                                            <span className="capitalize">
                                                                {formData.level.join(
                                                                    ", "
                                                                )}
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
                            </CardContent>
                        </Card>

                        {/* Job Description */}
                        {formData.jobDescription && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Description
                                    </CardTitle>
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
                                    <CardTitle className="text-xl">
                                        Requirements
                                    </CardTitle>
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
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
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
                                    <CardTitle className="text-xl">
                                        Nice-To-Haves
                                    </CardTitle>
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
                                                    <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
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
                                    <CardTitle className="text-xl">
                                        Perks & Benefits
                                    </CardTitle>
                                    <p className="text-gray-600">
                                        This job comes with several perks and
                                        benefits
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {safeBenefits.map((benefit) => (
                                            <div
                                                key={benefit.id}
                                                className="flex items-start gap-4"
                                            >
                                                <div className="flex-shrink-0">
                                                    {getBenefitIcon(
                                                        benefit.icon
                                                    )}
                                                </div>
                                                <div>
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
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* About This Role */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    About this role
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Category
                                    </span>
                                    <span className="font-medium">
                                        {formData.category || "Not set"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Location
                                    </span>
                                    <span className="font-medium">
                                        {formData.city.join(", ")}
                                    </span>
                                </div>
                                {formData.address && (
                                    <div className="flex justify-between items-start">
                                        <span className="text-gray-600">
                                            Address
                                        </span>
                                        <span className="font-medium text-right text-sm">
                                            {formData.address}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Apply Before
                                    </span>
                                    <span className="font-medium">
                                        {reviewData.expiredDate
                                            ? formatDate(reviewData.expiredDate)
                                            : "Not set"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Job Posted On
                                    </span>
                                    <span className="font-medium">
                                        {reviewData.datePost
                                            ? formatDate(reviewData.datePost)
                                            : "Not set"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Job Type
                                    </span>
                                    <span className="font-medium">
                                        {safeWorkType.join(", ")}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Salary
                                    </span>
                                    <span className="font-medium">
                                        {formatSalary(
                                            safeSalary[0],
                                            safeSalary[1]
                                        )}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Required Skills */}
                        {safeSkills.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Required Skills
                                    </CardTitle>
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

                        {/* Publishing Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Publishing Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="datePost"
                                        className="text-sm font-medium"
                                    >
                                        Post Date
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="datePost"
                                            type="date"
                                            value={reviewData.datePost}
                                            onChange={handleDatePostChange}
                                            className={`pl-10 ${
                                                datePostError
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            min={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                        />
                                    </div>
                                    {datePostError && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {datePostError}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="expiredDate"
                                        className="text-sm font-medium"
                                    >
                                        Expiration Date
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="expiredDate"
                                            type="date"
                                            value={reviewData.expiredDate}
                                            onChange={handleExpiredDateChange}
                                            className={`pl-10 ${
                                                expiredDateError
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            min={
                                                reviewData.datePost ||
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                        />
                                    </div>
                                    {expiredDateError && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {expiredDateError}
                                        </p>
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Success Dialog */}
            <Dialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            Job Posted Successfully!
                        </DialogTitle>
                        <DialogDescription>
                            Your job listing has been successfully published to
                            the API.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => setShowSuccessDialog(false)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            OK
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
