"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../components/SearchBar';
import PopularSearches from '../components/PopularSearches';
import RecommendedCompanies from '../components/RecommendedCompanies';
import CallToAction from '../components/CallToAction';
import useCompanySearchStore from '../store/companySearchStore';

const SearchPageContent = () => {
  const router = useRouter();
  const { fetchCompanies, fetchIndustries } = useCompanySearchStore();
  
  useEffect(() => {
    // Tải trước dữ liệu cho trang tìm kiếm
    fetchCompanies();
    fetchIndustries();
  }, [fetchCompanies, fetchIndustries]);

  const handleSearch = (searchParams) => {
    const queryParams = new URLSearchParams();
    
    if (searchParams.company) {
      queryParams.append('name', searchParams.company); // ĐỔI company thành name để khớp với API
    }
    
    if (searchParams.location) {
      queryParams.append('location', searchParams.location);
    }
    
    if (searchParams.categoryIds && searchParams.categoryIds.length > 0) {
      queryParams.append('categoryIds', searchParams.categoryIds.join(','));
    }
    
    console.log('Searching with params:', queryParams.toString());
    router.push(`/company/company-search/results?${queryParams.toString()}`);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tìm kiếm công ty</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các công ty phù hợp với sở thích và kỹ năng của bạn. Tìm kiếm theo tên, địa điểm, ngành nghề hoặc quy mô.
          </p>
        </div>

        <div className="mb-16">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mb-16">
          <PopularSearches />
        </div>

        <div className="mb-16">
          <RecommendedCompanies />
        </div>

        <div>
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default SearchPageContent; 