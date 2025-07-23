"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CompanySkeleton = () => (
  <div className="border rounded-xl p-8 relative animate-pulse bg-white">
    <div className="absolute top-8 right-8 w-16 h-5 bg-gray-200 rounded"></div>
    <div className="w-20 h-20 bg-gray-200 rounded-lg mb-5"></div>
    <div className="h-7 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded-full w-1/3"></div>
  </div>
);

const RecommendedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchRecommendedCompanies = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch('https://68808ec2f1dcae717b627e5b.mockapi.io/companies');
        const data = await response.json();
        
        // Chỉ lấy 6 công ty đầu tiên có trạng thái active
        const recommendedCompanies = data
          .filter(company => company.status === true)
          .slice(0, 6);
        
        // Tạo hiệu ứng loading mượt mà bằng cách trì hoãn hiển thị dữ liệu
        setTimeout(() => {
          setCompanies(recommendedCompanies);
          setIsLoading(false);
          
          // Hiệu ứng fade-in sau khi dữ liệu được tải
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
        }, 800);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchRecommendedCompanies();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-3 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <CompanySkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Recommended Companies</h2>
          <p className="text-lg text-gray-600 mt-2">Based on your profile, company preferences, and recent activity</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600 flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Không thể tải dữ liệu: {error}</span>
        </div>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Recommended Companies</h2>
          <p className="text-lg text-gray-600 mt-2">Based on your profile, company preferences, and recent activity</p>
        </div>
        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-center text-gray-500 text-lg">No recommended companies available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Recommended Companies</h2>
        <p className="text-lg text-gray-600 mt-2">Based on your profile, company preferences, and recent activity</p>
      </div>
      
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {companies.map((company, index) => (
          <Link 
            key={company.company_id}
            href={`/search-company/results?company=${encodeURIComponent(company.name)}`}
            className="border rounded-xl p-8 relative transition-all duration-300 hover:shadow-lg hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer bg-white"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease forwards'
            }}
          >
            {/* Job count */}
            <div className="absolute top-8 right-8 text-indigo-600 font-medium text-base">
              {company.job_count} Jobs
            </div>
            
            {/* Logo & company name */}
            <div className="mb-5">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-5 overflow-hidden">
                <Image 
                  src={company.logo} 
                  alt={company.name} 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">{company.name}</h3>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6 line-clamp-3 text-base">
              {company.description}
            </p>
            
            {/* Category tag */}
            <div className="mt-auto">
              <span className="inline-block px-4 py-1.5 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-full transition-all hover:bg-orange-100">
                {company.industry}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RecommendedCompanies; 