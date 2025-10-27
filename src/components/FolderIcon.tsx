"use client";

import { Folder } from "lucide-react";
import {
  INTERACTIONS,
  SIZING,
  SPACING,
  TYPOGRAPHY,
  cn,
} from "@/lib/design-constants";

interface FolderIconProps {
  label: string;
  onClick?: () => void;
  rotation?: number;
  COLORS?: string;
}

export default function FolderIcon({
  label,
  onClick,
  rotation = 0,
  COLORS,
}: FolderIconProps) {
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
        <Folder className={cn(SIZING.icon.sm, COLORS, "drop-shadow-lg")} />
        <p
          className={cn(
            TYPOGRAPHY.presets.label,
            "text-center drop-shadow-sm sm:text-sm"
          )}>
          {label}
        </p>
      </div>
    </div>
  );
}
