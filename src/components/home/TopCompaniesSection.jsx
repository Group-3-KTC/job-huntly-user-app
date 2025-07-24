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
    <section className="py-16 ">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="mb-12 text-3xl font-bold text-gray-900">
            Top companies
          </h2>
          <Link
            href="#"
            className="flex items-center font-medium text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, index) => (
            <div
              key={index}
              className="p-6 transition-shadow bg-white rounded-lg hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-3 overflow-hidden bg-white border rounded-lg">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="object-contain w-full h-full"
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

              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {company.location}
              </div>

              <Button className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100">
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
