import aboutMeImage from "@/assets/images/about-me.png";
import educationImage from "@/assets/images/education.png";
import workExperienceImage from "@/assets/images/work-experience.png";
import skillsImage from "@/assets/images/skill.png";
import languageImage from "@/assets/images/languages.png";
import highlightProjectImage from "@/assets/images/highlight-project.png";
import certificatesImage from "@/assets/images/certificates.png";
import awardsImage from "@/assets/images/awards.png";
import AboutMeSection from "@/app/candidate/components/sectionRenderer/AboutMeSection";
import EducationSection from "@/app/candidate/components/sectionRenderer/EducationSection";
import WorkExperienceSection from "@/app/candidate/components/sectionRenderer/WorkExperienceSection";
import LanguageSection from "@/app/candidate/components/sectionRenderer/LanguageSection";
import AwardsSection from "@/app/candidate/components/sectionRenderer/AwardsSection";
import { profileDataFromAPI } from "@/mock/userProfile";

export const getProfileSectionData = (profileData) => [
  {
    id: "aboutMe",
    title: "About Me",
    description: "Introduce your strengths and years of experience",
    imageSrc: aboutMeImage,
    imageAlt: "About Me",
    renderComponent: AboutMeSection,
    content: profileDataFromAPI.aboutMe ? (
      <AboutMeSection data={profileData.aboutMe} />
    ) : null,
  },
  {
    id: "education",
    title: "Education",
    description: "Share your background education",
    imageSrc: educationImage,
    imageAlt: "Education",
    renderComponent: EducationSection,
    content: profileData.education ? (
      <EducationSection data={profileData.education} />
    ) : null,
  },
  {
    id: "workExperience",
    title: "Work Experience",
    description: "Highlight detailed information about your job history",
    imageSrc: workExperienceImage,
    imageAlt: "Work Experience",
    renderComponent: WorkExperienceSection,
    content: profileData.workExperience ? (
      <WorkExperienceSection data={profileData.workExperience} />
    ) : null,
  },
  {
    id: "skills",
    title: "Skills",
    description: "Showcase your skills and proficiencies",
    imageSrc: skillsImage,
    imageAlt: "Skills",
    renderComponent: null, // Placeholder for future implementation
    content: null,
  },
  {
    id: "language",
    title: "Foreign Language",
    description: "Provide your language skills and proficiencies",
    imageSrc: languageImage,
    imageAlt: "Foreign Language",
    renderComponent: LanguageSection,
    content: profileData.language ? (
      <LanguageSection data={profileData.language} />
    ) : null,
  },
  {
    id: "highlightProject",
    title: "Highlight Project",
    description: "Showcase your highlight project",
    imageSrc: highlightProjectImage,
    imageAlt: "Highlight Project",
    renderComponent: null, // Placeholder for future implementation
    content: null,
  },
  {
    id: "certificates",
    title: "Certificates",
    description: "Provides evidence of your specific expertise and skills",
    imageSrc: certificatesImage,
    imageAlt: "Certificates",
    renderComponent: null, // Placeholder for future implementation
    content: null,
  },
  {
    id: "awards",
    title: "Awards",
    description: "Highlight your awards or recognitions",
    imageSrc: awardsImage,
    imageAlt: "Awards",
    isCustom: true,
    renderComponent: AwardsSection,
    content: profileData.awards ? (
      <AwardsSection data={profileData.awards} />
    ) : null,
  },
];
