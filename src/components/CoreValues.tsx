"use client";
import { useState } from "react";
import MapCanvas from "./MapCanvas";
import {
  cn,
  TYPOGRAPHY,
  COLORS,
  SPACING,
  getPushpinStyle,
} from "@/lib/design-constants";

export default function CoreValues() {
  const [showTooltip, setShowTooltip] = useState(false);
  const pushpinStyle = getPushpinStyle("small", "blue");

  return (
    <section className="w-full mt-8">
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none">
        {/* Info tooltip - positioned absolutely above everything */}
        {showTooltip && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-card text-foreground p-3 rounded-md w-[280px] sm:w-[320px] text-xs shadow-lg z-[1000] text-left">
            <p className="font-bold mb-1">Instructions:</p>
            <ul className="list-disc ml-4 space-y-0.5">
              <li className="font-normal">
                Click activities to see details and highlight values.
              </li>
              <li className="font-normal">
                Click values to expand definitions.
              </li>
              <li className="font-normal">
                Tap connection lines to see relationships.
              </li>
            </ul>
          </div>
        )}

        {/* Connected title and map container */}
        <div className="w-full">
          {/* Pinned paper style title - connected to map */}
          <div
            className={cn(
              "relative",
              COLORS.paper.white,
              SPACING.padding.sm,
              COLORS.shadows.lg,
              "rounded-t-lg"
            )}>
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

            <div className="flex items-center justify-center">
              <h2
                className={cn(
                  TYPOGRAPHY.presets.subheading,
                  "text-base sm:text-lg"
                )}>
                Values in Action
              </h2>
              <button
                className={cn(
                  "bg-primary text-primary-foreground rounded-full ml-2",
                  "w-5 h-5 flex items-center justify-center",
                  "cursor-pointer text-xs"
                )}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                tabIndex={0}>
                i
              </button>
            </div>
          </div>

          {/* Map Canvas - connected via border-t-0 */}
          <div
            className={cn(
              COLORS.paper.white,
              "border-t-0 rounded-b-lg",
              COLORS.shadows.xl
            )}>
            <MapCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
