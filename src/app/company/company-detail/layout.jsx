import React from 'react';

export const metadata = {
  title: 'Chi tiết công ty | JobHuntly',
  description: 'Thông tin chi tiết về công ty và cơ hội việc làm',
};

export default function CompanyDetailLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 