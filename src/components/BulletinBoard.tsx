"use client";

import { useState, useEffect } from "react";
import Icon from "./Icon";
import ProjectDialog from "./ProjectDialog";
import PolaroidCard from "./PolaroidCard";
import ProjectsContainer from "./ProjectsContainer";
import WorkExperienceContainer from "./WorkExperienceContainer";
import { ThemeToggle } from "./ThemeToggle";
import { DraggableProvider } from "@/context/DraggableContext";
import { Draggable } from "./Draggable";
import { SocialPinsGroup } from "./SocialPins";
import CoreValues from "./CoreValues";
import SpotifyPlayer from "./SpotifyPlayer";
import PhotographyGallery from "./PhotographyGallery";
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
  const [aboutMeOpen, setAboutMeOpen] = useState(false);
  const [workExperienceOpen, setWorkExperienceOpen] = useState(false);
  const [photographyOpen, setPhotographyOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const height = typeof window !== "undefined" ? window.innerHeight : 800;
  const welcomeNoteWidth = isMobile ? Math.min(width * 0.7, 300) : 200;

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

  const getInitialPositions = () => {
    if (isMobile) {
      return {
        "polaroid-card": { x: width * 0.01, y: height * 0.35 },
        "welcome-note": {
          x: (width - welcomeNoteWidth) / 4,
          y: height * 0.01,
        },
        "whats-next-note": {
          x: width * 0.1,
          y: height * 0.7,
        },
        "projects-folder": { x: width * 0.7, y: height * 0.3 },
        "work-experience-folder": { x: width * 0.6, y: height * 0.4 },
        "resume-file": { x: width * 0.5, y: height * 0.1 },
        "photography-icon": { x: width * 0.4, y: height * 0.2 },
        "social-pins": { x: width * 0.01, y: height * 0.32 },
        "core-values": { x: width * 0.05, y: height * 0.5 },
        "spotify-player": { x: width * 0.05, y: height * 0.75 },
      };
    }

    return {
      "polaroid-card": { x: width * 0.01, y: height * 0.05 },
      "welcome-note": {
        x: width * 0.2,
        y: height * 0.05,
      },
      "whats-next-note": {
        x: width * 0.7,
        y: height * 0.4,
      },
      "projects-folder": { x: width * 0.6, y: height * 0.3 },
      "work-experience-folder": { x: width * 0.58, y: height * 0.1 },
      "resume-file": { x: width * 0.5, y: height * 0.05 },
      "photography-icon": { x: width * 0.46, y: height * 0.25 },
      "social-pins": { x: width * 0.22, y: height * 0.4 },
      "core-values": { x: width * 0.05, y: height * 0.5 },
      "spotify-player": { x: width * 0.73, y: height * 0.1 },
    };
  };

  const initialPositions = getInitialPositions();

  if (!isMounted) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <DraggableProvider initialPositions={initialPositions}>
      <div
        className={cn(
          "relative w-full overflow-x-hidden overflow-y-auto",
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
        <div className={cn("relative z-10 min-h-screen p-4 sm:p-8")}>
          {/* Polaroid Picture */}
          <Draggable id="polaroid-card">
            <div className="absolute">
              <PolaroidCard
                imageSrc="/website_picture.jpeg"
                caption="Hi, I am Selin!"
                rotation={-5}
                width={isMobile ? 10 : 12}
                onClick={() => setAboutMeOpen(true)}
              />
            </div>
          </Draggable>

          {/* Welcome note */}
          <Draggable id="welcome-note">
            <div className="absolute">
              <div
                className={cn(
                  COLORS.paper.white,
                  SPACING.padding.md,
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

                <h1 className={cn(TYPOGRAPHY.presets.heading, "mb-4")}>
                  Welcome!
                </h1>
                <p className={cn(TYPOGRAPHY.presets.body)}>
                  {
                    "This is my digital board, a mix of how my brain and desktop look. Click on things to explore more!"
                  }
                </p>
              </div>
            </div>
          </Draggable>

          {/* What is next note */}
          <Draggable id="whats-next-note">
            <div className="absolute">
              <div
                className={cn(
                  COLORS.paper.white,
                  SPACING.padding.md,
                  COLORS.shadows["2xl"],
                  "transform rotate-3",
                  SIZING.container.sm,
                  "relative"
                )}
                style={{ width: isMobile ? `${welcomeNoteWidth}px` : "auto" }}>
                {/* Push pin for what's next note */}
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

                <h1 className={cn(TYPOGRAPHY.presets.heading, "mb-4")}>
                  What is next?
                </h1>
                <p className={cn(TYPOGRAPHY.presets.body)}>
                  {
                    "I am graduating in May 2026 and looking for work opportunities in Europe, specifically in the Netherlands in Product or Project Management."
                  }
                </p>
              </div>
            </div>
          </Draggable>

          {/* Projects Folder */}
          <Draggable id="projects-folder">
            <div className="absolute">
              <Icon
                label="Projects"
                rotation={-2}
                onClick={() => setProjectsOpen(true)}
                color={COLORS.icons.folder}
                type="folder"
              />
            </div>
          </Draggable>

          {/* Work Experience Folder */}
          <Draggable id="work-experience-folder">
            <div className="absolute">
              <Icon
                label="Work Experience"
                rotation={3}
                onClick={() => setWorkExperienceOpen(true)}
                color={COLORS.icons.work}
                type="briefcase"
              />
            </div>
          </Draggable>

          {/* Resume File */}
          <Draggable id="resume-file">
            <div className="absolute">
              <Icon
                label="Resume"
                rotation={1}
                onClick={() => setResumeOpen(true)}
                color={COLORS.icons.pdfFile}
                type="file"
              />
            </div>
          </Draggable>

          {/* Photography */}
          <Draggable id="photography-icon">
            <div className="absolute">
              <Icon
                label="Photography"
                rotation={-2}
                onClick={() => setPhotographyOpen(true)}
                color={COLORS.icons.photography}
                type="camera"
              />
            </div>
          </Draggable>

          {/* Social Media Pins */}
          <Draggable id="social-pins">
            <div className="absolute">
              <SocialPinsGroup
                email="eceselinuz2@gmail.com"
                github="https://github.com/selinuz"
                linkedin="https://linkedin.com/in/selin-uz"
              />
            </div>
          </Draggable>

          {/* Core Values Map - Desktop only */}
          {!isMobile && (
            <Draggable id="core-values">
              <div
                className="absolute"
                style={{
                  width: "60vw",
                  maxWidth: "900px",
                }}>
                <CoreValues />
              </div>
            </Draggable>
          )}

          {/* Spotify Player */}
          <Draggable id="spotify-player">
            <div className="absolute">
              {/* Push pin */}
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
              <SpotifyPlayer
                playlistId="6VHIyDbHHeokuob3F9BbST"
                width={300}
                height={200}
                isMobile={isMobile}
                theme={0}
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
          <ProjectsContainer />
        </ProjectDialog>

        <ProjectDialog
          open={resumeOpen}
          onOpenChange={setResumeOpen}
          title="Resume"
          description="My experience and qualifications">
          <div className="space-y-4">
            <iframe
              src="/SelinUz_Resume.pdf"
              className="w-full h-[600px] border-2 border-gray-300 rounded-lg"
              title="Selin Uz Resume"
            />
            <a
              href="/SelinUz_Resume.pdf"
              download
              className={cn(
                TYPOGRAPHY.presets.body,
                "inline-block text-blue-600 hover:text-blue-800 underline"
              )}>
              Download Resume
            </a>
          </div>
        </ProjectDialog>

        <ProjectDialog
          open={aboutMeOpen}
          onOpenChange={setAboutMeOpen}
          title="About Me"
          description="Get to know me a little better">
          <div className="space-y-4">
            <p className={cn(TYPOGRAPHY.presets.body)}>
              I&apos;m a senior Computer Science student at UBC with a passion
              for solving problems through creative and critical thinking. I
              love building meaningful projects, improving processes, and making
              things more efficient.
            </p>
            <p className={cn(TYPOGRAPHY.presets.body)}>
              I&apos;m honored to have received the{" "}
              <a
                href="https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline">
                Karen McKellin International Leader of Tomorrow Award
              </a>
              , a full-ride scholarship that recognized my academic achievements
              and leadership potential during high school. This opportunity
              allowed me to move from my home country, Türkiye, to Canada to
              pursue my education.
            </p>
            <p className={cn(TYPOGRAPHY.presets.body)}>
              Outside of academics, I like sailing and (try to) spend my summers
              out on the ocean. I enjoy reading non-fiction like feminist
              literature and philosophy, and taking pictures with my camera.
            </p>
          </div>
        </ProjectDialog>

        <ProjectDialog
          open={workExperienceOpen}
          onOpenChange={setWorkExperienceOpen}
          title="Work Experience"
          description="My professional journey">
          <WorkExperienceContainer />
        </ProjectDialog>

        <ProjectDialog
          open={photographyOpen}
          onOpenChange={setPhotographyOpen}
          title="Photography"
          description="Taken with Fujifilm X-S20 with XC 15-45mm f/3.5-5.6 lens"
          size="wide">
          <PhotographyGallery
            sections={[
              {
                photos: [
                  {
                    src: "/photos/other/DSCF0761.jpg",
                    rotation: 1,
                    scale: 1.6,
                  },
                  {
                    src: "/photos/other/DSCF1336.jpg",
                    rotation: -3,
                    scale: 1.9,
                  },
                  {
                    src: "/photos/other/DSCF1375.jpg",
                    rotation: 2,
                    scale: 1.8,
                  },
                  {
                    src: "/photos/other/DSCF1376.jpg",
                    rotation: 0,
                    scale: 1.9,
                  },
                  {
                    src: "/photos/other/DSCF1872.jpg",
                    rotation: 1,
                    scale: 1.7,
                  },
                  {
                    src: "/photos/other/DSCF1077.jpg",
                    rotation: 1,
                    scale: 1.7,
                  },
                ],
              },
              {
                title: "Halloween 2025",
                photos: [
                  {
                    src: "/photos/halloween/DSCF1929.jpg",
                    rotation: -2,
                    scale: 1.5,
                  },
                  {
                    src: "/photos/halloween/DSCF2010.jpg",
                    rotation: 1,
                    scale: 1.7,
                  },
                  {
                    src: "/photos/halloween/DSCF2337.jpg",
                    rotation: 1,
                    scale: 1.6,
                  },
                  {
                    src: "/photos/halloween/DSCF2342.jpg",
                    rotation: 3,
                    scale: 1.7,
                  },
                  {
                    src: "/photos/halloween/DSCF1992.jpg",
                    rotation: -1,
                    scale: 1.7,
                  },
                  {
                    src: "/photos/halloween/DSCF2332.jpg",
                    rotation: -1,
                    scale: 1.8,
                  },
                  {
                    src: "/photos/halloween/DSCF2188.jpg",
                    rotation: -3,
                    scale: 1.2,
                  },
                  {
                    src: "/photos/halloween/DSCF2187.jpg",
                    rotation: 2,
                    scale: 1.2,
                  },
                  {
                    src: "/photos/halloween/DSCF1947.jpg",
                    rotation: -3,
                    scale: 1.4,
                  },
                ],
              },

              {
                title: "Animals",
                photos: [
                  {
                    src: "/photos/animals/DSCF1413.jpg",
                    rotation: -2,
                    scale: 1,
                  },
                  {
                    src: "/photos/animals/DSCF0455.jpg",
                    rotation: -3,
                    scale: 1.7,
                  },
                  {
                    src: "/photos/animals/DSCF1394.jpg",
                    rotation: 1,
                    scale: 1.8,
                  },
                  {
                    src: "/photos/animals/DSCF0305.jpg",
                    rotation: 1,
                    scale: 1.1,
                  },
                  {
                    src: "/photos/animals/DSCF0187.jpg",
                    rotation: -2,
                    scale: 1.8,
                  },
                ],
              },
            ]}
          />
        </ProjectDialog>
      </div>
    </DraggableProvider>
  );
}
