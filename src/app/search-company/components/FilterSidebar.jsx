"use client";

import React, { useState, useEffect } from 'react';

const FilterSidebar = ({ filters, setFilters, industries, companySizes, filterCounts }) => {
  const [expandedSections, setExpandedSections] = useState({
    companySize: true,
    industry: true,
    foundingYear: true
  });
  
  const [isMounted, setIsMounted] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  
  // Hiệu ứng fade in khi component được mount
  useEffect(() => {
    setIsMounted(true);
    
    // Tính tổng số filter đang active
    const total = 
      filters.companySize.length + 
      filters.industry.length + 
      (filters.foundingYear !== 'any' ? 1 : 0);
      
    setActiveFilters(total);
  }, [filters]);

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
  
  const clearAllFilters = () => {
    // Thêm hiệu ứng nhấp nháy cho nút xóa filter
    const element = document.getElementById('clear-filters-btn');
    if (element) {
      element.classList.add('filter-pulse');
      setTimeout(() => {
        element.classList.remove('filter-pulse');
      }, 500);
    }
    
    setFilters({ companySize: [], industry: [], foundingYear: 'any' });
  };

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
        <span>Bộ lọc</span>
        {activeFilters > 0 && (
          <span className="bg-blue-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {activeFilters}
          </span>
        )}
      </h2>
      
      {/* Quy mô công ty */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-blue-600 transition-colors" 
          onClick={() => toggleSection('companySize')}
        >
          <h3 className="font-medium">Quy mô công ty</h3>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${expandedSections.companySize ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        <div 
          className={`pl-1 space-y-2 transition-all duration-300 overflow-hidden ${
            expandedSections.companySize 
              ? 'max-h-60 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          {companySizes.map(size => (
            <div key={size.id} className="flex items-center group">
              <div className="relative">
                <input
                  type="checkbox"
                  id={`size-${size.id}`}
                  checked={filters.companySize.includes(size.id)}
                  onChange={() => handleCompanySizeChange(size.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer"
                />
                <div className={`absolute inset-0 bg-blue-200 scale-0 rounded-sm group-hover:scale-50 transition-transform duration-200 pointer-events-none ${
                  filters.companySize.includes(size.id) ? 'opacity-0' : 'opacity-30'
                }`}></div>
              </div>
              <label htmlFor={`size-${size.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer group-hover:text-blue-600 transition-colors">
                {size.label} <span className="text-gray-500">({filterCounts.companySize[size.id] || 0})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Ngành nghề */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-blue-600 transition-colors" 
          onClick={() => toggleSection('industry')}
        >
          <h3 className="font-medium">Ngành nghề</h3>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${expandedSections.industry ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        <div 
          className={`pl-1 max-h-60 transition-all duration-300 overflow-hidden ${
            expandedSections.industry
              ? 'opacity-100 overflow-y-auto'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2">
            {industries.map(industry => (
              <div key={industry.cate_id} className="flex items-center group">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={`industry-${industry.cate_id}`}
                    checked={filters.industry.includes(industry.cate_name)}
                    onChange={() => handleIndustryChange(industry.cate_name)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer"
                  />
                  <div className={`absolute inset-0 bg-blue-200 scale-0 rounded-sm group-hover:scale-50 transition-transform duration-200 pointer-events-none ${
                    filters.industry.includes(industry.cate_name) ? 'opacity-0' : 'opacity-30'
                  }`}></div>
                </div>
                <label htmlFor={`industry-${industry.cate_id}`} className="ml-2 text-sm text-gray-700 cursor-pointer group-hover:text-blue-600 transition-colors">
                  {industry.cate_name} <span className="text-gray-500">({filterCounts.industry[industry.cate_name] || 0})</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Năm thành lập */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2 hover:text-blue-600 transition-colors" 
          onClick={() => toggleSection('foundingYear')}
        >
          <h3 className="font-medium">Năm thành lập</h3>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${expandedSections.foundingYear ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        <div 
          className={`pl-1 transition-all duration-300 overflow-hidden ${
            expandedSections.foundingYear
              ? 'max-h-80 opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mb-2">
            <div className="flex items-center group">
              <div className="relative">
                <input
                  type="radio"
                  id="year-any"
                  name="foundingYear"
                  value="any"
                  checked={filters.foundingYear === 'any'}
                  onChange={() => handleFoundingYearChange('any')}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer"
                />
                <div className="absolute inset-0 bg-blue-200 scale-0 rounded-full group-hover:scale-50 transition-transform duration-200 pointer-events-none opacity-30"></div>
              </div>
              <label htmlFor="year-any" className="ml-2 text-sm text-gray-700 cursor-pointer group-hover:text-blue-600 transition-colors">
                Tất cả
              </label>
            </div>
          </div>
          
          <div className="max-h-40 overflow-y-auto pr-1 space-y-2 scrollbar">
            {foundingYears.map(year => (
              <div key={year} className="flex items-center group">
                <div className="relative">
                  <input
                    type="radio"
                    id={`year-${year}`}
                    name="foundingYear"
                    value={year}
                    checked={filters.foundingYear === year}
                    onChange={() => handleFoundingYearChange(year)}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-blue-200 scale-0 rounded-full group-hover:scale-50 transition-transform duration-200 pointer-events-none opacity-30"></div>
                </div>
                <label htmlFor={`year-${year}`} className="ml-2 text-sm text-gray-700 cursor-pointer group-hover:text-blue-600 transition-colors">
                  {year}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Nút xóa bộ lọc */}
      <button
        id="clear-filters-btn"
        onClick={clearAllFilters}
        disabled={activeFilters === 0}
        className={`w-full py-2 px-4 text-sm border rounded-md transition-all duration-300 ${
          activeFilters > 0 
            ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 active:bg-blue-50'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Xóa tất cả bộ lọc {activeFilters > 0 && `(${activeFilters})`}
      </button>
      
      <style jsx>{`
        .scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        
        .scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
        
        @keyframes filter-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .filter-pulse {
          animation: filter-pulse 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;