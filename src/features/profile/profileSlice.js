import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: {
    aboutMe: {
      text: "Passionate frontend developer with 2 years of experience in React.",
    },
    education: [
      {
        school: "Van Hien University",
        degree: "College - Computer Science",
        major: "Information Technology",
        date: "08/2021 - NOW",
        note: "example",
      },
    ],
    workExperience: [
      {
        position: "Software Architect",
        company: "FPT Education",
        time: "02/2020 - NOW",
        description: "example",
        project: "example",
      },
    ],
    language: [],
    awards: [
      {
        name: "Dean's List",
        organization: "University/College Name",
        issueDate: { month: "May", year: "2022" },
        description: "Academic excellence recognition for maintaining high GPA",
      },
      {
        name: "Top 10 Hackathon Winner",
        organization: "Hackathon Organization Name",
        issueDate: { month: "March", year: "2023" },
        description:
          "Achieved top 10 placement in competitive programming hackathon",
      },
    ],
    certificates: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "06/2023",
        description: "Certified in cloud architecture and deployment.",
      },
    ],
    highlightProject: [
      {
        title: "E-commerce Platform",
        description:
          "Built a scalable e-commerce site using React and Node.js.",
        date: "03/2022 - 06/2022",
        link: "https://example.com",
      },
    ],
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" },
    ],
    personalDetail: {
      name: "Hoang Phuc Vo",
      title: "Frontend Developer",
      email: "phuc111239@gmail.com",
      dateOfBirth: "",
      address: "",
      phone: "",
      gender: "",
      personalLink: "",
    },
  },
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("profileData");
    if (serializedState === null || serializedState === "{}") {
      return initialState.profileData;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading from localStorage:", err);
    return initialState.profileData;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("profileData", serializedState);
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: initialState.profileData, // Sử dụng initialState trực tiếp, đồng bộ sau bằng useEffect
  },
  reducers: {
    updateSection: (state, action) => {
      const { sectionId, data } = action.payload;
      state.profileData[sectionId] = data;
      saveToLocalStorage(state.profileData);
    },
    addArrayItem: (state, action) => {
      const { sectionId, item } = action.payload;
      if (!state.profileData[sectionId]) {
        state.profileData[sectionId] = [];
      }
      state.profileData[sectionId].push(item);
      saveToLocalStorage(state.profileData);
    },
    updateArrayItem: (state, action) => {
      const { sectionId, index, item } = action.payload;
      if (state.profileData[sectionId] && state.profileData[sectionId][index]) {
        state.profileData[sectionId][index] = item;
        saveToLocalStorage(state.profileData);
      }
    },
    deleteArrayItem: (state, action) => {
      const { sectionId, index } = action.payload;
      if (state.profileData[sectionId]) {
        state.profileData[sectionId].splice(index, 1);
        saveToLocalStorage(state.profileData);
      }
    },
    deleteSection: (state, action) => {
      const { sectionId } = action.payload;
      delete state.profileData[sectionId];
      saveToLocalStorage(state.profileData);
    },
    loadProfileData: (state, action) => {
      state.profileData = action.payload;
      saveToLocalStorage(state.profileData);
    },
    syncFromLocalStorage: (state) => {
      const localData = loadFromLocalStorage();
      state.profileData = localData;
    },
  },
});

export const {
  updateSection,
  addArrayItem,
  updateArrayItem,
  deleteArrayItem,
  deleteSection,
  loadProfileData,
  syncFromLocalStorage,
} = profileSlice.actions;

export default profileSlice.reducer;