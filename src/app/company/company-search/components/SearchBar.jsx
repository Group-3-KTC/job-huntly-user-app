"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building } from 'lucide-react';
import useCompanySearchStore from '../store/companySearchStore';

const SearchBar = ({ onSearch, initialValues = { company: '', location: '' } }) => {
  const { locations, fetchLocations } = useCompanySearchStore();
  const [searchParams, setSearchParams] = useState({
    company: initialValues.company || '',
    location: initialValues.location || ''
  });
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const locationRef = useRef(null);
  const companyRef = useRef(null);
  
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

  // Tải danh sách vị trí khi component được mount
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Xử lý click ra ngoài để đóng các suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
      if (companyRef.current && !companyRef.current.contains(event.target)) {
        setShowCompanySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
    
    if (name === 'location') {
      // Lọc danh sách vị trí dựa trên giá trị đã nhập
      const filtered = locations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowLocationSuggestions(value.length > 0);
    } else if (name === 'company') {
      setShowCompanySuggestions(value.length > 0);
    }
  };

  const handleLocationSelect = (location) => {
    setSearchParams(prev => ({ ...prev, location }));
    setShowLocationSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1" ref={companyRef}>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Tên công ty hoặc ngành nghề
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Building className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="company"
              name="company"
              value={searchParams.company}
              onChange={handleChange}
              onFocus={() => searchParams.company && setShowCompanySuggestions(true)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tên công ty hoặc ngành nghề..."
            />
          </div>
        </div>
        
        <div className="flex-1" ref={locationRef}>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Địa điểm
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              onFocus={() => searchParams.location && setShowLocationSuggestions(true)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Địa điểm..."
            />
            
            {showLocationSuggestions && filteredLocations.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredLocations.map((location, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{location}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-end">
          <button 
            type="submit" 
            className="w-full md:w-auto px-6 py-2.5 bg-[#0A66C2] text-white font-medium text-base rounded-lg hover:bg-[#085aab] flex items-center justify-center"
          >
            <Search className="w-5 h-5 mr-2" />
            Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar; 