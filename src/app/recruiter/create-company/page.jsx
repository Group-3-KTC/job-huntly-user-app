"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Upload, MapPin, Globe, Phone, Mail, Calendar, Users, Loader2 } from "lucide-react";
import { createCompany } from "@/services/companyService";
import { getAllCategories } from "@/services/categoryService";
import { useSelector } from "react-redux";

export default function CreateCompanyPage() {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        companyName: "",
        description: "",
        email: "",
        phoneNumber: "",
        website: "",
        address: "",
        locationCity: "",
        locationCountry: "Vietnam",
        foundedYear: new Date().getFullYear(),
        quantityEmployee: 1,
        status: "active",
        isProCompany: false,
        facebookUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
        mapEmbedUrl: "",
        avatar: "",
        avatarCover: "",
        categoryIds: []
    });

    const [errors, setErrors] = useState({});

    // Load categories from API
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await getAllCategories();
                setCategories(categoriesData || []);
            } catch (error) {
                console.error("Error loading categories:", error);
                // Set empty array if error
                setCategories([]);
            } finally {
                setCategoriesLoading(false);
            }
        };

        loadCategories();
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const handleCategoryChange = (categoryId, checked) => {
        setFormData(prev => ({
            ...prev,
            categoryIds: checked 
                ? [...prev.categoryIds, categoryId]
                : prev.categoryIds.filter(id => id !== categoryId)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        }
        
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }
        
        if (!formData.locationCity.trim()) {
            newErrors.locationCity = "City is required";
        }
        
        if (formData.foundedYear < 1800 || formData.foundedYear > new Date().getFullYear()) {
            newErrors.foundedYear = "Founded year is invalid";
        }
        
        if (formData.quantityEmployee < 1) {
            newErrors.quantityEmployee = "Employee quantity must be at least 1";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        try {
            // Add userId to form data
            const companyData = {
                ...formData,
                userId: user?.id || user?.userId
            };
            
            await createCompany(companyData);
            router.push("/recruiter/company");
        } catch (error) {
            console.error("Error creating company:", error);
            // Handle error silently as per requirement
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Company</h1>
                    <p className="text-gray-600">Set up your company profile to start posting jobs and attracting candidates.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Basic Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name *</Label>
                                <Input
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                                    placeholder="Enter company name"
                                    className={errors.companyName ? "border-red-500" : ""}
                                />
                                {errors.companyName && (
                                    <p className="text-sm text-red-500">{errors.companyName}</p>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="contact@company.com"
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number *</Label>
                                <Input
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                    placeholder="+84 123 456 789"
                                    className={errors.phoneNumber ? "border-red-500" : ""}
                                />
                                {errors.phoneNumber && (
                                    <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={formData.website}
                                    onChange={(e) => handleInputChange("website", e.target.value)}
                                    placeholder="https://company.com"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-6 space-y-2">
                            <Label htmlFor="description">Company Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Tell us about your company..."
                                rows={4}
                            />
                        </div>
                    </Card>

                    {/* Location Information */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <h2 className="text-xl font-semibold">Location Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="address">Address *</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    placeholder="123 Main Street"
                                    className={errors.address ? "border-red-500" : ""}
                                />
                                {errors.address && (
                                    <p className="text-sm text-red-500">{errors.address}</p>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="locationCity">City *</Label>
                                <Input
                                    id="locationCity"
                                    value={formData.locationCity}
                                    onChange={(e) => handleInputChange("locationCity", e.target.value)}
                                    placeholder="Ho Chi Minh City"
                                    className={errors.locationCity ? "border-red-500" : ""}
                                />
                                {errors.locationCity && (
                                    <p className="text-sm text-red-500">{errors.locationCity}</p>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="locationCountry">Country</Label>
                                <Input
                                    id="locationCountry"
                                    value={formData.locationCountry}
                                    onChange={(e) => handleInputChange("locationCountry", e.target.value)}
                                    placeholder="Vietnam"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Company Details */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Calendar className="w-5 h-5 text-purple-600" />
                            <h2 className="text-xl font-semibold">Company Details</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="foundedYear">Founded Year *</Label>
                                <Input
                                    id="foundedYear"
                                    type="number"
                                    value={formData.foundedYear}
                                    onChange={(e) => handleInputChange("foundedYear", parseInt(e.target.value))}
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    className={errors.foundedYear ? "border-red-500" : ""}
                                />
                                {errors.foundedYear && (
                                    <p className="text-sm text-red-500">{errors.foundedYear}</p>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="quantityEmployee">Number of Employees *</Label>
                                <Input
                                    id="quantityEmployee"
                                    type="number"
                                    value={formData.quantityEmployee}
                                    onChange={(e) => handleInputChange("quantityEmployee", parseInt(e.target.value))}
                                    min="1"
                                    className={errors.quantityEmployee ? "border-red-500" : ""}
                                />
                                {errors.quantityEmployee && (
                                    <p className="text-sm text-red-500">{errors.quantityEmployee}</p>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <div className="mt-6 flex items-center space-x-2">
                            <Checkbox
                                id="isProCompany"
                                checked={formData.isProCompany}
                                onCheckedChange={(checked) => handleInputChange("isProCompany", checked)}
                            />
                            <Label htmlFor="isProCompany" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Pro Company (Premium features)
                            </Label>
                        </div>
                    </Card>

                    {/* Social Media */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Globe className="w-5 h-5 text-blue-500" />
                            <h2 className="text-xl font-semibold">Social Media & Links</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="facebookUrl">Facebook URL</Label>
                                <Input
                                    id="facebookUrl"
                                    value={formData.facebookUrl}
                                    onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                                    placeholder="https://facebook.com/company"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                                <Input
                                    id="linkedinUrl"
                                    value={formData.linkedinUrl}
                                    onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                                    placeholder="https://linkedin.com/company/company"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="twitterUrl">Twitter URL</Label>
                                <Input
                                    id="twitterUrl"
                                    value={formData.twitterUrl}
                                    onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
                                    placeholder="https://twitter.com/company"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="mapEmbedUrl">Google Maps Embed URL</Label>
                                <Input
                                    id="mapEmbedUrl"
                                    value={formData.mapEmbedUrl}
                                    onChange={(e) => handleInputChange("mapEmbedUrl", e.target.value)}
                                    placeholder="https://www.google.com/maps/embed/..."
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Categories */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Users className="w-5 h-5 text-orange-600" />
                            <h2 className="text-xl font-semibold">Industry Categories</h2>
                        </div>
                        
                        {categoriesLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                <span>Loading categories...</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`category-${category.id}`}
                                            checked={formData.categoryIds.includes(category.id)}
                                            onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
                                        />
                                        <Label 
                                            htmlFor={`category-${category.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {category.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || categoriesLoading}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {loading ? "Creating..." : "Create Company"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}