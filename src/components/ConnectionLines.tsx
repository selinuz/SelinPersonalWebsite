"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { connections } from "../data/core-values";

export default function ConnectionLines({
  selectedActivityId,
  zoom,
}: {
  selectedActivityId: string | null;
  zoom: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

  const drawLines = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = "";
    const svgRect = svg.getBoundingClientRect();

    connections.forEach(({ from, to, text }) => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);
      if (!fromEl || !toEl) return;

      const fromBox = fromEl.getBoundingClientRect();
      const toBox = toEl.getBoundingClientRect();

      const x1 = fromBox.left + fromBox.width / 2 - svgRect.left;
      const y1 = fromBox.top + fromBox.height / 2 - svgRect.top;
      const x2 = toBox.left + toBox.width / 2 - svgRect.left;
      const y2 = toBox.top + toBox.height / 2 - svgRect.top;

      const lineId = `${from}-${to}`;
      const isHighlighted =
        from === selectedActivityId || to === selectedActivityId;
      const isSelected = selectedLineId === lineId;

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
        isHighlighted || isSelected ? "#DC2626" : "#B91C1C"
      );
      path.setAttribute(
        "stroke-width",
        isHighlighted || isSelected ? "3" : "2"
      );
      path.setAttribute("fill", "none");
      path.setAttribute("opacity", isHighlighted || isSelected ? "0.9" : "0.7");
      path.setAttribute("stroke-linecap", "round");
      path.style.filter = "drop-shadow(0 1px 2px rgba(220, 38, 38, 0.3))";
      path.style.transition =
        "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease";
      path.style.touchAction = "manipulation";
      svg.appendChild(path);

      // Line label (only visible when selected)
      if (text) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const foreignObject = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "foreignObject"
        );
        foreignObject.setAttribute("x", (midX - 100).toString());
        foreignObject.setAttribute("y", (midY - 30).toString());
        foreignObject.setAttribute("width", "200");
        foreignObject.setAttribute("height", "100");
        foreignObject.setAttribute("data-line-id", lineId);
        if (!isSelected) {
          foreignObject.setAttribute("visibility", "hidden");
        }

        const div = document.createElement("div");
        div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        div.className =
          "bg-card text-foreground p-3 rounded-md text-sm text-center shadow-lg";
        div.style.lineHeight = "1.3";
        div.style.pointerEvents = "auto";
        div.innerHTML = text.replace(/\n/g, "<br />");

        foreignObject.appendChild(div);
        svg.appendChild(foreignObject);
      }
    });
  }, [selectedActivityId, selectedLineId, zoom]);

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
        setTimeout(handleDraw, 250);
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
