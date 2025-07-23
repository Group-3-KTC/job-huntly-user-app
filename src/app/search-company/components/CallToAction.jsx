"use client";

import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="bg-blue-600 text-white rounded-2xl overflow-hidden">
      <div className="px-8 py-12 md:py-16 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bạn là một nhà tuyển dụng?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Đăng ký miễn phí để quảng cáo công ty của bạn và tiếp cận với hàng ngàn ứng viên tiềm năng!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recruiters/createjob"
              className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-300"
            >
              Đăng tin tuyển dụng
            </Link>
            <Link
              href="/recruiters/paymoney"
              className="px-8 py-3 bg-blue-700 text-white hover:bg-blue-800 font-medium rounded-lg transition-colors border border-blue-500 focus:ring-4 focus:ring-blue-300"
            >
              Xem các gói dịch vụ
            </Link>
          </div>
        </div>
      </div>
      
      {/* Pattern decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>
    </section>
  );
};

export default CallToAction; 