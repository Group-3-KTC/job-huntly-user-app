// "use client";
// import { profileSectionData } from "@/mock/userProfile";
// import ProfileSidebarRight from "../components/ProfileSidebarRight";
// import SectionCard from "../components/SectionCard";
// import { Edit, Mail, Gift, MapPin, Phone, User, Link } from "lucide-react";

// export default function ProfilePage() {

  
//   const handleAction = (action, title) => {
//     alert(`${action} ${title}`);
//   };

//   return (
//     <div className="flex flex-col w-full gap-6 lg:flex-row lg:items-start">
//       <div className="flex-1 w-full xl:max-w-[78%]">
//         <div className="p-6 mb-6 bg-white shadow-md rounded-xl">
//           <div className="flex flex-wrap items-start justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-black">Hoang Phuc Vo</h1>
//                 <p className="mt-2 font-semibold text-gray-600 text-md">
//                   Update your title
//                 </p>
//               </div>
//             </div>
//             <button className="p-2 transition-colors rounded-lg hover:bg-gray-50">
//               <Edit size={20} className="text-blue-800" />
//             </button>
//           </div>

//           <div className="flex flex-wrap gap-4 mt-6 text-lg text-gray-700 md:gap-0">
//             <div className="w-full space-y-2 sm:w-1/2">
//               <p className="flex items-center">
//                 <Mail size={18} className="mr-2 text-gray-500" />
//                 phuc111239@gmail.com
//               </p>
//               <p className="flex items-center">
//                 <Gift size={18} className="mr-2 text-gray-500" />
//                 Your date of birth
//               </p>
//               <p className="flex items-center">
//                 <MapPin size={18} className="mr-2 text-gray-500" />
//                 Your current address
//               </p>
//             </div>
//             <div className="w-full space-y-2 sm:w-1/2">
//               <p className="flex items-center">
//                 <Phone size={18} className="mr-2 text-gray-500" />
//                 Your phone number
//               </p>
//               <p className="flex items-center">
//                 <User size={18} className="mr-2 text-gray-500" />
//                 Your gender
//               </p>
//               <p className="flex items-center">
//                 <Link size={18} className="mr-2 text-gray-500" />
//                 Your personal link (Portfolio)
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4">
//           {profileSectionData.map((section) => (
//             <SectionCard
//               key={section.id}
//               id={section.id}
//               title={section.title}
//               description={section.description}
//               imageSrc={section.imageSrc}
//               imageAlt={section.imageAlt}
//               content={section.content}
//               onEdit={
//                 section.content
//                   ? () => handleAction("Edit", section.title)
//                   : undefined
//               }
//               onAdd={
//                 !section.content
//                   ? () => handleAction("Add", section.title)
//                   : undefined
//               }
//               onDelete={
//                 section.isCustom
//                   ? () => handleAction("Delete", section.title)
//                   : undefined
//               }
//             />
//           ))}
//         </div>
//       </div>

//       <div className="w-full lg:max-w-[25%] shrink-0 sticky top-24 h-fit max-h-[calc(100vh-2rem)]">
//         <ProfileSidebarRight />
//       </div>
//     </div>
//   );
// }
// pages/ProfilePage.jsx
"use client";
import { useState } from "react";
import { profileDataFromAPI } from "@/mock/userProfile";
import { getProfileSectionData } from "@/app/candidate/profile/components/profileData";
import ProfileSidebarRight from "@/app/candidate/components/ProfileSidebarRight";
import SectionCard from "@/app/candidate/components/SectionCard";
import EditProfileModal from "@/app/candidate/profile/components/EditProfileModal";
import { Edit, Mail, Gift, MapPin, Phone, User, Link } from "lucide-react";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(profileDataFromAPI);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const profileSectionData = getProfileSectionData(profileData);

  const handleEdit = (section) => {
    setCurrentSection(section);
    setIsModalOpen(true);
  };

  const handleAdd = (section) => {
    setCurrentSection(section);
    setIsModalOpen(true);
  };

  const handleDelete = (section) => {
    if (section.isCustom) {
      setProfileData((prev) => {
        const newData = { ...prev };
        delete newData[section.id];
        return newData;
      });
    }
  };

  const handleSave = (sectionId, newData) => {
    setProfileData((prev) => ({
      ...prev,
      [sectionId]: newData,
    }));
  };

  return (
    <div className="flex flex-col w-full gap-6 lg:flex-row lg:items-start">
      <div className="flex-1 w-full xl:max-w-[78%]">
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
              <Edit size={20} className="text-blue-800" />
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
        <div className="grid grid-cols-1 gap-4">
          {profileSectionData.map((section) => (
            <SectionCard
              key={section.id}
              id={section.id}
              title={section.title}
              description={section.description}
              imageSrc={section.imageSrc}
              imageAlt={section.imageAlt}
              content={section.content}
              onEdit={section.content ? () => handleEdit(section) : undefined}
              onAdd={!section.content ? () => handleAdd(section) : undefined}
              onDelete={section.isCustom ? () => handleDelete(section) : undefined}
            />
          ))}
        </div>
      </div>
      <div className="w-full lg:max-w-[25%] shrink-0 sticky top-24 h-fit max-h-[calc(100vh-2rem)]">
        <ProfileSidebarRight />
      </div>
      {isModalOpen && currentSection && (
        <EditProfileModal
          section={currentSection}
          onSave={(newData) => handleSave(currentSection.id, newData)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}