// import aboutMeImage from "@/assets/images/about-me.png";
// import educationImage from "@/assets/images/education.png";
// import workExperienceImage from "@/assets/images/work-experience.png";
// import skillsImage from "@/assets/images/skill.png";
// import languageImage from "@/assets/images/languages.png";
// import highlightProjectImage from "@/assets/images/highlight-project.png";
// import certificatesImage from "@/assets/images/certificates.png";
// import awardsImage from "@/assets/images/awards.png";
// import PersonalDetailSection from "@/app/candidate/components/sectionRenderer/PersonalDetailSection";
// import AboutMeSection from "@/app/candidate/components/sectionRenderer/AboutMeSection";
// import EducationSection from "@/app/candidate/components/sectionRenderer/EducationSection";
// import WorkExperienceSection from "@/app/candidate/components/sectionRenderer/WorkExperienceSection";
// import LanguageSection from "@/app/candidate/components/sectionRenderer/LanguageSection";
// import AwardsSection from "@/app/candidate/components/sectionRenderer/AwardsSection";
// import CertificatesSection from "@/app/candidate/components/sectionRenderer/CertificatesSection";
// import HighlightProjectSection from "@/app/candidate/components/sectionRenderer/HighlightProjectSection";
// import SkillsSection from "@/app/candidate/components/sectionRenderer/SkillsSection";

// export const getProfileSectionData = (profileData) => [
//   {
//     id: "personalDetail",
//     title: "Personal Detail",
//     description: "Update your personal information",
//     imageSrc: null,
//     imageAlt: "Personal Detail",
//     renderComponent: PersonalDetailSection,
//     content:
//       profileData.personalDetail && profileData.personalDetail.name ? (
//         <PersonalDetailSection data={profileData.personalDetail} />
//       ) : null,
//   },
//   {
//     id: "aboutMe",
//     title: "About Me",
//     description: "Introduce your strengths and years of experience",
//     imageSrc: aboutMeImage,
//     imageAlt: "About Me",
//     renderComponent: AboutMeSection,
//     content:
//       profileData.aboutMe && profileData.aboutMe.text ? (
//         <AboutMeSection data={profileData.aboutMe} />
//       ) : null,
//   },
//   {
//     id: "education",
//     title: "Education",
//     description: "Share your background education",
//     imageSrc: educationImage,
//     imageAlt: "Education",
//     renderComponent: EducationSection,
//     content:
//       profileData.education && profileData.education.length > 0 ? (
//         <EducationSection data={profileData.education} />
//       ) : null,
//   },
//   {
//     id: "workExperience",
//     title: "Work Experience",
//     description: "Highlight detailed information about your job history",
//     imageSrc: workExperienceImage,
//     imageAlt: "Work Experience",
//     renderComponent: WorkExperienceSection,
//     content:
//       profileData.workExperience && profileData.workExperience.length > 0 ? (
//         <WorkExperienceSection data={profileData.workExperience} />
//       ) : null,
//   },
//   {
//     id: "skills",
//     title: "Skills",
//     description: "Showcase your skills and proficiencies",
//     imageSrc: skillsImage,
//     imageAlt: "Skills",
//     renderComponent: SkillsSection,
//     content:
//       profileData.skills && profileData.skills.length > 0 ? (
//         <SkillsSection data={profileData.skills} />
//       ) : null,
//   },
//   {
//     id: "language",
//     title: "Foreign Language",
//     description: "Provide your language skills and proficiencies",
//     imageSrc: languageImage,
//     imageAlt: "Foreign Language",
//     renderComponent: LanguageSection,
//     content:
//       Array.isArray(profileData.language) && profileData.language.length > 0 ? (
//         <LanguageSection data={profileData.language} />
//       ) : null, // Chỉ hiển thị nếu là mảng và có dữ liệu
//   },
//   {
//     id: "highlightProject",
//     title: "Highlight Project",
//     description: "Showcase your highlight project",
//     imageSrc: highlightProjectImage,
//     imageAlt: "Highlight Project",
//     renderComponent: HighlightProjectSection,
//     content:
//       profileData.highlightProject &&
//       profileData.highlightProject.length > 0 ? (
//         <HighlightProjectSection data={profileData.highlightProject} />
//       ) : null,
//   },
//   {
//     id: "certificates",
//     title: "Certificates",
//     description: "Provides evidence of your specific expertise and skills",
//     imageSrc: certificatesImage,
//     imageAlt: "Certificates",
//     renderComponent: CertificatesSection,
//     content:
//       profileData.certificates && profileData.certificates.length > 0 ? (
//         <CertificatesSection data={profileData.certificates} />
//       ) : null,
//   },
//   {
//     id: "awards",
//     title: "Awards",
//     description: "Highlight your awards or recognitions",
//     imageSrc: awardsImage,
//     imageAlt: "Awards",
//     renderComponent: AwardsSection,
//     content:
//       profileData.awards && profileData.awards.length > 0 ? (
//         <AwardsSection data={profileData.awards} />
//       ) : null,
//   },
// ];
import aboutMeImage from "@/assets/images/about-me.png";
import educationImage from "@/assets/images/education.png";
import workExperienceImage from "@/assets/images/work-experience.png";
import skillsImage from "@/assets/images/skill.png";
import languageImage from "@/assets/images/languages.png";
import certificatesImage from "@/assets/images/certificates.png";
import PersonalDetailSection from "@/app/candidate/components/sectionRenderer/PersonalDetailSection";
import AboutMeSection from "@/app/candidate/components/sectionRenderer/AboutMeSection";
import EducationSection from "@/app/candidate/components/sectionRenderer/EducationSection";
import WorkExperienceSection from "@/app/candidate/components/sectionRenderer/WorkExperienceSection";
import LanguageSection from "@/app/candidate/components/sectionRenderer/LanguageSection";
import CertificatesSection from "@/app/candidate/components/sectionRenderer/CertificatesSection";
import SkillsSection from "@/app/candidate/components/sectionRenderer/SkillsSection";

export const getProfileSectionData = (profileData) => [
    {
        id: "personalDetail",
        title: "Personal Detail",
        description: "Update your personal information",
        imageSrc: null,
        imageAlt: "Personal Detail",
        renderComponent: PersonalDetailSection,
        content:
            profileData.personalDetail && profileData.personalDetail.name ? (
                <PersonalDetailSection data={profileData.personalDetail} />
            ) : null,
    },
    {
        id: "aboutMe",
        title: "About Me",
        description: "Introduce your strengths and years of experience",
        imageSrc: aboutMeImage,
        imageAlt: "About Me",
        renderComponent: AboutMeSection,
        content:
            profileData.aboutMe && profileData.aboutMe.text ? (
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
        content:
            profileData.education && profileData.education.length > 0 ? (
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
        content:
            profileData.workExperience &&
            profileData.workExperience.length > 0 ? (
                <WorkExperienceSection data={profileData.workExperience} />
            ) : null,
    },
    {
        id: "skills",
        title: "Skills",
        description: "Showcase your skills and proficiencies",
        imageSrc: skillsImage,
        imageAlt: "Skills",
        renderComponent: SkillsSection,
        content:
            profileData.skills && profileData.skills.length > 0 ? (
                <SkillsSection data={profileData.skills} />
            ) : null,
    },
    {
        id: "language",
        title: "Foreign Language",
        description: "Provide your language skills and proficiencies",
        imageSrc: languageImage,
        imageAlt: "Foreign Language",
        renderComponent: LanguageSection,
        content:
            Array.isArray(profileData.language) &&
            profileData.language.length > 0 ? (
                <LanguageSection data={profileData.language} />
            ) : null,
    },
    {
        id: "certificates",
        title: "Certificates",
        description: "Provides evidence of your specific expertise and skills",
        imageSrc: certificatesImage,
        imageAlt: "Certificates",
        renderComponent: CertificatesSection,
        content:
            profileData.certificates && profileData.certificates.length > 0 ? (
                <CertificatesSection data={profileData.certificates} />
            ) : null,
    },
];