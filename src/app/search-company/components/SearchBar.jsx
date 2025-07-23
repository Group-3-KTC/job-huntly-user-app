"use client";

import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, initialValues = { company: '', location: '' } }) => {
  const [searchParams, setSearchParams] = useState({
    company: initialValues.company || '',
    location: initialValues.location || ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Cập nhật state khi initialValues thay đổi
  useEffect(() => {
    // Chỉ cập nhật khi giá trị thực sự khác với state hiện tại
    if (
      searchParams.company !== initialValues.company ||
      searchParams.location !== initialValues.location
    ) {
      setSearchParams({
        company: initialValues.company || '',
        location: initialValues.location || ''
      });
    }
  }, [initialValues.company, initialValues.location]);

  // Hiệu ứng fade-in khi component được render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Thêm hiệu ứng cho nút tìm kiếm
    setTimeout(() => {
      onSearch(searchParams);
      setIsSearching(false);
    }, 300);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`bg-white p-4 rounded-xl shadow-md transition-all duration-500 transform ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Tên công ty hoặc ngành nghề
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="company"
              name="company"
              value={searchParams.company}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all focus:shadow-inner"
              placeholder="Tên công ty hoặc ngành nghề..."
              autoComplete="off"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Địa điểm
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all focus:shadow-inner"
              placeholder="Địa điểm..."
              autoComplete="off"
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <button 
            type="submit" 
            disabled={isSearching}
            className={`relative w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-base rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 overflow-hidden ${
              isSearching ? 'cursor-wait' : ''
            }`}
          >
            <span className={`inline-block transition-opacity ${isSearching ? 'opacity-0' : 'opacity-100'}`}>
              Tìm kiếm
            </span>
            
            {isSearching && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar; 