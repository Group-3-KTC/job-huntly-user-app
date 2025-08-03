"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SkillSelector = ({ skills, selectedSkills, onSkillAdd, onSkillRemove }) => {
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState("");

  const addNewSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      onSkillAdd(newSkillInput.trim(), true); // true indicates it's a new skill to add to available skills
      setNewSkillInput("");
      setShowSkillInput(false);
    } else if (newSkillInput.trim()) {
      onSkillAdd(newSkillInput.trim());
      setNewSkillInput("");
      setShowSkillInput(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {!showSkillInput ? (
          <>
            <Select onValueChange={onSkillAdd}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a skill" />
              </SelectTrigger>
              <SelectContent>
                {skills
                  .filter((skill) => !selectedSkills.includes(skill))
                  .map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-600 bg-transparent"
              onClick={() => setShowSkillInput(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Enter new skill"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              className="w-48"
              onKeyPress={(e) => e.key === "Enter" && addNewSkill()}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={addNewSkill}
              disabled={!newSkillInput.trim()}
            >
              Add
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowSkillInput(false);
                setNewSkillInput("");
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1">
              {skill}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                onClick={() => onSkillRemove(skill)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillSelector; 