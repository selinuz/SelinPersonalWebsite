"use client";
import { FileText } from "lucide-react";
import {
  COLORS,
  INTERACTIONS,
  SIZING,
  SPACING,
  TYPOGRAPHY,
  cn,
} from "@/lib/design-constants";

interface FileIconProps {
  label: string;
  onClick?: () => void;
  rotation?: number;
}

export default function FileIcon({
  label,
  onClick,
  rotation = 0,
}: FileIconProps) {
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
        <FileText
          className={cn(SIZING.icon.sm, COLORS.icons.pdfFile, "drop-shadow-lg")}
        />
        <div className={cn("flex flex-col items-center", SPACING.gap.xs)}>
          <p
            className={cn(
              TYPOGRAPHY.presets.label,
              "text-center drop-shadow-sm sm:text-sm"
            )}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
