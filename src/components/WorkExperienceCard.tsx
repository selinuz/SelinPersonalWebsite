"use client";

import React from "react";
import { WorkExperience } from "../data/work-experience";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TYPOGRAPHY } from "@/lib/design-constants";

interface Props {
  experience: WorkExperience;
  expanded: boolean;
  toggleExpanded: (id: string) => void;
}

const WorkExperienceCard: React.FC<Props> = ({
  experience,
  expanded,
  toggleExpanded,
}) => {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={() => toggleExpanded(experience.id)}>
      <CardHeader>
        <CardTitle
          className={cn(TYPOGRAPHY.fontFamily.mono, "text-lg md:text-xl")}>
          {experience.company}
        </CardTitle>
        <CardDescription className={cn(TYPOGRAPHY.fontFamily.mono, "text-sm")}>
          {experience.position} | {experience.employmentType}
        </CardDescription>
        <CardDescription className={cn(TYPOGRAPHY.fontFamily.mono, "text-sm")}>
          {experience.duration}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(TYPOGRAPHY.fontFamily.mono, "text-sm")}>
            {experience.location}
          </Badge>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className={cn(TYPOGRAPHY.fontFamily.mono, "text-sm")}>
              {skill}
            </Badge>
          ))}
        </div>

        {/* Click to expand hint */}
        {!expanded && (
          <p
            className={cn(
              TYPOGRAPHY.fontFamily.mono,
              "text-sm italic text-muted-foreground"
            )}>
            Click to see responsibilities...
          </p>
        )}

        {/* Expanded responsibilities */}
        {expanded && (
          <div className="space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <p
              className={cn(
                TYPOGRAPHY.fontFamily.mono,
                "font-semibold text-sm md:text-base"
              )}>
              Key Responsibilities:
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm md:text-base">
              {experience.responsibilities.map((item, i) => (
                <li
                  key={i}
                  className={cn(TYPOGRAPHY.fontFamily.mono, "leading-relaxed")}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceCard;
