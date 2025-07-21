"use client";
import {
  ChevronDown,
  Search,
  Bookmark,
  ListChecks,
  ClipboardCheck,
  Building,
  Star,
  Crown,
  TrendingUp,
  Eye,
  Headphones,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/images/logo-title-white.png";
import Link from "next/link";

export const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const jobsContent = (
    <div className="flex gap-8">
      <div className="flex-1">
        <div className="mb-6">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            VIỆC LÀM
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <Search className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Tìm việc làm</span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <Bookmark className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Việc làm đã lưu</span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <ListChecks className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Việc làm đã ứng tuyển</span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <ClipboardCheck className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Việc làm phù hợp</span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            CÔNG TY
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <Building className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Danh sách công ty</span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <Star className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Top công ty</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          VIỆC LÀM THEO VỊ TRÍ
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Việc làm IT",
            "Việc làm Marketing",
            "Việc làm Sales",
            "Việc làm Kế toán",
            "Việc làm Nhân sự",
            "Việc làm Tài chính",
            "Việc làm Kinh doanh",
            "Việc làm Logistics",
            "Việc làm IT",
            "Việc làm Marketing",
            "Việc làm Sales",
            "Việc làm Kế toán",
            "Việc làm Nhân sự",
            "Việc làm Tài chính",
            "Việc làm Kinh doanh",
            "Việc làm Logistics",
          ].map((job, index) => (
            <div
              key={index}
              className="text-sm p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              {job}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const cvContent = (
    <div>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
        Công cụ tạo CV
      </div>
      <div className="text-sm text-gray-600 mb-4">
        Tạo CV chuyên nghiệp trong vài phút
      </div>
      <div className="space-y-2">
        {[
          "Mẫu CV đẹp",
          "Tạo CV online",
          "CV theo ngành nghề",
          "Kiểm tra CV",
          "Dịch vụ viết CV",
          "CV Builder AI",
        ].map((item, index) => (
          <div
            key={index}
            className="text-sm p-2 hover:bg-gray-50 rounded cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  const toolsContent = (
    <div>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
        Công cụ hỗ trợ
      </div>
      <div className="space-y-2">
        {[
          "Tính lương Gross - Net",
          "Tính bảo hiểm thất nghiệp",
          "Tra cứu mã số thuế",
          "Tính thuế TNCN",
          "Quy đổi lương",
        ].map((item, index) => (
          <div
            key={index}
            className="text-sm p-2 hover:bg-gray-50 rounded cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  const guideContent = (
    <div>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
        Bài viết nổi bật
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
          <div>
            <div className="font-medium text-sm mb-1">
              5 mẹo viết CV gây ấn tượng
            </div>
            <div className="text-xs text-gray-600">
              Hướng dẫn chi tiết cách viết CV thu hút nhà tuyển dụng
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
          <div>
            <div className="font-medium text-sm mb-1">
              Cách tìm việc hiệu quả 2024
            </div>
            <div className="text-xs text-gray-600">
              Chiến lược tìm việc thành công trong thị trường việc làm hiện tại
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
        Xem tất cả bài viết
      </div>
    </div>
  );

  const premiumContent = (
    <div>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
        TopCV Pro
      </div>
      <div className="text-sm text-gray-600 mb-4">
        Nâng cấp tài khoản để sử dụng các tính năng cao cấp
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
          <Crown className="w-4 h-4 text-yellow-500" />
          <span className="text-sm">CV Pro Template</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm">Thống kê CV</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
          <Eye className="w-4 h-4 text-blue-500" />
          <span className="text-sm">Xem NTD đã xem CV</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm">Ưu tiên hiển thị</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
          <Headphones className="w-4 h-4 text-purple-500" />
          <span className="text-sm">Hỗ trợ ưu tiên</span>
        </div>
      </div>
    </div>
  );

  const dropdownContent = {
    jobs: jobsContent,
    cv: cvContent,
    tools: toolsContent,
    guide: guideContent,
    premium: premiumContent,
  };

  return (
    <header className="h-18 bg-[#0a66c2] relative">
      <div className="flex items-center h-full px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src={logo}
            alt="JobHuntly Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="flex justify-between w-full ml-8">
          {/* Left Navigation */}
          <div className="relative" onMouseLeave={handleMouseLeave}>
            <ul className="flex items-center space-x-1">
              {[
                { key: "jobs", label: "Việc làm" },
                { key: "cv", label: "Tạo CV" },
                { key: "tools", label: "Công cụ" },
                { key: "guide", label: "Cẩm nang nghề nghiệp" },
                { key: "premium", label: "TopCV" },
              ].map((item) => (
                <li key={item.key}>
                  <div
                    className="group flex items-center gap-1 text-white font-medium px-3 py-2 rounded-lg cursor-pointer hover:bg-[#d0e5f9] hover:text-[#0a66c2] transition-colors"
                    onMouseEnter={() => handleMouseEnter(item.key)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  </div>
                </li>
              ))}
            </ul>

            {/* Dropdown Menu */}
            {activeDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg min-w-[592px] p-5 z-50">
                <div className="absolute -top-3 left-0 w-full h-3"></div>
                {dropdownContent[activeDropdown]}
              </div>
            )}
          </div>

          {/* Right Navigation */}
          <ul className="flex items-center space-x-2">
            <li>
              <Link href="/register">
                <Button
                  variant="secondary"
                  className="bg-[#d6eaff] text-[#0a66c2] hover:bg-[#b6dbfb] font-semibold"
                >
                  Đăng ký
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 hover:text-white bg-transparent"
                >
                  Đăng nhập
                </Button>
              </Link>
            </li>
            <li>
              <Button className="bg-[#ff8a00] hover:bg-[#e67600] text-white">
                Đăng tuyển & tìm hồ sơ
              </Button>
            </li>
            <li className="flex items-center text-white/80 text-sm">
              <button className="px-2 py-1 rounded hover:bg-white/20 hover:text-white">
                EN
              </button>
              <span className="mx-1">|</span>
              <button className="px-2 py-1 rounded bg-white/20 text-white font-semibold">
                VI
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
