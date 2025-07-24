"use client";

import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, initialValues = { company: '', location: '' } }) => {
  const [searchParams, setSearchParams] = useState({
    company: initialValues.company || '',
    location: initialValues.location || ''
  });
  
  // Cập nhật state khi initialValues thay đổi
  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md">
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
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tên công ty hoặc ngành nghề..."
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
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Địa điểm..."
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <button 
            type="submit" 
            className="w-full md:w-auto px-6 py-2.5 bg-[#0A66C2] text-white font-medium text-base rounded-lg hover:bg-[#085aab]"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar; 