"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Import động để xử lý client-side navigation
const ResultPageClient = dynamic(() => import('../pages/resultPage'), {
  ssr: false,
});

export default function SearchCompanyResultsPage() {
  return <ResultPageClient />;
} 