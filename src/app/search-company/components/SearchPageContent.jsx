"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import PopularSearches from './PopularSearches';
import RecommendedCompanies from './RecommendedCompanies';
import CallToAction from './CallToAction';

const SearchPageContent = () => {
  const router = useRouter();

  const handleSearch = (searchParams) => {
    const queryParams = new URLSearchParams();
    
    if (searchParams.company) {
      queryParams.append('company', searchParams.company);
    }
    
    if (searchParams.location) {
      queryParams.append('location', searchParams.location);
    }
    
    router.push(`/search-company/results?${queryParams.toString()}`);
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