"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FilterBar({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);

  const [allCategories, setAllCategories] = useState([]);
  const [allLevels, setAllLevels] = useState([]);
  const [allWorkTypes, setAllWorkTypes] = useState([]);

  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [showSkills, setShowSkills] = useState(true);

  //dropdown visibility
  const [showCategories, setShowCategories] = useState(true);
  const [showLevels, setShowLevels] = useState(true);
  const [showWorkTypes, setShowWorkTypes] = useState(true);

  const toggleValue = (list, value, setter) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    onFilterChange({ categories, levels, workTypes, skills });
  }, [categories, levels, workTypes, skills]);

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
          const { category, level, workType } = job;

          (Array.isArray(category) ? category : [category]).forEach((cat) =>
            categorySet.add(cat)
          );
          (Array.isArray(level) ? level : [level]).forEach((lvl) =>
            levelSet.add(lvl)
          );
          (Array.isArray(workType) ? workType : [workType]).forEach((wt) =>
            workTypeSet.add(wt)
          );
          (Array.isArray(job.skill) ? job.skill : [job.skill]).forEach((sk) =>
            skillSet.add(sk)
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
                  checked={workTypes.includes(type)}
                  onChange={() => toggleValue(workTypes, type, setWorkTypes)}
                />
                <span className="ml-2">{type}</span>
              </label>
            </div>
          ))}
      </div>


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
                  checked={levels.includes(level)}
                  onChange={() => toggleValue(levels, level, setLevels)}
                />
                <span className="ml-2">{level}</span>
              </label>
            </div>
          ))}
      </div>


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
                  checked={categories.includes(cat)}
                  onChange={() => toggleValue(categories, cat, setCategories)}
                />
                <span className="ml-2">{cat}</span>
              </label>
            </div>
          ))}
      </div>

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
                  checked={skills.includes(skill)}
                  onChange={() => toggleValue(skills, skill, setSkills)}
                />
                <span className="ml-2">{skill}</span>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}
