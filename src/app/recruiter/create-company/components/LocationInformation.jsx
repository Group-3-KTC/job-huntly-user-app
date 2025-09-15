"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

const LocationInformation = ({ formData, errors, onInputChange }) => {
    return (
        <div className="space-y-6">
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
                        onChange={(e) => onInputChange("address", e.target.value)}
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
                        onChange={(e) => onInputChange("locationCity", e.target.value)}
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
                        onChange={(e) => onInputChange("locationCountry", e.target.value)}
                        placeholder="Vietnam"
                    />
                </div>
            </div>
        </div>
    );
};

export default LocationInformation;