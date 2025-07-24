"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import useCompanyDetailStore from '../store/companyDetailStore';

const CompanyJobs = () => {
  const { company, jobs } = useCompanyDetailStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  
  if (!company) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="px-4 py-2 text-lg font-semibold text-white rounded bg-[#0A66C2]">Tuyển dụng</h2>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        <input 
          type="text" 
          placeholder="Tên công ty, vị trí ứng tuyển..."
          className="w-full h-10 px-4 border border-gray-300 rounded focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="w-full h-10 px-4 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Tất cả tỉnh/thành phố</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
        </select>
        <button className="w-full h-10 text-white rounded bg-[#0A66C2] hover:bg-[#085aab]">Tìm kiếm</button>
      </div>
      
      <div className="mt-8 space-y-4">
        {jobs.length === 0 ? (
          <div className="p-4 text-center text-gray-500 border border-gray-200 rounded-lg">
            Hiện chưa có tin tuyển dụng nào từ công ty này
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="flex flex-col items-start gap-4 p-4 border rounded-lg border-[#D0E5F9] md:flex-row md:items-center">
              <Image
                src={company.logo || "/logo_example.png"}
                alt={company.name}
                width={64}
                height={64}
                className="object-contain w-16 h-16"
              />
              <div className="flex-1 space-y-1">
                <h3 className="text-base font-semibold truncate text-[#1F2937]">
                  {job.title}
                  <span className="ml-1 text-[#1F2937]">✔</span>
                </h3>
                <p className="text-sm font-semibold text-[#FF8A00]">{company.name.toUpperCase()}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#1F2937]">
                  <span className="px-2 py-1 rounded bg-[#F5F7FA]">{job.location}</span>
                  <span className="px-2 py-1 rounded bg-[#F5F7FA]">
                    Còn {job.remaining_days} ngày để ứng tuyển
                  </span>
                </div>
              </div>
              <div className="w-full space-y-2 text-right md:w-auto">
                <div className="text-sm font-medium text-[#0A66C2]">{job.salary}</div>
                <button className="px-4 py-1 text-sm text-white rounded bg-[#0A66C2] hover:bg-[#085aab]">
                  Ứng tuyển
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyJobs; 