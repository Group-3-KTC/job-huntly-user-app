"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Import động trang tìm kiếm để tránh lỗi liên quan đến useRouter
const SearchCompanyPage = dynamic(() => import('./pages/searchPage'), {
  ssr: false,
});

const SearchCompany = () => {
  return <SearchCompanyPage />;
};

export default SearchCompany; 