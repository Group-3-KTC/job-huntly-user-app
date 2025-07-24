import React from "react";

const VacanciesSection = () => {
  const vacancies = [
    { title: "Anesthesiologists", positions: "45,904 Open Positions" },
    { title: "Surgeons", positions: "50,364 Open Positions" },
    { title: "Obstetricians-Gynecologists", positions: "4,339 Open Positions" },
    { title: "Orthodontists", positions: "20,079 Open Positions" },
    { title: "Maxillofacial Surgeons", positions: "74,875 Open Positions" },
    { title: "Software Developer", positions: "43359 Open Positions" },
    { title: "Psychiatrists", positions: "18,599 Open Positions" },
    { title: "Data Scientist", positions: "28,200 Open Positions" },
    { title: "Financial Manager", positions: "61,391 Open Positions" },
    { title: "Management Analysis", positions: "93,046 Open Positions" },
    { title: "IT Manager", positions: "50,963 Open Positions" },
    {
      title: "Operations Research Analysis",
      positions: "16,627 Open Positions",
    },
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-gray-900">
          Most Popular Vacancies
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vacancies.map((vacancy, index) => (
            <div
              key={index}
              className="p-4 transition-colors bg-white rounded-lg cursor-pointer group hover:bg-blue-600"
            >
              <h3 className={`font-semibold mb-2 group-hover:text-white`}>
                {vacancy.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-white">
                {vacancy.positions}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VacanciesSection;
