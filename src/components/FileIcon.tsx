"use client";

import { Badge } from "@/components/ui/badge";
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
  fileType?: "pdf" | "doc" | "txt";
}

export default function FileIcon({
  label,
  onClick,
  rotation = 0,
  fileType = "pdf",
}: FileIconProps) {
  const getFileColor = () => {
    switch (fileType) {
      case "pdf":
        return COLORS.icons.pdfFile;
      case "doc":
        return COLORS.icons.docFile;
      case "txt":
        return COLORS.icons.txtFile;
      default:
        return COLORS.icons.pdfFile;
    }
  };

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
          className={cn(SIZING.icon.sm, getFileColor(), "drop-shadow-lg")}
        />
        <div className={cn("flex flex-col items-center", SPACING.gap.xs)}>
          <p
            className={cn(
              TYPOGRAPHY.presets.label,
              "text-center drop-shadow-sm sm:text-sm"
            )}>
            {label}
          </p>
          <Badge
            variant="secondary"
            className={cn(
              TYPOGRAPHY.fontSize.xs,
              "sm:text-xs",
              TYPOGRAPHY.fontFamily.mono,
              "uppercase"
            )}>
            {fileType}
          </Badge>
        </div>
      </div>
    </div>
  );
}
