"use client";

import React from 'react';
import Link from 'next/link';

const popularIndustries = [
  { name: 'Information Technology', slug: 'information-technology' },
  { name: 'Healthcare', slug: 'healthcare' },
  { name: 'Finance', slug: 'finance' },
  { name: 'Education', slug: 'education' },
  { name: 'Manufacturing', slug: 'manufacturing' },
  { name: 'Retail', slug: 'retail' },
  { name: 'Construction', slug: 'construction' },
  { name: 'Transportation & Logistics', slug: 'transportation-logistics' }
];

const popularLocations = [
  { name: 'USA', slug: 'usa' },
  { name: 'UK', slug: 'uk' },
  { name: 'Australia', slug: 'australia' },
  { name: 'Germany', slug: 'germany' },
  { name: 'Japan', slug: 'japan' },
  { name: 'Spain', slug: 'spain' }
];

const PopularSearches = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tìm kiếm phổ biến</h2>
      
      <div className="space-y-6">
        {/* Ngành nghề phổ biến */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Ngành nghề</h3>
          <div className="flex flex-wrap gap-2">
            {popularIndustries.map(industry => (
              <Link 
                key={industry.slug}
                href={`/search-company/results?industry=${encodeURIComponent(industry.name)}`}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm transition-colors"
              >
                {industry.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Địa điểm phổ biến */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Địa điểm</h3>
          <div className="flex flex-wrap gap-2">
            {popularLocations.map(location => (
              <Link
                key={location.slug}
                href={`/search-company/results?location=${encodeURIComponent(location.name)}`}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full text-sm transition-colors"
              >
                {location.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSearches; 