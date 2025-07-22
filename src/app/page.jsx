import React from "react";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import VacanciesSection from "@/components/home/VacanciesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <VacanciesSection />
      <HowItWorksSection />
      <FeaturedJobsSection />
    </div>
  );
}
