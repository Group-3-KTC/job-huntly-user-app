"use client";

import { useState, useEffect, useRef } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "../../../store/hooks.js";
import { addToast } from "../../../store/slices/toastSlices.js";
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
  Coffee,
  Car,
  Home,
  Shield,
  Zap,
  Users,
  Trophy,
  Clock,
  Bold,
  Italic,
  List,
  Link,
} from "lucide-react";
import JobReviewPage from "./reviewpage.jsx";
import ProvinceCombobox from "./province-combobox.jsx";

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

  const [newSkillInput, setNewSkillInput] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showBenefitDialog, setShowBenefitDialog] = useState(false);
  const [newBenefit, setNewBenefit] = useState({
    title: "",
    description: "",
    icon: "heart",
  });

  const dispatch = useAppDispatch();

  // Refs for text editors
  const jobDescriptionRef = useRef(null);
  const niceToHavesRef = useRef(null);
  const requirementsRef = useRef(null);

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

  const workTypes = [
    "Full-Time",
    "Part-Time",
    "Remote",
    "Internship",
    "Contract",
  ];

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

  const benefitIcons = [
    { value: "heart", label: "Healthcare", icon: Heart },
    { value: "plane", label: "Travel", icon: Plane },
    { value: "graduation", label: "Education", icon: GraduationCap },
    { value: "coffee", label: "Perks", icon: Coffee },
    { value: "car", label: "Transportation", icon: Car },
    { value: "home", label: "Remote Work", icon: Home },
    { value: "shield", label: "Insurance", icon: Shield },
    { value: "zap", label: "Energy", icon: Zap },
    { value: "users", label: "Team", icon: Users },
    { value: "trophy", label: "Achievement", icon: Trophy },
    { value: "clock", label: "Flexible Hours", icon: Clock },
  ];

  const renderTextEditor = (placeholder, value, fieldName, maxLength = 500) => {
    const currentValue = value ?? "";
    const getRef = () => {
      switch (fieldName) {
        case "jobDescription":
          return jobDescriptionRef;
        case "niceToHaves":
          return niceToHavesRef;
        case "requirments":
          return requirementsRef;
        default:
          return null;
      }
    };

    return (
      <div className="space-y-2">
        <Textarea
          ref={getRef()}
          placeholder={placeholder}
          value={currentValue}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }))
          }
          className="min-h-[120px] resize-none"
          maxLength={maxLength}
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-blue-100"
              type="button"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-blue-100"
              type="button"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-blue-100"
              type="button"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-blue-100"
              type="button"
              title="Link"
            >
              <Link className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-sm text-gray-500">
            {currentValue.length} / {maxLength}
          </span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchJobs();
    fetchJobLevels();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        "https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/jobs"
      );
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchJobLevels = async () => {
    try {
      setIsLoadingLevels(true);
      const response = await fetch(
        "https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/job-levels"
      );
      if (response.ok) {
        const data = await response.json();
        // Assuming the API returns an array of objects with 'name' or 'level' property
        // Adjust this based on your actual API response structure
        const levels = data.map(
          (item) => item.name || item.level || item.title || item
        );
        setJobLevels(levels);
      } else {
        // Fallback to default levels if API fails
        setJobLevels([
          "Entry ",
          "Junior ",
          "Mid ",
          "Senior ",
          "Lead ",
          "Manager ",
          "Director",
        ]);
      }
    } catch (error) {
      console.error("Error fetching job levels:", error);
      // Fallback to default levels if API fails
      setJobLevels([
        "Entry ",
        "Junior ",
        "Mid ",
        "Senior ",
        "Lead ",
        "Manager ",
        "Director ",
      ]);
    } finally {
      setIsLoadingLevels(false);
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

  const handleSkillAdd = (skill) => {
    if (skill && !formData.skill.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skill: [...prev.skill, skill],
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skill: prev.skill.filter((skill) => skill !== skillToRemove),
    }));
  };

  const addNewSkill = () => {
    if (
      newSkillInput.trim() &&
      !availableSkills.includes(newSkillInput.trim())
    ) {
      setAvailableSkills((prev) => [...prev, newSkillInput.trim()]);
      handleSkillAdd(newSkillInput.trim());
      setNewSkillInput("");
      setShowSkillInput(false);
    }
  };

  const handleBenefitRemove = (benefitId) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit.id !== benefitId),
    }));
  };

  const addCustomBenefit = () => {
    if (newBenefit.title.trim() && newBenefit.description.trim()) {
      const benefit = {
        id: Date.now().toString(),
        title: newBenefit.title.trim(),
        description: newBenefit.description.trim(),
        icon: newBenefit.icon,
      };
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefit],
      }));
      setNewBenefit({ title: "", description: "", icon: "heart" });
      setShowBenefitDialog(false);
      dispatch(
        addToast({
          title: "Benefit Added",
          description: "New benefit has been added successfully!",
          variant: "success",
        })
      );
    }
  };

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
                  <div className="w-16 h-px bg-gray-300 mx-4" />
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
                    onChange={handleJobTitleChange}
                    className={`mt-2 ${
                      errors.jobTitle ? "border-red-500" : ""
                    }`}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.jobTitle}
                    </p>
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
                  <Select
                    onValueChange={handleCategoryChange}
                    value={formData.category}
                  >
                    <SelectTrigger
                      className={`w-full ${
                        errors.category ? "border-red-500" : ""
                      }`}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
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
                    <div
                      className={`border rounded-md p-3 ${
                        errors.city ? "border-red-500" : "border-gray-200"
                      }`}
                    >
                      <ProvinceCombobox
                        value={formData.city.length > 0 ? formData.city[0] : ""}
                        onChange={handleCityChange}
                        error={errors.city}
                        multiple={true}
                      />
                      {formData.city.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.city.map((city) => (
                            <Badge
                              key={city}
                              variant="secondary"
                              className="px-3 py-1"
                            >
                              {city}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                                onClick={() => handleCityChange(city)}
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
                      onChange={handleAddressChange}
                      className={`mt-2 ${
                        errors.address ? "border-red-500" : ""
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Work Type */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Type of Employment
                  </Label>
                  <p className="text-sm text-gray-600">
                    You can select multiple types of employment
                  </p>
                  <div
                    className={`space-y-3 ${
                      errors.workType
                        ? "border border-red-500 rounded-md p-3"
                        : ""
                    }`}
                  >
                    {workTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={formData.workType.includes(type)}
                          onCheckedChange={(checked) =>
                            handleWorkTypeChange(type, checked)
                          }
                        />
                        <Label htmlFor={type} className="text-sm font-normal">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.workType && (
                    <p className="text-red-500 text-sm">{errors.workType}</p>
                  )}
                </div>

                {/* Salary Slider */}
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
                      <span className="text-sm text-gray-500">to</span>
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
                    <div className="px-2">
                      <Slider
                        value={formData.salaryRange}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            salaryRange: value,
                          }))
                        }
                        max={100000}
                        min={1000}
                        step={1000}
                        className="w-full"
                      />
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
                        Loading job levels...
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {jobLevels.map((level) => (
                        <div
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={level}
                            checked={formData.level.includes(level)}
                            onCheckedChange={(checked) =>
                              handleLevelChange(level, checked)
                            }
                          />
                          <Label
                            htmlFor={level}
                            className="text-sm font-normal"
                          >
                            {level}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Required Skills */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Required Skills
                    </Label>
                    <div className="flex gap-2">
                      {!showSkillInput ? (
                        <>
                          <Select onValueChange={handleSkillAdd}>
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Select a skill" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSkills
                                .filter(
                                  (skill) => !formData.skill.includes(skill)
                                )
                                .map((skill) => (
                                  <SelectItem key={skill} value={skill}>
                                    {skill}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-600 bg-transparent"
                            onClick={() => setShowSkillInput(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add New
                          </Button>
                        </>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter new skill"
                            value={newSkillInput}
                            onChange={(e) => setNewSkillInput(e.target.value)}
                            className="w-48"
                            onKeyPress={(e) =>
                              e.key === "Enter" && addNewSkill()
                            }
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addNewSkill}
                            disabled={!newSkillInput.trim()}
                          >
                            Add
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setShowSkillInput(false);
                              setNewSkillInput("");
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add required skills for the job
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skill.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
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
                    Job Description
                  </Label>
                  <p className="text-sm text-gray-600">
                    Describe the job position and what it entails
                  </p>
                  {renderTextEditor(
                    "Enter job description",
                    formData.jobDescription,
                    "jobDescription"
                  )}
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Requirements</Label>
                  <p className="text-sm text-gray-600">
                    List the main requirements for this position (one per line)
                  </p>
                  {renderTextEditor(
                    "Enter job requirements (one per line)",
                    formData.requirments,
                    "requirments"
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
                    "niceToHaves"
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Perks & Benefits */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Perks & Benefits
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
                    <Dialog
                      open={showBenefitDialog}
                      onOpenChange={setShowBenefitDialog}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-600 bg-transparent"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Benefit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add New Benefit</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="benefit-title">Title</Label>
                            <Input
                              id="benefit-title"
                              placeholder="e.g. Health Insurance"
                              value={newBenefit.title}
                              onChange={(e) =>
                                setNewBenefit((prev) => ({
                                  ...prev,
                                  title: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="benefit-description">
                              Description
                            </Label>
                            <Textarea
                              id="benefit-description"
                              placeholder="Describe this benefit..."
                              className="min-h-[80px]"
                              value={newBenefit.description}
                              onChange={(e) =>
                                setNewBenefit((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Icon</Label>
                            <Select
                              value={newBenefit.icon}
                              onValueChange={(value) =>
                                setNewBenefit((prev) => ({
                                  ...prev,
                                  icon: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {benefitIcons.map((icon) => (
                                  <SelectItem
                                    key={icon.value}
                                    value={icon.value}
                                  >
                                    <div className="flex items-center gap-2">
                                      <icon.icon className="w-4 h-4" />
                                      {icon.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowBenefitDialog(false);
                                setNewBenefit({
                                  title: "",
                                  description: "",
                                  icon: "heart",
                                });
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={addCustomBenefit}
                              disabled={
                                !newBenefit.title.trim() ||
                                !newBenefit.description.trim()
                              }
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Add Benefit
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
                          className="absolute top-4 right-4 h-8 w-8 p-0"
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
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {benefit.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
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
        {jobs.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Recent Jobs ({jobs.length})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {jobs.slice(-5).map((job) => (
                  <div key={job.id} className="text-sm p-2 bg-gray-50 rounded">
                    <strong>{job.title}</strong> - {job.category} (
                    {Array.isArray(job.workType)
                      ? job.workType.join(", ")
                      : job.workType}
                    )
                    <br />
                    <span className="text-gray-600">
                      ${job.salaryMin} - ${job.salaryMax} | Location:{" "}
                      {job.location} | Skills:{" "}
                      {Array.isArray(job.skill)
                        ? job.skill.join(", ")
                        : job.skill}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
