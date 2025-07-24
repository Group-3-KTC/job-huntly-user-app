"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ResultItem = ({ company }) => {
  // Hàm định dạng quy mô công ty
  const formatCompanySize = (size) => {
    const numSize = parseInt(size, 10);
    
    if (numSize <= 10) return '1-10 nhân viên';
    if (numSize <= 50) return '11-50 nhân viên';
    if (numSize <= 200) return '51-200 nhân viên';
    if (numSize <= 500) return '201-500 nhân viên';
    return '500+ nhân viên';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        {/* Logo */}
        <div className="w-16 h-16 flex-shrink-0 mr-4 overflow-hidden rounded-md bg-gray-50 p-1">
          <Link href={`/company/company-detail/${company.id}`}>
            <Image
              src={company.logo || '/logo_example.png'}
              alt={company.name}
              width={64}
              height={64}
              className="object-contain"
            />
          </Link>
        </div>
        
        {/* Thông tin công ty */}
        <div className="flex-1">
          <div className="flex flex-wrap justify-between mb-2">
            <h3 className="text-lg font-semibold text-[#0A66C2] hover:underline">
              <Link href={`/company/company-detail/${company.id}`}>
                {company.name}
              </Link>
            </h3>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {company.jobCount} việc làm
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
            {company.location && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {company.location}
              </div>
            )}
            
            {company.industry && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {company.industry}
              </div>
            )}
            
            {company.size && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {formatCompanySize(company.size)}
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {company.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultItem; 