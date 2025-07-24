import React from "react";
import { Search, Send, Upload, UserPlus } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create account",
      description:
        "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    },
    {
      icon: Upload,
      title: "Upload CV/Resume",
      description:
        "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales",
    },
    {
      icon: Search,
      title: "Find suitable job",
      description: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
    },
    {
      icon: Send,
      title: "Apply job",
      description:
        "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales purus.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            How JobHuntly work
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-lg">
                  <step.icon
                    className={`h-8 w-8 ${index === 1 ? "text-white bg-blue-600 rounded-full p-1" : "text-blue-600"}`}
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute right-[-50px] top-8 w-24">
                    <svg
                      viewBox="0 0 100 20"
                      className="w-full h-4"
                      fill="none"
                    >
                      <path
                        d="M0 10 L90 10 M85 5 L90 10 L85 15"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
