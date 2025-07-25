"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ResultItem from '../components/ResultItem';
import useCompanySearchStore from '../store/companySearchStore';

// Danh sách quy mô công ty
const companySizes = [
  { id: '1-10', label: '1-10 nhân viên' },
  { id: '11-50', label: '11-50 nhân viên' },
  { id: '51-200', label: '51-200 nhân viên' },
  { id: '201-500', label: '201-500 nhân viên' },
  { id: '501+', label: '501+ nhân viên' },
];

const ITEMS_PER_PAGE = 8;

const ResultPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Lấy state và actions từ Zustand store
  const { 
    companies, 
    industries,
    filters, 
    searchTerm,
    isLoading, 
    error,
    fetchCompanies, 
    fetchIndustries,
    setFilters, 
    setSearchTerm,
    getFilteredCompanies,
    getFilterCounts
  } = useCompanySearchStore();

  const [currentPage, setCurrentPage] = useState(1);

  // Khởi tạo từ khóa tìm kiếm từ query parameters
  useEffect(() => {
    const company = searchParams.get('company') || '';
    const location = searchParams.get('location') || '';
    
    setSearchTerm({ company, location });
    
    // Lấy dữ liệu công ty và ngành nghề khi component được mount
    fetchCompanies();
    fetchIndustries();
  }, [searchParams]);

  // Lọc kết quả dựa trên từ khóa tìm kiếm và bộ lọc
  const filteredResults = getFilteredCompanies();
  const filterCounts = getFilterCounts();
  
  // Xử lý tìm kiếm
  const handleSearch = (searchParams) => {
    setSearchTerm(searchParams);
    
    const queryParams = new URLSearchParams();
    
    if (searchParams.company) {
      queryParams.append('company', searchParams.company);
    }
    
    if (searchParams.location) {
      queryParams.append('location', searchParams.location);
    }
    
    router.push(`/company/company-search/results?${queryParams.toString()}`);
  };

  // Logic phân trang
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} initialValues={searchTerm} />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            industries={industries} 
            companySizes={companySizes}
            filterCounts={filterCounts}
          />
        </div>
        
        <div className="lg:w-3/4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tất cả công ty
            </h2>
            <p className="text-gray-600">
              {isLoading ? 'Đang tải...' : `Hiển thị ${filteredResults.length} kết quả`}
              {searchTerm.company && ` cho "${searchTerm.company}"`}
              {searchTerm.location && searchTerm.company && ' tại '}
              {searchTerm.location && `${searchTerm.location}`}
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0A66C2]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Có lỗi xảy ra: {error}</p>
              <button 
                onClick={fetchCompanies} 
                className="px-4 py-2 bg-[#0A66C2] text-white rounded-md hover:bg-[#085aab]"
              >
                Thử lại
              </button>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Không tìm thấy công ty phù hợp với tiêu chí của bạn.</p>
              <p className="text-gray-600">Hãy điều chỉnh tìm kiếm hoặc bộ lọc của bạn.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedResults.map(company => (
                <ResultItem key={company.id} company={company} />
              ))}
              
              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === 1 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-label="Trang trước"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    // Hiển thị trang hiện tại và các trang xung quanh
                    let pageNum = currentPage;
                    if (pageNum <= 3) {
                      pageNum = i + 1;
                    } else if (pageNum >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = pageNum - 2 + i;
                    }
                    
                    // Nếu trang nằm ngoài phạm vi, không hiển thị
                    if (pageNum <= 0 || pageNum > totalPages) {
                      return null;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                          currentPage === pageNum
                            ? 'bg-[#0A66C2] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && <span className="px-2">...</span>}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="w-8 h-8 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === totalPages 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-label="Trang sau"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPageContent; 