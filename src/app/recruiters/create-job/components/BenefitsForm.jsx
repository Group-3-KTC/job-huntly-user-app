"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import BenefitItem from "./BenefitItem";
import BenefitDialog from "./BenefitDialog";

const BenefitsForm = ({ formData, onBenefitAdd, onBenefitRemove }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Perks & Benefits
        </h2>
        <p className="text-gray-600">List out your top perks and benefits.</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Perks and Benefits</Label>
          <BenefitDialog onAddBenefit={onBenefitAdd} />
        </div>

        <p className="text-sm text-gray-600">
          Encourage more people to apply by sharing the attractive rewards and
          benefits you offer your employees
        </p>

        <div className="grid gap-6">
          {formData.benefits.map((benefit) => (
            <BenefitItem 
              key={benefit.id} 
              benefit={benefit} 
              onRemove={onBenefitRemove} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsForm; 