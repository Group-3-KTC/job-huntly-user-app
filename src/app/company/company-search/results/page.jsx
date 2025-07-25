"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Import động không cần ssr: false trong Client Component
const ResultPageContent = dynamic(() => import('../pages/ResultPageContent'));

export default function SearchResultsPage() {
  return <ResultPageContent />;
} 