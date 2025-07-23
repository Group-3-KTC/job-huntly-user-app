// import aboutMeImage from "@/assets/images/about-me.png";
// import educationImage from "@/assets/images/education.png";
// import workExperienceImage from "@/assets/images/work-experience.png";
// import skillsImage from "@/assets/images/skill.png";
// import languageImage from "@/assets/images/languages.png";
// import highlightProjectImage from "@/assets/images/highlight-project.png";
// import certificatesImage from "@/assets/images/certificates.png";
// import awardsImage from "@/assets/images/awards.png";

// export const profileSectionData = [
//   {
//     id: "aboutMe",
//     title: "About Me",
//     description: "Introduce your strengths and years of experience",
//     imageSrc: aboutMeImage, 
//     imageAlt: "About Me",
//     content: (
//       <p className="text-sm text-gray-700">
//         Passionate frontend developer with 2 years of experience in React.
//       </p>
//     ),
//   },
//   {
//     id: "education",
//     title: "Education",
//     description: "Share your background education",
//     imageSrc: educationImage, 
//     imageAlt: "Education",
//     content: (
//       <div className="text-sm text-gray-700">
//         <p className="font-semibold">Van Hien University</p>
//         <p>College - Computer Science</p>
//         <p className="text-gray-500">08/2021 - NOW</p>
//         <p>example</p>
//       </div>
//     ),
//   },
//   {
//     id: "workExperience",
//     title: "Work Experience",
//     description: "Highlight detailed information about your job history",
//     imageSrc: workExperienceImage, 
//     imageAlt: "Work Experience",
//     content: (
//       <div className="text-sm text-gray-700">
//         <p className="font-semibold">Software Architect - FPT Education</p>
//         <p className="text-gray-500">02/2020 - NOW</p>
//         <p>example</p>
//         <p className="mt-1 font-semibold">Project:</p>
//         <p>example</p>
//       </div>
//     ),
//   },
//   {
//     id: "skills",
//     title: "Skills",
//     description: "Showcase your skills and proficiencies",
//     imageSrc: skillsImage, 
//     imageAlt: "Skills",
//   },
//   {
//     id: "language",
//     title: "Foreign Language",
//     description: "Provide your language skills and proficiencies",
//     imageSrc: languageImage, 
//     imageAlt: "Foreign Language",
//     content: (
//       <p className="text-sm text-gray-700">
//         <strong>English</strong> (Intermediate)
//       </p>
//     ),
//   },
//   {
//     id: "highlightProject",
//     title: "Highlight Project",
//     description: "Showcase your highlight project",
//     imageSrc: highlightProjectImage, 
//     imageAlt: "Highlight Project",
//   },
//   {
//     id: "certificates",
//     title: "Certificates",
//     description: "Provides evidence of your specific expertise and skills",
//     imageSrc: certificatesImage, 
//     imageAlt: "Certificates",
//   },
//   {
//     id: "awards",
//     title: "Awards",
//     description: "Highlight your awards or recognitions",
//     imageSrc: awardsImage, 
//     imageAlt: "Awards",
//     isCustom: true,
//     content: (
//       <ul className="text-sm text-gray-700 list-disc list-inside">
//         <li>Dean's List - 2022</li>
//         <li>Top 10 Hackathon Winner</li>
//       </ul>
//     ),
//   },
// ];

export const profileDataFromAPI = {
  aboutMe: {
    text: "Passionate frontend developer with 2 years of experience in React.",
  },
  education: {
    school: "Van Hien University",
    degree: "College - Computer Science",
    date: "08/2021 - NOW",
    note: "example",
  },
  workExperience: {
    position: "Software Architect - FPT Education",
    time: "02/2020 - NOW",
    description: "example",
    project: "example",
  },
  language: {
    name: "English",
    level: "Intermediate",
  },
  awards: ["Dean's List - 2022", "Top 10 Hackathon Winner"],
};