import React from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, MapPin } from "lucide-react";

const FeaturedJobsSection = () => {
  const jobs = [
    {
      title: "Technical Support Specialist",
      type: "PART-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-green-100 text-green-800",
    },
    {
      title: "Senior UX Designer",
      type: "FULL-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-blue-100 text-blue-800",
    },
    {
      title: "Marketing Officer",
      type: "INTERNSHIP",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Junior Graphic Designer",
      type: "INTERNSHIP",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Interaction Designer",
      type: "PART-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-green-100 text-green-800",
    },
    {
      title: "Project Manager",
      type: "FULL-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-blue-100 text-blue-800",
    },
    {
      title: "Software Engineer",
      type: "FULL-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-blue-100 text-blue-800",
    },
    {
      title: "Visual Designer",
      type: "FULL-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-blue-100 text-blue-800",
    },
    {
      title: "Project Manager",
      type: "FULL-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-blue-100 text-blue-800",
    },
    {
      title: "Front End Developer",
      type: "PART-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-green-100 text-green-800",
    },
    {
      title: "Senior UX Designer",
      type: "FULL-TIME",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-blue-100 text-blue-800",
    },
    {
      title: "Marketing Manager",
      type: "INTERNSHIP",
      salary: "$20,000 - $25,000",
      company: "Google Inc.",
      logo: "https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo.png",
      location: "Dhaka, Bangladesh",
      typeColor: "bg-yellow-100 text-yellow-800",
    },
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured job</h2>
          <Link
            href="#"
            className="flex items-center font-medium text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <section
                    className={`${job.typeColor} inline-block px-2 py-1 rounded-full text-xs font-semibold`}
                  >
                    {job.type}
                  </section>
                  <p className="mt-1 text-sm text-gray-600">
                    Salary: {job.salary}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 overflow-hidden bg-white rounded-full shadow-sm">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{job.company}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
