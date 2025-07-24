import React from "react";
import {
  ArrowRight,
  Calculator,
  Code,
  Database,
  Heart,
  Megaphone,
  Music,
  Palette,
  Video,
} from "lucide-react";
import Link from "next/link";

const CategoriesSection = () => {
  const categories = [
    {
      icon: Palette,
      title: "Graphics & Design",
      positions: "357 Open position",
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      icon: Code,
      title: "Code & Programming",
      positions: "312 Open position",
      bgColor: "bg-slate-200",
      iconColor: "text-slate-600",
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      positions: "297 Open position",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      icon: Video,
      title: "Video & Animation",
      positions: "247 Open position",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Music,
      title: "Music & Audio",
      positions: "204 Open position",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      icon: Calculator,
      title: "Account & Finance",
      positions: "167 Open position",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: Heart,
      title: "Health & Care",
      positions: "125 Open position",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      icon: Database,
      title: "Data & Science",
      positions: "57 Open position",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Popular category</h2>
          <Link
            href="#"
            className="flex items-center font-medium text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} p-6 rounded-lg hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="flex items-center mb-4">
                <category.icon
                  className={`h-8 w-8 ${category.iconColor} mr-3`}
                />
                <div>
                  <h3 className={`font-semibold ${category.textColor}`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm ${category.textColor}`}>
                    {category.positions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
