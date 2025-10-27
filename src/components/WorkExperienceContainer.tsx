"use client";

import { useState } from "react";
import WorkExperienceCard from "./WorkExperienceCard";
import { workExperiences } from "@/data/work-experience";

export default function WorkExperienceContainer() {
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(
    new Set()
  );

  const toggleExpanded = (id: string) => {
    setExpandedExperiences((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Sort experiences by start date (newest first)
  const sortedExperiences = [...workExperiences].sort((a, b) => {
    return b.startDate.localeCompare(a.startDate);
  });

  return (
    <div className="space-y-4">
      {sortedExperiences.map((experience) => (
        <WorkExperienceCard
          key={experience.id}
          experience={experience}
          expanded={expandedExperiences.has(experience.id)}
          toggleExpanded={toggleExpanded}
        />
      ))}
    </div>
  );
}
