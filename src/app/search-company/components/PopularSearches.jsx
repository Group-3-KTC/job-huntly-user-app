import React from 'react';
import Link from 'next/link';

const PopularSearches = ({ companies = [] }) => {
  // Kiểm tra nếu không có dữ liệu công ty phổ biến
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-2">
        Popular: {" "}
        {companies.map((company, index) => (
          <React.Fragment key={company.id || company.company_id || index}>
            <Link 
              href={`/search-company/results?company=${company.name}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {company.name}
            </Link>
            {index < companies.length - 1 && ", "}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default PopularSearches; 