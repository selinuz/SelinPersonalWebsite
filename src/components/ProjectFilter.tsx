import React from "react";
import { cn, TYPOGRAPHY } from "@/lib/design-constants";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOrder = "newest" | "oldest";

interface ProjectFilterProps {
  allLanguages: string[];
  allFrameworks: string[];
  allTools: string[];
  selectedLanguages: string[];
  selectedFrameworks: string[];
  selectedTools: string[];
  toggleLanguage: (language: string) => void;
  toggleFramework: (framework: string) => void;
  toggleTool: (tool: string) => void;
  resetFilters: () => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  allLanguages,
  allFrameworks,
  allTools,
  selectedLanguages,
  selectedFrameworks,
  selectedTools,
  toggleLanguage,
  toggleFramework,
  toggleTool,
  resetFilters,
  sortOrder,
  setSortOrder,
}) => {
  const hasActiveFilters =
    selectedLanguages.length > 0 ||
    selectedFrameworks.length > 0 ||
    selectedTools.length > 0;
  return (
    <div className="space-y-3 mb-2">
      {/* Languages Filter */}
      {allLanguages.length > 0 && (
        <div className="space-y-1">
          <span className={cn(TYPOGRAPHY.fontFamily.mono, "text-xs text-pop-blue")}>
            Languages
          </span>
          <div className="flex flex-wrap gap-1">
            {allLanguages.map((language) => (
              <Badge
                key={language}
                className={cn(
                  TYPOGRAPHY.fontFamily.mono,
                  "cursor-pointer transition-all duration-200",
                  "text-sm border-transparent",
                  selectedLanguages.includes(language)
                    ? "bg-pop-blue/30 text-pop-blue"
                    : "bg-pop-blue/10 text-pop-blue/70 hover:bg-pop-blue/20 hover:text-pop-blue"
                )}
                onClick={() => toggleLanguage(language)}>
                {language}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Frameworks Filter */}
      {allFrameworks.length > 0 && (
        <div className="space-y-1">
          <span className={cn(TYPOGRAPHY.fontFamily.mono, "text-xs text-pop-green")}>
            Frameworks
          </span>
          <div className="flex flex-wrap gap-1">
            {allFrameworks.map((framework) => (
              <Badge
                key={framework}
                className={cn(
                  TYPOGRAPHY.fontFamily.mono,
                  "cursor-pointer transition-all duration-200",
                  "text-sm border-transparent",
                  selectedFrameworks.includes(framework)
                    ? "bg-pop-green/30 text-pop-green"
                    : "bg-pop-green/10 text-pop-green/70 hover:bg-pop-green/20 hover:text-pop-green"
                )}
                onClick={() => toggleFramework(framework)}>
                {framework}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Tools Filter */}
      {allTools.length > 0 && (
        <div className="space-y-1">
          <span className={cn(TYPOGRAPHY.fontFamily.mono, "text-xs text-pop-red")}>
            Tools
          </span>
          <div className="flex flex-wrap gap-1">
            {allTools.map((tool) => (
              <Badge
                key={tool}
                className={cn(
                  TYPOGRAPHY.fontFamily.mono,
                  "cursor-pointer transition-all duration-200",
                  "text-sm border-transparent",
                  selectedTools.includes(tool)
                    ? "bg-pop-red/30 text-pop-red"
                    : "bg-pop-red/10 text-pop-red/70 hover:bg-pop-red/20 hover:text-pop-red"
                )}
                onClick={() => toggleTool(tool)}>
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Sort Dropdown and Clear Filters */}
      <div className="flex justify-between items-center">
        {hasActiveFilters ? (
          <button
            onClick={resetFilters}
            className={cn(
              TYPOGRAPHY.fontFamily.mono,
              "text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            )}>
            Clear filters
          </button>
        ) : (
          <div />
        )}
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger
            className={cn("w-[180px]", TYPOGRAPHY.fontFamily.mono)}>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest" className={TYPOGRAPHY.fontFamily.mono}>
              Newest First
            </SelectItem>
            <SelectItem value="oldest" className={TYPOGRAPHY.fontFamily.mono}>
              Oldest First
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectFilter;
