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
  allSkills: string[];
  selectedSkills: string[];
  toggleSkill: (skill: string) => void;
  resetFilters: () => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  allSkills,
  selectedSkills,
  toggleSkill,
  resetFilters,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="space-y-2 mb-2">
      {/* Skills Filter */}
      <div className="flex flex-wrap gap-1">
        <Badge
          variant="outline"
          className={cn(
            TYPOGRAPHY.fontFamily.mono,
            "cursor-pointer transition-all duration-200",
            "text-sm",
            selectedSkills.length === 0
              ? "bg-secondary text-secondary-foreground border-transparent"
              : "hover:bg-secondary/80"
          )}
          onClick={resetFilters}>
          All Projects
        </Badge>
        {allSkills.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className={cn(
              TYPOGRAPHY.fontFamily.mono,
              "cursor-pointer transition-all duration-200",
              "text-sm",
              selectedSkills.includes(skill)
                ? "bg-secondary text-secondary-foreground border-transparent"
                : "hover:bg-secondary/80"
            )}
            onClick={() => toggleSkill(skill)}>
            {skill}
          </Badge>
        ))}
      </div>

      {/* Sort Dropdown - Aligned Right */}
      <div className="flex justify-end">
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
