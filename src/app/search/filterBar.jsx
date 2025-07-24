"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useJobSearchStore } from "@/store/jobSearchStore";

export default function FilterBar() {
  const [allCategories, setAllCategories] = useState([]);
  const [allLevels, setAllLevels] = useState([]);
  const [allWorkTypes, setAllWorkTypes] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  const [showCategories, setShowCategories] = useState(true);
  const [showLevels, setShowLevels] = useState(true);
  const [showWorkTypes, setShowWorkTypes] = useState(true);
  const [showSkills, setShowSkills] = useState(true);

  const { filters, setFilters } = useJobSearchStore();

  const toggleValue = (listName, value) => {
    setFilters({
      ...filters,
      [listName]: filters[listName].includes(value)
        ? filters[listName].filter((v) => v !== value)
        : [...filters[listName], value],
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/jobs"
        );
        const data = await response.json();

        const categorySet = new Set();
        const levelSet = new Set();
        const workTypeSet = new Set();
        const skillSet = new Set();

        data.forEach((job) => {
          const { category, level, workType, skill } = job;

          (Array.isArray(category) ? category : [category]).forEach((c) =>
            categorySet.add(c)
          );
          (Array.isArray(level) ? level : [level]).forEach((l) =>
            levelSet.add(l)
          );
          (Array.isArray(workType) ? workType : [workType]).forEach((w) =>
            workTypeSet.add(w)
          );
          (Array.isArray(skill) ? skill : [skill]).forEach((s) =>
            skillSet.add(s)
          );
        });

        setAllCategories([...categorySet]);
        setAllLevels([...levelSet]);
        setAllWorkTypes([...workTypeSet]);
        setAllSkills([...skillSet]);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      {/* Work Types */}
      <div>
        <div
          onClick={() => setShowWorkTypes(!showWorkTypes)}
          className="flex justify-between items-center cursor-pointer font-semibold mb-2"
        >
          <span>Work Type</span>
          {showWorkTypes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {showWorkTypes &&
          allWorkTypes.map((type) => (
            <div key={type}>
              <label>
                <input
                  type="checkbox"
                  checked={filters.workTypes.includes(type)}
                  onChange={() => toggleValue("workTypes", type)}
                />
                <span className="ml-2">{type}</span>
              </label>
            </div>
          ))}
      </div>

      {/* Levels */}
      <div>
        <div
          onClick={() => setShowLevels(!showLevels)}
          className="flex justify-between items-center cursor-pointer font-semibold mb-2"
        >
          <span>Levels</span>
          {showLevels ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {showLevels &&
          allLevels.map((level) => (
            <div key={level}>
              <label>
                <input
                  type="checkbox"
                  checked={filters.levels.includes(level)}
                  onChange={() => toggleValue("levels", level)}
                />
                <span className="ml-2">{level}</span>
              </label>
            </div>
          ))}
      </div>

      {/* Categories */}
      <div>
        <div
          onClick={() => setShowCategories(!showCategories)}
          className="flex justify-between items-center cursor-pointer font-semibold mb-2"
        >
          <span>Categories</span>
          {showCategories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {showCategories &&
          allCategories.map((cat) => (
            <div key={cat}>
              <label>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleValue("categories", cat)}
                />
                <span className="ml-2">{cat}</span>
              </label>
            </div>
          ))}
      </div>

      {/* Skills */}
      <div>
        <div
          onClick={() => setShowSkills(!showSkills)}
          className="flex justify-between items-center cursor-pointer font-semibold mb-2"
        >
          <span>Skills</span>
          {showSkills ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {showSkills &&
          allSkills.map((skill) => (
            <div key={skill}>
              <label>
                <input
                  type="checkbox"
                  checked={filters.skills.includes(skill)}
                  onChange={() => toggleValue("skills", skill)}
                />
                <span className="ml-2">{skill}</span>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}
