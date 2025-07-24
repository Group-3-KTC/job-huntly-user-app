"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCompanySearchStore from '../store/companySearchStore';

const RecommendedCompanies = () => {
  const { getRecommendedCompanies } = useCompanySearchStore();
  const recommendedCompanies = getRecommendedCompanies();
  
  if (recommendedCompanies.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Công ty đề xuất</h2>
        <p className="text-gray-600 mt-1">Dựa trên hồ sơ, sở thích và hoạt động gần đây của bạn</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedCompanies.map(company => (
          <Link 
            key={company.id}
            href={`/company/company-detail/${company.id}`}
            className="border rounded-lg p-6 relative hover:shadow-lg transition-shadow"
          >
            {/* Job count */}
            <div className="absolute top-6 right-6 text-[#0A66C2] font-medium">
              {company.jobCount} việc làm
            </div>
            
            {/* Logo & company name */}
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Image 
                  src={company.logo || '/logo_example.png'} 
                  alt={company.name} 
                  width={50} 
                  height={50} 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-4 line-clamp-3">
              {company.description}
            </p>
            
            {/* Category tag */}
            <div className="mt-auto">
              <span className="inline-block px-3 py-1 text-xs text-orange-600 bg-orange-50 border border-orange-200 rounded-full">
                {company.industry}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCompanies; 