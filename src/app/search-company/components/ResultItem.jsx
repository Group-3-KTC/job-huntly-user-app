import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Briefcase } from 'lucide-react';

const ResultItem = ({ company }) => {
  // Đảm bảo company có dữ liệu
  if (!company) return null;

  // Đảm bảo đường dẫn logo được xử lý đúng
  const logoSrc = company.logo?.startsWith('/public/') 
    ? company.logo.replace('/public/', '/') 
    : company.logo || '/file.svg';

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 mb-4">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-16 h-16 bg-blue-50 rounded-md flex items-center justify-center mr-6 mb-4 md:mb-0">
          <Image 
            src={logoSrc}
            alt={`${company.name} logo`} 
            width={40} 
            height={40}
            className="object-contain"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{company.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{company.location || 'United States'}</span>
              </div>
            </div>
            
            <div className="mt-2 md:mt-0">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {company.industry || 'Technology'}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            {company.description ? (
              company.description.length > 150 
                ? `${company.description.substring(0, 150)}...` 
                : company.description
            ) : 'Company information is being updated'}
          </p>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{company.size || company.quantity_employee || '100+'} employees</span>
              </div>
              
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                <span>{company.jobCount || company.job_count || 0} open positions</span>
              </div>
            </div>
            
            <Link 
              href={`/company/${company.id || company.company_id}`}
              className="mt-3 md:mt-0 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem; 