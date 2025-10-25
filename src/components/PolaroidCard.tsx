"use client";

import Image from "next/image";
import {
  COLORS,
  INTERACTIONS,
  POLAROID,
  TYPOGRAPHY,
  getPushpinStyle,
  cn,
} from "@/lib/design-constants";

interface PolaroidCardProps {
  imageSrc: string;
  caption?: string;
  rotation?: number;
  onClick?: () => void;
  width?: number;
  orientation?: "portrait" | "landscape";
}

export default function PolaroidCard({
  imageSrc,
  caption = "",
  rotation = 0,
  onClick,
  width = POLAROID.defaultWidth,
  orientation = "portrait",
}: PolaroidCardProps) {
  // Calculate borders using design constants
  const borderSide = width * POLAROID.borderRatio.side;
  const borderBottom = width * POLAROID.borderRatio.bottom;
  const borderTop = width * POLAROID.borderRatio.top;

  // Photo area dimensions (excluding borders)
  const photoWidth = width - borderSide * 2;
  const photoHeight =
    orientation === "portrait"
      ? photoWidth * POLAROID.aspectRatio.portrait
      : photoWidth * POLAROID.aspectRatio.landscape;

  // Total card height
  const totalHeight = photoHeight + borderTop + borderBottom;

  // Get pushpin style using design constants
  const pushpinStyle = getPushpinStyle("small", "blue");
  const pushpinSize = width * 0.05;
  const pushpinTop = -width * 0.03;

  return (
    <div
      className={cn(
        "relative",
        INTERACTIONS.cursor.pointer,
        INTERACTIONS.transition.default,
        INTERACTIONS.hover.lift
      )}
      onClick={onClick}
      style={{
        transform: `rotate(${rotation}deg)`,
        width: `${width}rem`,
      }}>
      {/* Push pin - size relative to card */}
      <div
        className={cn("absolute left-1/2 -translate-x-1/2 z-10", pushpinStyle.className)}
        style={{
          width: `${pushpinSize}rem`,
          height: `${pushpinSize}rem`,
          top: `${pushpinTop}rem`,
        }}></div>

      {/* Polaroid card */}
      <div
        className={cn(COLORS.paper.white, COLORS.shadows.xl)}
        style={{
          padding: `${borderTop}rem ${borderSide}rem ${borderBottom}rem`,
          height: `${totalHeight}rem`,
        }}>
        {/* Photo area */}
        <div
          className="relative bg-gray-200 overflow-hidden"
          style={{
            width: `${photoWidth}rem`,
            height: `${photoHeight}rem`,
          }}>
          <Image src={imageSrc} alt={caption} fill className="object-cover" />
        </div>

        {/* Caption area - centered in bottom margin */}
        {caption && (
          <div
            className="text-center absolute left-0 right-0"
            style={{
              bottom: `${borderBottom * 0.3}rem`,
              padding: `0 ${borderSide}rem`,
            }}>
            <p
              className={TYPOGRAPHY.presets.caption}
              style={{
                fontSize: `${width * 0.08}rem`,
              }}>
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
