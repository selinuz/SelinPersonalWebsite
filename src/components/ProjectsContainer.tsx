"use client";

import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter, { SortOrder } from "./ProjectFilter";
import { projects } from "@/data/projects";

export default function ProjectsContainer() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
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

  // Get all unique languages, frameworks, and tools from projects
  const allLanguages = useMemo(() => {
    return Array.from(new Set(projects.flatMap((project) => project.languages)));
  }, []);

  const allFrameworks = useMemo(() => {
    return Array.from(new Set(projects.flatMap((project) => project.frameworks)));
  }, []);

  const allTools = useMemo(() => {
    return Array.from(new Set(projects.flatMap((project) => project.tools)));
  }, []);

  // Filter and sort projects based on selected filters and sort order
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by languages
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter((project) =>
        project.languages.some((lang) => selectedLanguages.includes(lang))
      );
    }

    // Filter by frameworks
    if (selectedFrameworks.length > 0) {
      filtered = filtered.filter((project) =>
        project.frameworks.some((fw) => selectedFrameworks.includes(fw))
      );
    }

    // Filter by tools
    if (selectedTools.length > 0) {
      filtered = filtered.filter((project) =>
        project.tools.some((tool) => selectedTools.includes(tool))
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
  }, [selectedLanguages, selectedFrameworks, selectedTools, sortOrder]);

  // Toggle filter functions
  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
    );
  };

  const toggleFramework = (framework: string) => {
    setSelectedFrameworks((prev) =>
      prev.includes(framework) ? prev.filter((f) => f !== framework) : [...prev, framework]
    );
  };

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedLanguages([]);
    setSelectedFrameworks([]);
    setSelectedTools([]);
  };

  return (
    <div className="space-y-4">
      {/* Project Filter */}
      <ProjectFilter
        allLanguages={allLanguages}
        allFrameworks={allFrameworks}
        allTools={allTools}
        selectedLanguages={selectedLanguages}
        selectedFrameworks={selectedFrameworks}
        selectedTools={selectedTools}
        toggleLanguage={toggleLanguage}
        toggleFramework={toggleFramework}
        toggleTool={toggleTool}
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
