"use client";

import { Folder, Briefcase, FileText, Camera, LucideIcon } from "lucide-react";
import {
  INTERACTIONS,
  SIZING,
  SPACING,
  TYPOGRAPHY,
  cn,
} from "@/lib/design-constants";

interface IconProps {
  label: string;
  onClick?: () => void;
  rotation?: number;
  color?: string;
  type: "folder" | "briefcase" | "file" | "camera";
}

const iconMap: Record<IconProps["type"], LucideIcon> = {
  folder: Folder,
  briefcase: Briefcase,
  file: FileText,
  camera: Camera,
};

export default function Icon({
  label,
  onClick,
  rotation = 0,
  color,
  type,
}: IconProps) {
  const IconComponent = iconMap[type];

  return (
    <div
      className={cn(
        "relative",
        INTERACTIONS.cursor.pointer,
        INTERACTIONS.transition.default,
        INTERACTIONS.hover.lift
      )}
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}>
      <div className={cn("flex flex-col items-center pt-2", SPACING.gap.sm)}>
        <IconComponent
          className={cn(SIZING.icon.sm, color, "drop-shadow-lg")}
        />
        <p
          className={cn(
            TYPOGRAPHY.presets.label,
            "text-center drop-shadow-sm"
          )}>
          {label}
        </p>
      </div>
    </div>
  );
}
