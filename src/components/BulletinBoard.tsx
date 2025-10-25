"use client";

import { useState } from "react";
import FolderIcon from "./FolderIcon";
import FileIcon from "./FileIcon";
import ProjectDialog from "./ProjectDialog";
import PolaroidCard from "./PolaroidCard";
import { ThemeToggle } from "./ThemeToggle";
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

  const pushpinStyle = getPushpinStyle("small", "blue");

  return (
    <div className={cn("relative w-full min-h-screen overflow-hidden", COLORS.board.gradient)}>
      {/* Theme Toggle */}
      <ThemeToggle />
      {/* Cork board texture overlay */}
      <div
        className={cn("absolute inset-0", CORK_TEXTURE.opacity)}
        style={{
          backgroundImage: CORK_TEXTURE.pattern,
        }}></div>

      {/* Main content area */}
      <div className={cn("relative z-10 flex flex-col items-center min-h-screen", SPACING.padding.lg)}>
        {/* Welcome note - pinned paper style */}
        <div className={cn(
          COLORS.paper.white,
          SPACING.padding.lg,
          COLORS.shadows["2xl"],
          PAPER_STYLES.note.rotationClasses,
          SIZING.container.sm,
          "mt-8 mb-12 relative"
        )}>
          {/* Push pin for welcome note */}
          <div
            className={cn("absolute left-1/2 -translate-x-1/2 z-10", pushpinStyle.className)}
            style={{
              width: pushpinStyle.size,
              height: pushpinStyle.size,
              top: `-${pushpinStyle.size}`,
            }}></div>

          <h1 className={cn(TYPOGRAPHY.presets.heading, "mb-4")}>
            Welcome!
          </h1>
          <p className={TYPOGRAPHY.presets.body}>
            {
              "This is my digital board, and a combination of how my brain and desktop looks like. Click on the icons below to explore more!"
            }
          </p>
        </div>

        {/* Items container */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full", SPACING.gap.lg, SIZING.container.xl)}>
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
          <PolaroidCard
            imageSrc="/website_picture.jpeg"
            caption="Hi, I am Selin!"
            rotation={2}
          />
        </div>
      </div>

      {/* Dialogs */}
      <ProjectDialog
        open={projectsOpen}
        onOpenChange={setProjectsOpen}
        title="My Projects"
        description="Check out some of my work"
        tags={["React", "Next.js", "TypeScript"]}>
        <p className={TYPOGRAPHY.fontFamily.mono}>
          Here you can showcase your projects! Add project cards, links, or
          descriptions here.
        </p>
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
  );
}
