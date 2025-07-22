import ProfileSidebarRight from "../components/ProfileSidebarRight";
import SectionCard from "../components/SectionCard";
import { Mail, Gift, MapPin, Phone, User, Link, Edit } from "lucide-react";

export default function ProfilePage() {
  const profileSections = [
    {
      title: "About Me",
      description: "Introduce your strengths and years of experience",
      imageSrc: "", // Link ảnh sẽ được thêm sau
      imageAlt: "About Me",
    },
    {
      title: "Education",
      description: "Share your background education",
      imageSrc: "", // Link ảnh sẽ được thêm sau
      imageAlt: "Education",
    },
    {
      title: "Work Experience",
      description: "Highlight detailed information about your job history",
      imageSrc: "", // Link ảnh sẽ được thêm sau
      imageAlt: "Work Experience",
    },
    {
      title: "Skills",
      description: "Showcase your skills and proficiencies",
      imageSrc: "", // Link ảnh sẽ được thêm sau
      imageAlt: "Skills",
    },
    {
      title: "Foreign Language",
      description: "Provide your language skills and proficiencies",
      imageSrc: "", // Link ảnh sẽ được thêm sau
      imageAlt: "Foreign Language",
    },
    {
      title: "Highlight Project",
      description: "Showcase your highlight project",
      imageSrc: "", // Link ảnh sẽ được thêm sau
      imageAlt: "Highlight Project",
    },
    {
      title: "Certificates",
      description: "Provides evidence of your specific expertise and skills",
      imageSrc: "", // Link ảnh sẽ được thêm sau
      imageAlt: "Certificates",
    },
    {
      title: "Awards",
      description: "Highlight your awards or recognitions",
      imageSrc: "", // Link ảnh sẽ được thêm sau
      imageAlt: "Awards",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen gap-6 px-4 py-6 lg:flex-row lg:items-start md:px-6 lg:px-10">
      {/* LEFT CONTENT */}
      <div className="flex-1 w-full max-w-full lg:max-w-4xl">
        <div className="p-6 mb-6 bg-white shadow-md rounded-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-black">Hoang Phuc Vo</h1>
                <p className="mt-2 font-semibold text-gray-600 text-md">
                  Update your title
                </p>
              </div>
            </div>
            <button className="p-2 transition-colors rounded-lg hover:bg-gray-50">
              <Edit size={20} className="text-[var(--color-primary-main)]" />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mt-6 text-lg text-gray-700 md:gap-0">
            <div className="w-full space-y-2 sm:w-1/2">
              <p className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-500" />
                phuc111239@gmail.com
              </p>
              <p className="flex items-center">
                <Gift size={18} className="mr-2 text-gray-500" />
                Your date of birth
              </p>
              <p className="flex items-center">
                <MapPin size={18} className="mr-2 text-gray-500" />
                Your current address
              </p>
            </div>
            <div className="w-full space-y-2 sm:w-1/2">
              <p className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-500" />
                Your phone number
              </p>
              <p className="flex items-center">
                <User size={18} className="mr-2 text-gray-500" />
                Your gender
              </p>
              <p className="flex items-center">
                <Link size={18} className="mr-2 text-gray-500" />
                Your personal link (Portfolio)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {profileSections.map((section, index) => (
            <SectionCard
              key={index}
              title={section.title}
              description={section.description}
              imageSrc={section.imageSrc}
              imageAlt={section.imageAlt}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <ProfileSidebarRight />
    </div>
  );
}