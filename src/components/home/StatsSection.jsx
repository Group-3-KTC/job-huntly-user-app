import React from "react";
import { Briefcase, Building, PlusCircle, Users } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Briefcase,
      number: "1,75,324",
      label: "Live Job",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Building,
      number: "97,354",
      label: "Companies",
      bgColor: "bg-blue-100", // Giảm độ đậm, cùng tone với các block khác
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      number: "38,47,154",
      label: "Candidates",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: PlusCircle,
      number: "7,532",
      label: "New Jobs",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} p-6 rounded-lg text-center`}
            >
              <div className="flex justify-center mb-4">
                <stat.icon className={`h-12 w-12 ${stat.iconColor}`} />
              </div>
              <div
                className={`text-2xl font-bold mb-2 ${stat.textColor || "text-gray-900"}`}
              >
                {stat.number}
              </div>
              <div className={`text-sm ${stat.textColor || "text-gray-600"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
