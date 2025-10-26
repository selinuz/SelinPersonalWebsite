"use client";

import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter, { SortOrder } from "./ProjectFilter";
import { projects } from "@/data/projects";

export default function ProjectsContainer() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const toggleExpanded = (id: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Get all unique skills from projects
  const allSkills = useMemo(() => {
    return Array.from(new Set(projects.flatMap((project) => project.skills)));
  }, []);

  // Filter and sort projects based on selected skills and sort order
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by skills
    if (selectedSkills.length > 0) {
      filtered = projects.filter((project) =>
        project.skills.some((skill) => selectedSkills.includes(skill))
      );
    }

    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "newest") {
        return b.startDate.localeCompare(a.startDate);
      } else {
        return a.startDate.localeCompare(b.startDate);
      }
    });

    return sorted;
  }, [selectedSkills, sortOrder]);

  // Toggle skill filter
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedSkills([]);
  };

  return (
    <div className="space-y-4">
      {/* Project Filter */}
      <ProjectFilter
        allSkills={allSkills}
        selectedSkills={selectedSkills}
        toggleSkill={toggleSkill}
        resetFilters={resetFilters}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Filtered Projects */}
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          expanded={expandedProjects.has(project.id)}
          toggleExpanded={toggleExpanded}
        />
      ))}
    </div>
  );
}
