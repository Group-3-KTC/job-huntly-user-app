"use client";

import React, { useState } from 'react';

const FilterSidebar = ({ filters, setFilters, industries, companySizes, filterCounts }) => {
  const [expandedSections, setExpandedSections] = useState({
    companySize: true,
    industry: true,
    foundingYear: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCompanySizeChange = (size) => {
    const newCompanySizes = filters.companySize.includes(size)
      ? filters.companySize.filter(s => s !== size)
      : [...filters.companySize, size];
    
    setFilters({ companySize: newCompanySizes });
  };

  const handleIndustryChange = (industry) => {
    const newIndustries = filters.industry.includes(industry)
      ? filters.industry.filter(i => i !== industry)
      : [...filters.industry, industry];
    
    setFilters({ industry: newIndustries });
  };

  const handleFoundingYearChange = (year) => {
    setFilters({ foundingYear: year });
  };

  // Tạo danh sách năm thành lập (từ 2000 đến năm hiện tại)
  const currentYear = new Date().getFullYear();
  const foundingYears = Array.from(
    { length: currentYear - 1999 },
    (_, i) => (currentYear - i).toString()
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Bộ lọc</h2>
      
      {/* Quy mô công ty */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-[#0A66C2]" 
          onClick={() => toggleSection('companySize')}
        >
          <h3 className="font-medium">Quy mô công ty</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.companySize ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        {expandedSections.companySize && (
          <div className="pl-1 space-y-2">
            {companySizes.map(size => (
              <div key={size.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`size-${size.id}`}
                  checked={filters.companySize.includes(size.id)}
                  onChange={() => handleCompanySizeChange(size.id)}
                  className="h-4 w-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]"
                />
                <label htmlFor={`size-${size.id}`} className="ml-2 text-sm text-gray-700">
                  {size.label} ({filterCounts.companySize[size.id] || 0})
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Ngành nghề */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-[#0A66C2]" 
          onClick={() => toggleSection('industry')}
        >
          <h3 className="font-medium">Ngành nghề</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.industry ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        {expandedSections.industry && (
          <div className="pl-1 space-y-2 max-h-60 overflow-y-auto">
            {industries.map(industry => (
              <div key={industry.cate_id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`industry-${industry.cate_id}`}
                  checked={filters.industry.includes(industry.cate_name)}
                  onChange={() => handleIndustryChange(industry.cate_name)}
                  className="h-4 w-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]"
                />
                <label htmlFor={`industry-${industry.cate_id}`} className="ml-2 text-sm text-gray-700">
                  {industry.cate_name} ({filterCounts.industry[industry.cate_name] || 0})
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Năm thành lập */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-[#0A66C2]" 
          onClick={() => toggleSection('foundingYear')}
        >
          <h3 className="font-medium">Năm thành lập</h3>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSections.foundingYear ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        {expandedSections.foundingYear && (
          <div className="pl-1">
            <div className="mb-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="year-any"
                  name="foundingYear"
                  value="any"
                  checked={filters.foundingYear === 'any'}
                  onChange={() => handleFoundingYearChange('any')}
                  className="h-4 w-4 border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]"
                />
                <label htmlFor="year-any" className="ml-2 text-sm text-gray-700">
                  Tất cả
                </label>
              </div>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-2">
              {foundingYears.map(year => (
                <div key={year} className="flex items-center">
                  <input
                    type="radio"
                    id={`year-${year}`}
                    name="foundingYear"
                    value={year}
                    checked={filters.foundingYear === year}
                    onChange={() => handleFoundingYearChange(year)}
                    className="h-4 w-4 border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]"
                  />
                  <label htmlFor={`year-${year}`} className="ml-2 text-sm text-gray-700">
                    {year}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Nút xóa bộ lọc */}
      <button
        onClick={() => setFilters({ companySize: [], industry: [], foundingYear: 'any' })}
        className="w-full py-2 px-4 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        Xóa tất cả bộ lọc
      </button>
    </div>
  );
};

export default FilterSidebar;