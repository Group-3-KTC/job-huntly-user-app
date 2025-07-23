import React from 'react';
import CompanyCard from './CompanyCard';

const RecommendedCompanies = ({ companies = [] }) => {
  // Kiểm tra nếu không có dữ liệu công ty
  if (!companies || companies.length === 0) {
    return (
      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recommended Companies</h2>
          <p className="text-gray-600 mt-1">Based on your profile, company preferences, and recent activity</p>
        </div>
        <p className="text-center text-gray-500">No recommended companies available</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recommended Companies</h2>
        <p className="text-gray-600 mt-1">Based on your profile, company preferences, and recent activity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(company => (
          <CompanyCard key={company.id || company.company_id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedCompanies; 