"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { connections } from "../data/core-values";

// Simple circular push pin (matching bulletin board style)
const createPushPin = (x: number, y: number, isHighlighted: boolean) => {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", x.toString());
  circle.setAttribute("cy", y.toString());
  circle.setAttribute("r", "6");
  circle.setAttribute("fill", isHighlighted ? "#DC2626" : "#B91C1C");
  circle.style.filter = "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))";
  return circle;
};

export default function ConnectionLines({
  selectedActivityId,
}: {
  selectedActivityId: string | null;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [hoveredLineId, setHoveredLineId] = useState<string | null>(null);
  const isFirstLoadRef = useRef(true);

  const drawLines = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = "";
    const svgRect = svg.getBoundingClientRect();

    // Store text boxes to append them last (so they appear on top)
    const textBoxes: SVGForeignObjectElement[] = [];

    connections.forEach(({ from, to, text }) => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);
      if (!fromEl || !toEl) return;

      const fromBox = fromEl.getBoundingClientRect();
      const toBox = toEl.getBoundingClientRect();

      const x1 = fromBox.left + fromBox.width / 2 - svgRect.left;
      let y1 = fromBox.top + fromBox.height / 2 - svgRect.top;
      const x2 = toBox.left + toBox.width / 2 - svgRect.left;
      let y2 = toBox.top + toBox.height / 2 - svgRect.top;

      // Adjust connection points based on relative positions
      if (y2 > y1) {
        // Target is below, connect from bottom edge of fromBox to top edge of toBox
        y1 = fromBox.bottom - svgRect.top;
        y2 = toBox.top - svgRect.top;
      } else {
        // Target is above, connect from top edge of fromBox to bottom edge of toBox
        y1 = fromBox.top - svgRect.top;
        y2 = toBox.bottom - svgRect.top;
      }

      const lineId = `${from}-${to}`;
      const isHighlighted =
        from === selectedActivityId || to === selectedActivityId;
      const isSelected = selectedLineId === lineId;
      const isHovered = hoveredLineId === lineId;

      // Invisible hitbox for easier clicks
      const hitbox = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      hitbox.setAttribute("x1", x1.toString());
      hitbox.setAttribute("y1", y1.toString());
      hitbox.setAttribute("x2", x2.toString());
      hitbox.setAttribute("y2", y2.toString());
      hitbox.setAttribute("data-line-id", lineId);
      hitbox.setAttribute("stroke", "transparent");
      hitbox.setAttribute("stroke-width", "30");
      hitbox.style.cursor = "pointer";
      hitbox.style.pointerEvents = "stroke";
      hitbox.addEventListener("click", () => {
        setSelectedLineId((prev) => (prev === lineId ? null : lineId));
      });
      hitbox.addEventListener("mouseenter", () => {
        setHoveredLineId(lineId);
      });
      hitbox.addEventListener("mouseleave", () => {
        setHoveredLineId(null);
      });
      svg.appendChild(hitbox);

      // Visible line - styled as red string
      // Create a curved path instead of straight line
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      // Calculate control point for a slight curve (simulating string sag)
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const sag = distance * 0.05; // 5% sag for natural droop
      const perpX = -(y2 - y1) / distance;
      const perpY = (x2 - x1) / distance;
      const ctrlX = midX + perpX * sag;
      const ctrlY = midY + perpY * sag;

      const pathData = `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`;

      path.setAttribute("d", pathData);
      path.setAttribute("data-line-id", lineId);
      path.setAttribute(
        "stroke",
        isHighlighted || isSelected || isHovered ? "#DC2626" : "#B91C1C"
      );
      path.setAttribute(
        "stroke-width",
        isHighlighted || isSelected || isHovered ? "4" : "2"
      );
      path.setAttribute("fill", "none");
      path.setAttribute("opacity", isHighlighted || isSelected || isHovered ? "1" : "0.6");
      path.setAttribute("stroke-linecap", "round");
      path.style.filter = "drop-shadow(0 1px 2px rgba(220, 38, 38, 0.3))";
      path.style.transition =
        "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease";
      path.style.touchAction = "manipulation";
      svg.appendChild(path);

      // Add push pins at connection points
      const startPin = createPushPin(x1, y1, isHighlighted || isSelected || isHovered);
      //const endPin = createPushPin(x2, y2, isHighlighted || isSelected);
      svg.appendChild(startPin);
      //svg.appendChild(endPin);

      // Line label (only visible when selected)
      if (text && isSelected) {
        const foreignObject = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "foreignObject"
        );
        // Set a larger width to accommodate the text
        const labelWidth = 200;
        foreignObject.setAttribute("width", labelWidth.toString());
        foreignObject.setAttribute("height", "100");
        foreignObject.setAttribute("x", (midX - labelWidth / 2).toString());
        foreignObject.setAttribute("y", (midY - 50).toString());
        foreignObject.setAttribute("data-line-id", lineId);
        foreignObject.style.overflow = "visible";

        const div = document.createElement("div");
        div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        div.className = "flex items-center justify-center";
        div.style.pointerEvents = "none";

        const textBox = document.createElement("div");
        textBox.className = "rounded-sm shadow-lg";
        textBox.style.backgroundColor = "white";
        textBox.style.padding = "8px 12px";
        textBox.style.fontSize = "0.65rem";
        textBox.style.lineHeight = "1.3";
        textBox.style.color = "#1f2937";
        textBox.style.maxWidth = "250px";
        textBox.textContent = text;

        div.appendChild(textBox);
        foreignObject.appendChild(div);
        // Store instead of appending immediately
        textBoxes.push(foreignObject);
      }
    });

    // Append all text boxes last so they appear on top
    textBoxes.forEach((textBox) => svg.appendChild(textBox));
  }, [selectedActivityId, selectedLineId, hoveredLineId]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const clearSelectionIfOutside = (e: MouseEvent | TouchEvent) => {
      if ((e.target as Element).tagName !== "line") {
        setSelectedLineId(null);
      }
    };

    const handleDraw = () => requestAnimationFrame(drawLines);

    // Initial draw with retry mechanism for DOM readiness
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 100;

    const attemptDraw = () => {
      const hasElements = connections.every(({ from, to }) => {
        return document.getElementById(from) && document.getElementById(to);
      });

      if (hasElements) {
        const delay = isFirstLoadRef.current ? 300 : 0;
        setTimeout(() => {
          handleDraw();
          isFirstLoadRef.current = false;
        }, delay);
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(attemptDraw, retryDelay);
      }
    };

    attemptDraw();
    window.addEventListener("resize", handleDraw);
    svg.addEventListener("click", clearSelectionIfOutside);
    svg.addEventListener("touchstart", clearSelectionIfOutside);

    return () => {
      window.removeEventListener("resize", handleDraw);
      svg.removeEventListener("click", clearSelectionIfOutside);
      svg.removeEventListener("touchstart", clearSelectionIfOutside);
    };
  }, [drawLines]);

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "auto",
        overflow: "visible",
      }}
    />
  );
}
