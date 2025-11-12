"use client";

import React from "react";
import Image from "next/image";
import { Project } from "../data/projects";
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
  project: Project;
  expanded: boolean;
  toggleExpanded: (id: string) => void;
}

const ProjectCard: React.FC<Props> = ({
  project,
  expanded,
  toggleExpanded,
}) => {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={() => toggleExpanded(project.id)}>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle
            className={cn(TYPOGRAPHY.fontFamily.mono, "text-lg md:text-xl")}>
            {project.title}
            {project.subtitle && (
              <span className="text-sm md:text-base font-normal italic ml-2">
                {project.subtitle}
              </span>
            )}
          </CardTitle>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 transition-transform hover:scale-110"
              onClick={(e) => e.stopPropagation()}>
              <Image
                src={
                  project.iconType === "github" ? "/github.svg" : "/link.svg"
                }
                alt={
                  project.iconType === "github"
                    ? "GitHub Link"
                    : "External Link"
                }
                width={40}
                height={40}
                className="opacity-70 hover:opacity-100"
              />
            </a>
          )}
        </div>
        <CardDescription className={cn(TYPOGRAPHY.fontFamily.mono, "text-sm")}>
          {project.duration}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p
          className={cn(
            TYPOGRAPHY.fontFamily.mono,
            "text-sm md:text-base leading-relaxed"
          )}>
          {project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill) => (
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
            Click to see more...
          </p>
        )}

        {/* Expanded details */}
        {expanded && (
          <div className="space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
            {project.detailsTitle && (
              <p
                className={cn(
                  TYPOGRAPHY.fontFamily.mono,
                  "font-semibold text-sm md:text-base"
                )}>
                {project.detailsTitle}
              </p>
            )}
            <ul className="space-y-2 list-disc list-inside text-sm">
              {project.details.map((item, i) => (
                <li
                  key={i}
                  className={cn(TYPOGRAPHY.fontFamily.mono, "leading-relaxed")}>
                  {item}
                </li>
              ))}
            </ul>
            {project.context && (
              <p
                className={cn(
                  TYPOGRAPHY.fontFamily.mono,
                  "text-sm italic text-muted-foreground mt-2"
                )}>
                {project.context}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
