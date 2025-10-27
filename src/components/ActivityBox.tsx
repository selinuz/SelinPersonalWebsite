import React from "react";
import { cn, COLORS, INTERACTIONS, TYPOGRAPHY } from "@/lib/design-constants";

type ActivityBoxProps = {
  id: string;
  title: string;
  location: string;
  description?: string;
  duration: string;
  x: number;
  y: number;
  isSelected: boolean;
  onClick: () => void;
};

export default function ActivityBox({
  id,
  title,
  location,
  description,
  duration,
  x,
  y,
  isSelected,
  onClick,
}: ActivityBoxProps) {
  return (
    <div
      id={id}
      className={cn(
        "absolute p-3 w-[200px] text-center rounded-lg",
        "bg-secondary text-secondary-foreground",
        COLORS.shadows.md,
        INTERACTIONS.transition.all,
        INTERACTIONS.cursor.grab,
        "transform -translate-x-1/2 -translate-y-1/2",
        isSelected && "scale-110 shadow-xl bg-accent text-accent-foreground"
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 10,
      }}
      onClick={onClick}>
      <p className={cn(TYPOGRAPHY.fontSize.sm, TYPOGRAPHY.fontWeight.bold)}>
        {title}
      </p>
      <p className={cn(TYPOGRAPHY.fontSize.xs, "italic")}>{location}</p>
      <p className={cn(TYPOGRAPHY.fontSize.xs)}>{duration}</p>
      {isSelected && description && (
        <p className="text-[0.65rem] text-left mt-2 leading-tight">
          {description}
        </p>
      )}
    </div>
  );
}
