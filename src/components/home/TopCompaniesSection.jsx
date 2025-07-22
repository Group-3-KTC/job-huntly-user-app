import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TopCompaniesSection = () => {
  const companies = [
    {
      name: "Google",
      location: "Mountain View, CA",
      featured: true,
      openPositions: 5,
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
    },
    {
      name: "Facebook",
      location: "Menlo Park, CA",
      featured: false,
      openPositions: 3,
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
    },
    {
      name: "Amazon",
      location: "Seattle, WA",
      featured: true,
      openPositions: 7,
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
    },
    {
      name: "Netflix",
      location: "Los Gatos, CA",
      featured: false,
      openPositions: 2,
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
    },
    {
      name: "Apple",
      location: "Cupertino, CA",
      featured: true,
      openPositions: 4,
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
    },
    {
      name: "Microsoft",
      location: "Redmond, WA",
      featured: false,
      openPositions: 6,
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Top companies
          </h2>
          <Link
            href="#"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border mr-3 flex items-center justify-center">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {company.name}
                    </h3>
                    {company.featured && (
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded inline-block mt-1">
                        Featured
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {company.location}
              </div>

              <Button className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                Open Positions ({company.openPositions})
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompaniesSection;
