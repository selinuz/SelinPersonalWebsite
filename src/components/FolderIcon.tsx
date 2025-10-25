'use client';

import { Folder } from "lucide-react";
import {
  COLORS,
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
}

export default function FolderIcon({ label, onClick, rotation = 0 }: FolderIconProps) {
  return (
    <div
      className={cn(
        "relative",
        INTERACTIONS.cursor.pointer,
        INTERACTIONS.transition.default,
        INTERACTIONS.hover.lift
      )}
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className={cn("flex flex-col items-center pt-2", SPACING.gap.sm)}>
        <Folder className={cn(SIZING.icon.md, COLORS.icons.folder, "drop-shadow-lg")} />
        <p className={cn(TYPOGRAPHY.presets.label, "text-center drop-shadow-sm")}>
          {label}
        </p>
      </div>
    </div>
  );
}