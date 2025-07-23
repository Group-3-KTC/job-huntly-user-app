import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ResultItem from '../components/ResultItem';

// Static data
const sampleResults = [
  {
    id: '101',
    name: 'Stripe',
    logo: '/file.svg',
    location: 'San Francisco, CA',
    industry: 'Fintech',
    size: '5,000+',
    description: 'Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe\'s software tools to accept payments, expand globally, and manage their businesses online.',
    jobCount: 7
  },
  {
    id: '102',
    name: 'Truebill',
    logo: '/globe.svg',
    location: 'San Francisco, CA',
    industry: 'Fintech',
    size: '1,000+',
    description: 'Take control of your money. Truebill develops a mobile app that helps consumers take control of their financial life.',
    jobCount: 7
  },
  {
    id: '103',
    name: 'Square',
    logo: '/window.svg',
    location: 'San Francisco, CA',
    industry: 'Fintech',
    size: '5,000+',
    description: 'Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses.',
    jobCount: 7
  },
  {
    id: '104',
    name: 'Coinbase',
    logo: '/file.svg',
    location: 'San Francisco, CA',
    industry: 'Blockchain',
    size: '3,000+',
    description: 'Coinbase is the leading cryptocurrency platform where consumers can transact with new digital currencies.',
    jobCount: 7
  },
  {
    id: '105',
    name: 'Robinhood',
    logo: '/globe.svg',
    location: 'Menlo Park, CA',
    industry: 'Fintech',
    size: '2,000+',
    description: 'Robinhood is lowering barriers, removing fees, and providing greater access to financial information.',
    jobCount: 7
  },
  {
    id: '106',
    name: 'Kraken',
    logo: '/window.svg',
    location: 'San Francisco, CA',
    industry: 'Blockchain',
    size: '2,000+',
    description: 'Based in San Francisco, Kraken is the world\'s largest global bitcoin exchange in euro volume and liquidity.',
    jobCount: 7
  },
  {
    id: '107',
    name: 'Revolut',
    logo: '/file.svg',
    location: 'London, UK',
    industry: 'Fintech',
    size: '3,000+',
    description: 'When Revolut was founded in 2015, we had a vision to build a sustainable, digital alternative to traditional big banks.',
    jobCount: 7
  },
  {
    id: '108',
    name: 'Divvy',
    logo: '/globe.svg',
    location: 'Salt Lake City, UT',
    industry: 'Fintech',
    size: '1,000+',
    description: 'Divvy is a secure financial platform for businesses to manage payments and subscriptions.',
    jobCount: 7
  },
  {
    id: '109',
    name: 'Chime',
    logo: '/file.svg',
    location: 'San Francisco, CA',
    industry: 'Fintech',
    size: '2,000+',
    description: 'Chime is a financial technology company founded on the premise that basic banking services should be helpful, easy, and free.',
    jobCount: 5
  },
  {
    id: '110',
    name: 'Binance',
    logo: '/globe.svg',
    location: 'Global',
    industry: 'Blockchain',
    size: '3,000+',
    description: 'Binance is the world\'s leading blockchain and cryptocurrency infrastructure provider with a suite of financial products.',
    jobCount: 9
  },
  {
    id: '111',
    name: 'Affirm',
    logo: '/window.svg',
    location: 'San Francisco, CA',
    industry: 'Fintech',
    size: '1,500+',
    description: 'Affirm offers a buy now, pay later service that allows customers to pay for purchases over time without deferred interest, hidden fees, or penalties.',
    jobCount: 6
  },
  {
    id: '112',
    name: 'Plaid',
    logo: '/file.svg',
    location: 'San Francisco, CA',
    industry: 'Fintech',
    size: '1,000+',
    description: 'Plaid is a financial services company that enables applications to connect with users\' bank accounts.',
    jobCount: 8
  }
];

const industries = [
  { cate_id: 1, cate_name: 'Advertising' },
  { cate_id: 2, cate_name: 'Business Service' },
  { cate_id: 3, cate_name: 'Blockchain' },
  { cate_id: 4, cate_name: 'Cloud' },
  { cate_id: 5, cate_name: 'Consumer Tech' },
  { cate_id: 6, cate_name: 'Education' },
  { cate_id: 7, cate_name: 'Fintech' },
  { cate_id: 8, cate_name: 'Gaming' },
  { cate_id: 9, cate_name: 'Food & Beverage' },
  { cate_id: 10, cate_name: 'Healthcare' },
  { cate_id: 11, cate_name: 'Recruiting' },
  { cate_id: 12, cate_name: 'Media' }
];

const companySizes = [
  { id: '1-10', label: '1-10 employees' },
  { id: '11-50', label: '11-50 employees' },
  { id: '51-200', label: '51-200 employees' },
  { id: '201-500', label: '201-500 employees' },
  { id: '501+', label: '501+ employees' },
];

const ITEMS_PER_PAGE = 8;

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState({
    company: searchParams.get('company') || '',
    location: searchParams.get('location') || ''
  });
  
  const [filters, setFilters] = useState({
    companySize: [],
    industry: [],
    foundingYear: 'any'
  });
  
  const [results, setResults] = useState(sampleResults);
  const [filteredResults, setFilteredResults] = useState(sampleResults);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter results based on search and filters
  useEffect(() => {
    let filtered = [...sampleResults];
    
    // Filter by company name or industry
    if (searchTerm.company) {
      const keyword = searchTerm.company.toLowerCase();
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(keyword) || 
        company.industry.toLowerCase().includes(keyword)
      );
    }
    
    // Filter by location
    if (searchTerm.location) {
      const locationKeyword = searchTerm.location.toLowerCase();
      filtered = filtered.filter(company => 
        company.location.toLowerCase().includes(locationKeyword)
      );
    }
    
    // Filter by industry
    if (filters.industry.length > 0) {
      filtered = filtered.filter(company => 
        filters.industry.includes(company.industry)
      );
    }
    
    // Filter by company size
    if (filters.companySize.length > 0) {
      filtered = filtered.filter(company => {
        if (filters.companySize.includes('1-10') && company.size.includes('10')) {
          return true;
        }
        if (filters.companySize.includes('11-50') && 
            (company.size.includes('50'))) {
          return true;
        }
        if (filters.companySize.includes('51-200') && 
            (company.size.includes('100') || company.size.includes('200'))) {
          return true;
        }
        if (filters.companySize.includes('201-500') && 
            (company.size.includes('300') || company.size.includes('500'))) {
          return true;
        }
        if (filters.companySize.includes('501+') && 
            (company.size.includes('1,000') || company.size.includes('2,000') ||
             company.size.includes('3,000') || company.size.includes('5,000'))) {
          return true;
        }
        return false;
      });
    }
    
    setFilteredResults(filtered);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, filters]);
  
  // Calculate filter counts
  const filterCounts = useMemo(() => {
    // Count companies by industry
    const industryCounts = {};
    industries.forEach(industry => {
      industryCounts[industry.cate_name] = sampleResults.filter(
        company => company.industry === industry.cate_name
      ).length;
    });

    // Add special case for example industries in default filter list
    if (!industryCounts['Fintech']) {
      industryCounts['Fintech'] = sampleResults.filter(c => c.industry === 'Fintech').length;
    }
    if (!industryCounts['Blockchain']) {
      industryCounts['Blockchain'] = sampleResults.filter(c => c.industry === 'Blockchain').length;
    }
    if (!industryCounts['Technology']) {
      industryCounts['Technology'] = sampleResults.filter(c => c.industry === 'Technology').length;
    }
    
    // Count companies by size
    const sizeCounts = {
      '1-10': sampleResults.filter(c => c.size.includes('10')).length,
      '11-50': sampleResults.filter(c => c.size.includes('50')).length,
      '51-200': sampleResults.filter(c => c.size.includes('100') || c.size.includes('200')).length,
      '201-500': sampleResults.filter(c => c.size.includes('300') || c.size.includes('500')).length,
      '501+': sampleResults.filter(c => 
        c.size.includes('1,000') || c.size.includes('2,000') ||
        c.size.includes('3,000') || c.size.includes('5,000')
      ).length
    };
    
    return {
      industry: industryCounts,
      companySize: sizeCounts
    };
  }, []);
  
  const handleSearch = (searchParams) => {
    setSearchTerm(searchParams);
    
    const queryParams = new URLSearchParams();
    
    if (searchParams.company) {
      queryParams.append('company', searchParams.company);
    }
    
    if (searchParams.location) {
      queryParams.append('location', searchParams.location);
    }
    
    router.push(`/search-company/results?${queryParams.toString()}`);
  };

  // Pagination logic
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
        <SearchBar onSearch={handleSearch} />
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
              All Jobs
            </h2>
            <p className="text-gray-600">
              Showing {filteredResults.length} results
              {searchTerm.company && ` for "${searchTerm.company}"`}
              {searchTerm.location && searchTerm.company && ' in '}
              {searchTerm.location && `${searchTerm.location}`}
            </p>
          </div>
          
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No companies found matching your criteria.</p>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedResults.map(company => (
                <ResultItem key={company.id} company={company} />
              ))}
              
              {/* Pagination */}
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
                    aria-label="Previous page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    // Display current page and surrounding pages
                    let pageNum = currentPage;
                    if (pageNum <= 3) {
                      pageNum = i + 1;
                    } else if (pageNum >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = pageNum - 2 + i;
                    }
                    
                    // If page is out of range, don't render
                    if (pageNum <= 0 || pageNum > totalPages) {
                      return null;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
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
                    aria-label="Next page"
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

export default ResultPage;
