"use client";

import { useState, useEffect } from "react";
import FolderIcon from "./FolderIcon";
import FileIcon from "./FileIcon";
import ProjectDialog from "./ProjectDialog";
import PolaroidCard from "./PolaroidCard";
import ProjectCard from "./ProjectCard";
import { ThemeToggle } from "./ThemeToggle";
import { DraggableProvider } from "@/context/DraggableContext";
import { Draggable } from "./Draggable";
import { projects } from "@/data/projects";
import {
  COLORS,
  CORK_TEXTURE,
  PAPER_STYLES,
  SPACING,
  SIZING,
  TYPOGRAPHY,
  getPushpinStyle,
  cn,
} from "@/lib/design-constants";

export default function BulletinBoard() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );

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
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const height = typeof window !== "undefined" ? window.innerHeight : 800;
  const welcomeNoteWidth = isMobile ? Math.min(width * 0.7, 300) : 448;

  useEffect(() => {
    setIsMounted(true);

    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pushpinStyle = getPushpinStyle("small", "blue");

  // Responsive positioning based on screen size
  const getInitialPositions = () => {
    if (isMobile) {
      return {
        "polaroid-card": { x: width * 0.01, y: height * 0.3 },
        "welcome-note": {
          x: (width - welcomeNoteWidth) / 2,
          y: height * 0.01,
        },
        "projects-folder": { x: width * 0.55, y: height * 0.5 },
        "resume-file": { x: width * 0.55, y: height * 0.2 },
      };
    }

    return {
      "polaroid-card": { x: width * 0.15, y: height * 0.1 },
      "welcome-note": {
        x: (width - welcomeNoteWidth) / 2,
        y: height * 0.05,
      },
      "projects-folder": { x: width / 1.7, y: height / 3 },
      "resume-file": { x: width / 2.7, y: height / 3 },
    };
  };

  const initialPositions = getInitialPositions();

  if (!isMounted) {
    return (
      <div
        className={cn(
          "relative w-full min-h-screen overflow-x-hidden overflow-y-auto",
          COLORS.board.gradient
        )}>
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* Cork board texture overlay */}
        <div
          className={cn("absolute inset-0", CORK_TEXTURE.opacity)}
          style={{
            backgroundImage: CORK_TEXTURE.pattern,
          }}></div>

        {/* Main content area */}
        <div
          className={cn(
            "relative z-10 flex flex-col items-center min-h-screen p-4 sm:p-8"
          )}>
          {/* Welcome note - pinned paper style */}
          <div
            className={cn(
              COLORS.paper.white,
              SPACING.padding.lg,
              COLORS.shadows["2xl"],
              PAPER_STYLES.note.rotationClasses,
              SIZING.container.sm,
              "mt-4 sm:mt-8 mb-8 sm:mb-12 relative mx-4 sm:mx-0"
            )}>
            {/* Push pin for welcome note */}
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 z-10",
                pushpinStyle.className
              )}
              style={{
                width: pushpinStyle.size,
                height: pushpinStyle.size,
                top: `-${pushpinStyle.size}`,
              }}></div>

            <h1
              className={cn(
                TYPOGRAPHY.presets.heading,
                "mb-4 text-xl sm:text-3xl"
              )}>
              Welcome!
            </h1>
            <p className={cn(TYPOGRAPHY.presets.body, "text-xs sm:text-sm")}>
              {
                "This is my digital board, a mix of how my brain and desktop look. Click on the icons below to explore more!"
              }
            </p>
          </div>

          {/* Items container */}
          <div
            className={cn(
              "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 w-full px-4 sm:px-0",
              SPACING.gap.md,
              SIZING.container.xl
            )}>
            {/* Projects Folder */}
            <FolderIcon
              label="Projects"
              rotation={-2}
              onClick={() => setProjectsOpen(true)}
            />

            {/* Resume File */}
            <FileIcon
              label="Resume"
              fileType="pdf"
              rotation={1}
              onClick={() => setResumeOpen(true)}
            />

            {/* Polaroid Picture */}
            <div className="col-span-2 sm:col-span-1 flex justify-center">
              <PolaroidCard
                imageSrc="/website_picture.jpeg"
                caption="Hi, I am Selin!"
                rotation={2}
                width={isMobile ? 10 : 12}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DraggableProvider initialPositions={initialPositions}>
      <div
        className={cn(
          "relative w-full min-h-screen overflow-x-hidden overflow-y-auto",
          COLORS.board.gradient
        )}>
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* Cork board texture overlay */}
        <div
          className={cn("absolute inset-0", CORK_TEXTURE.opacity)}
          style={{
            backgroundImage: CORK_TEXTURE.pattern,
          }}></div>

        {/* Main content area - using absolute positioning */}
        <div
          className={cn("relative z-10 min-h-screen p-4 sm:p-8", "touch-none")}>
          {/* Polaroid Picture - Left side */}
          <Draggable id="polaroid-card">
            <div className="absolute">
              <PolaroidCard
                imageSrc="/website_picture.jpeg"
                caption="Hi, I am Selin!"
                rotation={2}
                width={isMobile ? 10 : 12}
              />
            </div>
          </Draggable>

          {/* Welcome note - Center */}
          <Draggable id="welcome-note">
            <div className="absolute">
              <div
                className={cn(
                  COLORS.paper.white,
                  SPACING.padding.lg,
                  COLORS.shadows["2xl"],
                  PAPER_STYLES.note.rotationClasses,
                  SIZING.container.sm,
                  "relative"
                )}
                style={{ width: isMobile ? `${welcomeNoteWidth}px` : "auto" }}>
                {/* Push pin for welcome note */}
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 z-10",
                    pushpinStyle.className
                  )}
                  style={{
                    width: pushpinStyle.size,
                    height: pushpinStyle.size,
                    top: `-${pushpinStyle.size}`,
                  }}></div>

                <h1
                  className={cn(
                    TYPOGRAPHY.presets.heading,
                    "mb-4 text-xl sm:text-2xl"
                  )}>
                  Welcome!
                </h1>
                <p
                  className={cn(TYPOGRAPHY.presets.body, "text-xs sm:text-sm")}>
                  {
                    "This is my digital board, a mix of how my brain and desktop look. Click on the icons below to explore more!"
                  }
                </p>
              </div>
            </div>
          </Draggable>

          {/* Projects Folder - Below welcome message */}
          <Draggable id="projects-folder">
            <div className="absolute">
              <FolderIcon
                label="Projects"
                rotation={-2}
                onClick={() => setProjectsOpen(true)}
              />
            </div>
          </Draggable>

          {/* Resume File - Next to projects */}
          <Draggable id="resume-file">
            <div className="absolute">
              <FileIcon
                label="Resume"
                fileType="pdf"
                rotation={1}
                onClick={() => setResumeOpen(true)}
              />
            </div>
          </Draggable>
        </div>

        {/* Dialogs */}
        <ProjectDialog
          open={projectsOpen}
          onOpenChange={setProjectsOpen}
          title="My Projects"
          description="Check out some of my work">
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                expanded={expandedProjects.has(project.id)}
                toggleExpanded={toggleExpanded}
              />
            ))}
          </div>
        </ProjectDialog>

        <ProjectDialog
          open={resumeOpen}
          onOpenChange={setResumeOpen}
          title="Resume"
          description="My experience and qualifications">
          <p className={TYPOGRAPHY.fontFamily.mono}>
            You can embed your resume PDF here or add download links.
          </p>
        </ProjectDialog>
      </div>
    </DraggableProvider>
  );
}
