import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ company, location });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2 bg-white rounded-lg shadow p-2">
        <div className="flex-1 flex items-center px-3 py-2 border rounded-md">
          <Search className="text-gray-400 mr-2 h-4 w-4" />
          <input
            type="text"
            placeholder="Company name or keyword"
            className="w-full outline-none text-gray-700"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        
        <div className="flex-1 flex items-center px-3 py-2 border rounded-md">
          <MapPin className="text-gray-400 mr-2 h-4 w-4" />
          <input
            type="text"
            placeholder="Florence, Italy"
            className="w-full outline-none text-gray-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 