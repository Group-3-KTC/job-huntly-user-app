"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import useCompanyDetailStore from '../store/companyDetailStore';

const ShareCompany = () => {
  const { company } = useCompanyDetailStore();
  const [copied, setCopied] = useState(false);
  
  if (!company) return null;

  const companyUrl = typeof window !== 'undefined' ? 
    `${window.location.origin}/company/company-detail/${company.id}` : 
    '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(companyUrl);
    setCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="px-4 py-2 text-lg font-semibold text-white rounded bg-[#0A66C2]">Chia sẻ công ty với bạn bè</h2>
      <p className="mt-4 text-sm font-medium">Sao chép đường dẫn</p>
      
      <div 
        onClick={handleCopyLink}
        className="relative p-4 overflow-hidden border rounded-lg cursor-pointer w-full border-[#0A66C2]"
      >
        <h3 className="text-sm font-semibold truncate whitespace-nowrap overflow-hidden text-[#1F2937]">
          {companyUrl}
        </h3>
        
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-green-600 bg-opacity-90">
            Đã sao chép!
          </div>
        )}
      </div>
      
      <p className="mt-4 text-sm font-medium">Chia sẻ qua mạng xã hội</p>
      <div className="flex gap-3 mt-2">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(companyUrl)}`} target="_blank" rel="noopener noreferrer">
          <Image 
            src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/share/facebook.png" 
            alt="Facebook" 
            width={32} 
            height={32} 
          />
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(companyUrl)}`} target="_blank" rel="noopener noreferrer">
          <Image 
            src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/share/twitter.png" 
            alt="Twitter" 
            width={32} 
            height={32} 
          />
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(companyUrl)}`} target="_blank" rel="noopener noreferrer">
          <Image 
            src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/share/linked.png" 
            alt="LinkedIn" 
            width={32} 
            height={32} 
          />
        </a>
      </div>
    </div>
  );
};

export default ShareCompany; 