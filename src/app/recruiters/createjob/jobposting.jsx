"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Briefcase,
  FileText,
  Gift,
  Plus,
  X,
  ArrowLeft,
  ArrowRight,
  Heart,
  Plane,
  GraduationCap,
  Bold,
  Italic,
  List,
  Link,
} from "lucide-react";

export default function JobPostingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    employmentTypes: [],
    salaryRange: [5000, 22000],
    categories: "",
    skills: ["Graphic Design", "Communication", "Illustrator"],
    jobDescription: "",
    responsibilities: "",
    qualifications: "",
    niceToHaves: "",
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
  });

  const steps = [
    { number: 1, title: "Job Information", icon: Briefcase },
    { number: 2, title: "Job Description", icon: FileText },
    { number: 3, title: "Perks & Benefit", icon: Gift },
  ];

  const employmentTypes = [
    "Full-Time",
    "Part-Time",
    "Remote",
    "Internship",
    "Contract",
  ];

  const handleEmploymentTypeChange = (type, checked) => {
    setFormData((prev) => ({
      ...prev,
      employmentTypes: checked
        ? [...prev.employmentTypes, type]
        : prev.employmentTypes.filter((t) => t !== type),
    }));
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleBenefitRemove = (benefitId) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit.id !== benefitId),
    }));
  };

  const addBenefit = () => {
    const newBenefit = {
      id: Date.now().toString(),
      title: "New Benefit",
      description: "Add your benefit description here",
      icon: "heart",
    };
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, newBenefit],
    }));
  };

  const getBenefitIcon = (iconType) => {
    switch (iconType) {
      case "heart":
        return <Heart className="w-8 h-8 text-blue-500" />;
      case "plane":
        return <Plane className="w-8 h-8 text-blue-500" />;
      case "graduation":
        return <GraduationCap className="w-8 h-8 text-blue-500" />;
      default:
        return <Heart className="w-8 h-8 text-blue-500" />;
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderTextEditor = (placeholder, value, onChange, maxLength = 500) => (
    <div className="space-y-2">
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] resize-none"
        maxLength={maxLength}
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Bold className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Italic className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Link className="w-4 h-4" />
          </Button>
        </div>
        <span className="text-sm text-gray-500">
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto">
        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center space-x-3 ${
                    currentStep === step.number
                      ? "text-blue-600"
                      : currentStep > step.number
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep === step.number
                        ? "bg-blue-600 text-white"
                        : currentStep > step.number
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Step {step.number}/3
                    </div>
                    <div className="text-sm">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-px mx-4 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="w-full">
          <CardContent className="p-8">
            {/* Step 1: Job Information */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
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
                    Job titles must be describe one position
                  </p>
                  <Input
                    id="jobTitle"
                    placeholder="e.g. Software Engineer"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jobTitle: e.target.value,
                      }))
                    }
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500">
                    At least 80 characters
                  </p>
                </div>

                {/* Employment Type */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Type of Employment
                  </Label>
                  <p className="text-sm text-gray-600">
                    You can select multiple type of employment
                  </p>
                  <div className="space-y-3">
                    {employmentTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={formData.employmentTypes.includes(type)}
                          onCheckedChange={(checked) =>
                            handleEmploymentTypeChange(type, checked)
                          }
                        />
                        <Label htmlFor={type} className="text-sm font-normal">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Salary</Label>
                  <p className="text-sm text-gray-600">
                    Please specify the estimated salary range for the role. *You
                    can leave this blank
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">$</span>
                        <Input
                          type="number"
                          value={formData.salaryRange[0]}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              salaryRange: [
                                Number.parseInt(e.target.value) || 0,
                                prev.salaryRange[1],
                              ],
                            }))
                          }
                          className="w-24"
                        />
                      </div>
                      <span className="text-sm text-gray-800 ">to</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">$</span>
                        <Input
                          type="number"
                          value={formData.salaryRange[1]}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              salaryRange: [
                                prev.salaryRange[0],
                                Number.parseInt(e.target.value) || 0,
                              ],
                            }))
                          }
                          className="w-24"
                        />
                      </div>
                    </div>
                    <Slider
                      value={formData.salaryRange}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, salaryRange: value }))
                      }
                      max={100000}
                      min={1000}
                      step={1000}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Categories</Label>
                  <p className="text-sm text-gray-600">
                    You can select multiple job categories
                  </p>
                  <Select
                    value={formData.categories}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, categories: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Job Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Required Skills */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Required Skills
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 bg-transparent border-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skills
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add required skills for the job
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-4 h-4 p-0 ml-2 hover:bg-transparent"
                          onClick={() => handleSkillRemove(skill)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Job Description */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Details
                  </h2>
                  <p className="text-gray-600">
                    Add the description of the job, responsibilities, who you
                    are, and nice-to-haves.
                  </p>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Job Descriptions
                  </Label>
                  <p className="text-sm text-gray-600">
                    Job titles must be describe one position
                  </p>
                  {renderTextEditor(
                    "Enter job description",
                    formData.jobDescription,
                    (value) =>
                      setFormData((prev) => ({
                        ...prev,
                        jobDescription: value,
                      })),
                  )}
                </div>

                {/* Responsibilities */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Responsibilities
                  </Label>
                  <p className="text-sm text-gray-600">
                    Outline the core responsibilities of the position
                  </p>
                  {renderTextEditor(
                    "Enter job responsibilities",
                    formData.responsibilities,
                    (value) =>
                      setFormData((prev) => ({
                        ...prev,
                        responsibilities: value,
                      })),
                  )}
                </div>

                {/* Who You Are */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Who You Are</Label>
                  <p className="text-sm text-gray-600">
                    Add your preferred candidates qualifications
                  </p>
                  {renderTextEditor(
                    "Enter qualifications",
                    formData.qualifications,
                    (value) =>
                      setFormData((prev) => ({
                        ...prev,
                        qualifications: value,
                      })),
                  )}
                </div>

                {/* Nice-To-Haves */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Nice-To-Haves</Label>
                  <p className="text-sm text-gray-600">
                    Add nice-to-have skills and qualifications for the role to
                    encourage a more diverse set of candidates to apply
                  </p>
                  {renderTextEditor(
                    "Enter nice-to-haves",
                    formData.niceToHaves,
                    (value) =>
                      setFormData((prev) => ({ ...prev, niceToHaves: value })),
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Perks & Benefits */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Basic Information
                  </h2>
                  <p className="text-gray-600">
                    List out your top perks and benefits.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Perks and Benefits
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 bg-transparent border-blue-600"
                      onClick={addBenefit}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Benefit
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Encourage more people to apply by sharing the attractive
                    rewards and benefits you offer your employees
                  </p>

                  <div className="grid gap-6">
                    {formData.benefits.map((benefit) => (
                      <Card key={benefit.id} className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute w-8 h-8 p-0 top-4 right-4"
                          onClick={() => handleBenefitRemove(benefit.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              {getBenefitIcon(benefit.icon)}
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                {benefit.title}
                              </h3>
                              <p className="text-sm leading-relaxed text-gray-600">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Return Step
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
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Do a Review
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
