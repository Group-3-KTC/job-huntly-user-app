import React from 'react';

const FilterSidebar = ({ filters, setFilters, industries = [], companySizes = [], filterCounts = { industry: {}, companySize: {} } }) => {
  const handleCompanySizeChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFilters(prev => ({
        ...prev,
        companySize: [...prev.companySize, value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        companySize: prev.companySize.filter(size => size !== value)
      }));
    }
  };

  const handleIndustryChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFilters(prev => ({
        ...prev,
        industry: [...prev.industry, value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        industry: prev.industry.filter(ind => ind !== value)
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Industry</h3>
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {industries.map(industry => (
            <label key={industry.cate_id} className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 mr-2"
                  value={industry.cate_name}
                  checked={filters.industry.includes(industry.cate_name)}
                  onChange={handleIndustryChange}
                />
                <span className="text-gray-700">{industry.cate_name}</span>
              </div>
              <span className="text-gray-500 text-sm">
                {filterCounts.industry[industry.cate_name] || 0}
              </span>
            </label>
          ))}
          
          {industries.length === 0 && (
            <>
              <label className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value="Fintech"
                    checked={filters.industry.includes('Fintech')}
                    onChange={handleIndustryChange}
                  />
                  <span className="text-gray-700">Fintech</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.industry['Fintech'] || 0}
                </span>
              </label>
              
              <label className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value="Blockchain"
                    checked={filters.industry.includes('Blockchain')}
                    onChange={handleIndustryChange}
                  />
                  <span className="text-gray-700">Blockchain</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.industry['Blockchain'] || 0}
                </span>
              </label>
              
              <label className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value="Technology"
                    checked={filters.industry.includes('Technology')}
                    onChange={handleIndustryChange}
                  />
                  <span className="text-gray-700">Technology</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.industry['Technology'] || 0}
                </span>
              </label>
            </>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Company Size</h3>
        
        <div className="space-y-2">
          {companySizes && companySizes.length > 0 ? (
            companySizes.map(size => (
              <label key={size.id} className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value={size.id}
                    checked={filters.companySize.includes(size.id)}
                    onChange={handleCompanySizeChange}
                  />
                  <span className="text-gray-700">{size.label}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.companySize[size.id] || 0}
                </span>
              </label>
            ))
          ) : (
            <>
              <label className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value="1-10"
                    checked={filters.companySize.includes('1-10')}
                    onChange={handleCompanySizeChange}
                  />
                  <span className="text-gray-700">1-10 employees</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.companySize['1-10'] || 0}
                </span>
              </label>
              
              <label className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value="11-50"
                    checked={filters.companySize.includes('11-50')}
                    onChange={handleCompanySizeChange}
                  />
                  <span className="text-gray-700">11-50 employees</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.companySize['11-50'] || 0}
                </span>
              </label>
              
              <label className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value="51-200"
                    checked={filters.companySize.includes('51-200')}
                    onChange={handleCompanySizeChange}
                  />
                  <span className="text-gray-700">51-200 employees</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.companySize['51-200'] || 0}
                </span>
              </label>
              
              <label className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value="201-500"
                    checked={filters.companySize.includes('201-500')}
                    onChange={handleCompanySizeChange}
                  />
                  <span className="text-gray-700">201-500 employees</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.companySize['201-500'] || 0}
                </span>
              </label>
              
              <label className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 mr-2"
                    value="501+"
                    checked={filters.companySize.includes('501+')}
                    onChange={handleCompanySizeChange}
                  />
                  <span className="text-gray-700">501+ employees</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {filterCounts.companySize['501+'] || 0}
                </span>
              </label>
            </>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Founding Year</h3>
        
        <div className="space-y-2">
          <label className="flex items-center">
            <input 
              type="radio"
              name="founding-year"
              className="rounded-full border-gray-300 text-blue-600 mr-2"
              value="any"
              checked={filters.foundingYear === 'any'}
              onChange={() => setFilters(prev => ({ ...prev, foundingYear: 'any' }))}
            />
            <span className="text-gray-700">Any year</span>
          </label>
          
          <label className="flex items-center">
            <input 
              type="radio"
              name="founding-year"
              className="rounded-full border-gray-300 text-blue-600 mr-2"
              value="last-5"
              checked={filters.foundingYear === 'last-5'}
              onChange={() => setFilters(prev => ({ ...prev, foundingYear: 'last-5' }))}
            />
            <span className="text-gray-700">Last 5 years</span>
          </label>
          
          <label className="flex items-center">
            <input 
              type="radio"
              name="founding-year"
              className="rounded-full border-gray-300 text-blue-600 mr-2"
              value="last-10"
              checked={filters.foundingYear === 'last-10'}
              onChange={() => setFilters(prev => ({ ...prev, foundingYear: 'last-10' }))}
            />
            <span className="text-gray-700">Last 10 years</span>
          </label>
          
          <label className="flex items-center">
            <input 
              type="radio"
              name="founding-year"
              className="rounded-full border-gray-300 text-blue-600 mr-2"
              value="before-2000"
              checked={filters.foundingYear === 'before-2000'}
              onChange={() => setFilters(prev => ({ ...prev, foundingYear: 'before-2000' }))}
            />
            <span className="text-gray-700">Before 2000</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;