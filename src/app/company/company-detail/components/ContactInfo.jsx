"use client";

import React from 'react';
import useCompanyDetailStore from '../store/companyDetailStore';

const ContactInfo = () => {
  const { company } = useCompanyDetailStore();
  
  if (!company) return null;

  // Tạo địa chỉ cho Google Maps
  const mapAddress = encodeURIComponent(company.address || 'Việt Nam');

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="px-4 py-2 text-lg font-semibold text-white rounded bg-[#0A66C2]">Thông tin liên hệ</h2>
      <p className="mt-4 text-sm">
        <strong>Địa chỉ:</strong> {company.address || 'Chưa cập nhật'}
        <br /><br />
        <strong>Xem bản đồ</strong>
      </p>
      <iframe 
        width="100%" 
        height="250" 
        style={{ border: 0, marginTop: '8px' }}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCVgO8KzHQ8iKcfqXgrMnUIGlD-piWiPpo&q=${mapAddress}&zoom=15&language=vi`}
        allowFullScreen
        title="Google Maps"
      />
    </div>
  );
};

export default ContactInfo; 