"use client";
import React, { useState } from "react";
import { cn, COLORS, INTERACTIONS, TYPOGRAPHY } from "@/lib/design-constants";

type CoreValueBoxProps = {
  id: string;
  label: string;
  definition: string;
  x: number;
  y: number;
  isHighlighted: boolean;
};

export default function CoreValueBox({
  id,
  label,
  definition,
  x,
  y,
  isHighlighted,
}: CoreValueBoxProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      id={id}
      className={cn(
        "absolute p-2 w-[100px] text-center rounded-lg",
        "bg-primary text-primary-foreground",
        COLORS.shadows.sm,
        INTERACTIONS.transition.all,
        INTERACTIONS.cursor.grab,
        "transform -translate-x-1/2 -translate-y-1/2",
        isHighlighted && "scale-110 shadow-lg",
        expanded && "bg-accent text-accent-foreground"
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 10,
      }}
      onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center justify-center font-bold">
        <h3 className={cn(TYPOGRAPHY.fontSize.xs, "m-0")}>{label}</h3>
      </div>
      {expanded && (
        <p className={cn(TYPOGRAPHY.fontSize.xs, "mt-1 leading-tight")}>
          {definition}
        </p>
      )}
    </div>
  );
}
