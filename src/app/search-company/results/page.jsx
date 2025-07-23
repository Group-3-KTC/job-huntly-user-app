"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Import động trang kết quả để tránh lỗi liên quan đến useRouter và useSearchParams
const ResultPage = dynamic(() => import('../pages/resultPage'), {
  ssr: false,
});

const SearchResultsPage = () => {
  return <ResultPage />;
};

export default SearchResultsPage; 