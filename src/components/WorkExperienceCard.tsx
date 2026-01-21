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
        <div className="flex justify-between items-start gap-2">
          <CardTitle
            className={cn(TYPOGRAPHY.fontFamily.mono, "text-lg md:text-xl")}>
            {experience.company}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn(TYPOGRAPHY.fontFamily.mono, "text-xs shrink-0")}>
            {experience.location}
          </Badge>
        </div>
        <CardDescription className={cn(TYPOGRAPHY.fontFamily.mono, "text-sm")}>
          {experience.position} | {experience.employmentType}
        </CardDescription>
        <CardDescription className={cn(TYPOGRAPHY.fontFamily.mono, "text-sm")}>
          {experience.duration}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">

        {/* Tools, Methodologies, and Soft Skills */}
        <div className="space-y-2">
          {experience.tools.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className={cn(TYPOGRAPHY.fontFamily.mono, "text-xs text-pop-blue mr-1")}>
                Tools:
              </span>
              {experience.tools.map((tool) => (
                <Badge
                  key={tool}
                  className={cn(
                    TYPOGRAPHY.fontFamily.mono,
                    "text-xs border-transparent bg-pop-blue/20 text-pop-blue dark:bg-pop-blue/30"
                  )}>
                  {tool}
                </Badge>
              ))}
            </div>
          )}
          {experience.methodologies.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className={cn(TYPOGRAPHY.fontFamily.mono, "text-xs text-pop-green mr-1")}>
                Methodologies:
              </span>
              {experience.methodologies.map((methodology) => (
                <Badge
                  key={methodology}
                  className={cn(
                    TYPOGRAPHY.fontFamily.mono,
                    "text-xs border-transparent bg-pop-green/20 text-pop-green dark:bg-pop-green/30"
                  )}>
                  {methodology}
                </Badge>
              ))}
            </div>
          )}
          {experience.softSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className={cn(TYPOGRAPHY.fontFamily.mono, "text-xs text-pop-red mr-1")}>
                Soft Skills:
              </span>
              {experience.softSkills.map((skill) => (
                <Badge
                  key={skill}
                  className={cn(
                    TYPOGRAPHY.fontFamily.mono,
                    "text-xs border-transparent bg-pop-red/20 text-pop-red dark:bg-pop-red/30"
                  )}>
                  {skill}
                </Badge>
              ))}
            </div>
          )}
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
                "font-semibold text-sm"
              )}>
              Key Responsibilities:
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm">
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
