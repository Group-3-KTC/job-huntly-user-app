import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import illustration from "@/assets/images/home-illustration.png";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import ProvinceCombobox from "@/components/home/ProvinceCombobox";

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Find a job that suits your interest & skills.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
              in scelerisque leo, eget sollicitudin velit bestibulum.
            </p>

            {/* Search Form */}
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col sm:flex-row gap-2 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Job title, Keyword..."
                  className="pl-10 border-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <div className="pl-10">
                  <ProvinceCombobox />
                </div>
                {/*<Input*/}
                {/*  placeholder="Your Location"*/}
                {/*  className="pl-10 border-0 focus-visible:ring-0"*/}
                {/*/>*/}
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                Find Job
              </Button>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-600">Suggestion:</span>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Designer,
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Programming,
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-700">
                Digital Marketing,
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Video,
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Animation
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Image
                src={illustration}
                alt="Job Search Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
