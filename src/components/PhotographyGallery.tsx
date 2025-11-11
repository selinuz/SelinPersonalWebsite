"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, TYPOGRAPHY, COLORS, POLAROID } from "@/lib/design-constants";
import { ChevronDown, ChevronRight, ChevronLeft, X } from "lucide-react";

interface Photo {
  src: string;
  rotation?: number;
  scale?: number;
}

interface PhotoSection {
  title: string;
  photos: Photo[];
}

interface PhotographyGalleryProps {
  sections: PhotoSection[];
}

interface GalleryPolaroidProps extends Photo {
  onClick: () => void;
}

function GalleryPolaroid({
  src,
  rotation = 0,
  scale = 1,
  onClick,
}: GalleryPolaroidProps) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const basePhotoWidth = 10 * scale; // rem

  // Calculate photo dimensions based on actual image aspect ratio or default
  const photoWidth = basePhotoWidth;
  let photoHeight = basePhotoWidth * POLAROID.aspectRatio.portrait;

  if (dimensions && imageLoaded) {
    const aspectRatio = dimensions.height / dimensions.width;
    photoHeight = basePhotoWidth * aspectRatio;
  }
  const border = 0.8;

  // Total card dimensions
  const totalWidth = photoWidth + border * 2;
  const totalHeight = photoHeight + border * 2;

  return (
    <div
      className="inline-block transition-transform duration-200 hover:scale-105 hover:z-10 relative cursor-pointer"
      style={{
        transform: `rotate(${rotation}deg)`,
        width: `${totalWidth}rem`,
      }}
      onClick={onClick}>
      <div
        className={cn(COLORS.paper.cream, COLORS.shadows.xl)}
        style={{
          padding: `${border}rem`,
          height: `${totalHeight}rem`,
        }}>
        {/* Photo area */}
        <div
          className="relative bg-gray-200 overflow-hidden"
          style={{
            width: `${photoWidth}rem`,
            height: `${photoHeight}rem`,
          }}>
          <Image
            src={src}
            alt={"Photography"}
            fill
            className="object-cover"
            sizes="12rem"
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              setDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight,
              });
              setImageLoaded(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function PhotographyGallery({
  sections,
}: PhotographyGalleryProps) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set(sections.map((_, index) => index)) // All sections expanded by default
  );
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Flatten all photos into a single array for navigation
  const allPhotos = sections.flatMap((section) => section.photos);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const openFullscreen = (photoSrc: string) => {
    const index = allPhotos.findIndex((photo) => photo.src === photoSrc);
    setCurrentImageIndex(index);
    setFullscreenImage(photoSrc);
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % allPhotos.length
        : (currentImageIndex - 1 + allPhotos.length) % allPhotos.length;
    setCurrentImageIndex(newIndex);
    setFullscreenImage(allPhotos[newIndex].src);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <>
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => {
          const isExpanded = expandedSections.has(sectionIndex);

          return (
            <div key={sectionIndex} className="border-b border-border pb-4">
              {/* Collapsible section heading */}
              <button
                onClick={() => toggleSection(sectionIndex)}
                className={cn(
                  "flex items-center gap-2 w-full text-left mb-4 hover:opacity-70 transition-opacity",
                  TYPOGRAPHY.fontFamily.mono
                )}>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
                <h2 className="text-xl font-bold text-card-foreground">
                  {section.title}
                </h2>
              </button>

              {/* Photos grid with Polaroid layout */}
              {isExpanded && (
                <div className="flex flex-wrap gap-4 justify-start items-start">
                  {section.photos.map((photo, photoIndex) => (
                    <GalleryPolaroid
                      key={photoIndex}
                      src={photo.src}
                      rotation={photo.rotation || ((photoIndex % 3) - 1) * 3}
                      scale={photo.scale}
                      onClick={() => openFullscreen(photo.src)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeFullscreen}>
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeFullscreen();
            }}>
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto("prev");
            }}>
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto("next");
            }}>
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Fullscreen Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={fullscreenImage}
              alt="Photography fullscreen"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
