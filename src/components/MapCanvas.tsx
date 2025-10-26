"use client";
import { useEffect, useRef, useState } from "react";
import CoreValueBox from "./CoreValueBox";
import ActivityBox from "./ActivityBox";
import ConnectionLines from "./ConnectionLines";
import { coreValues, activities, connections } from "../data/core-values";

export default function MapCanvas({
  zoom,
}: {
  zoom: number;
  setZoom: (value: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null
  );
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [windowWidth, setWindowWidth] = useState(0);
  const [minHeight, setMinHeight] = useState(600);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setSize({ width, height: minHeight });
      }
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [minHeight]);

  // Toggle selection
  const handleActivityClick = (id: string) => {
    setSelectedActivityId((prev) => (prev === id ? null : id));
  };

  function toPosition(
    x: number,
    y: number,
    width: number,
    height: number,
    zoom: number
  ) {
    const baseSpacing = windowWidth / 10;
    const xspacing = baseSpacing * zoom;
    const yspacing =
      windowWidth < 768 ? baseSpacing * zoom * 2 : baseSpacing * zoom;

    return {
      x: width / 2 + x * xspacing,
      y: height / 2 + y * yspacing,
    };
  }

  // Calculate dynamic height based on element positions
  useEffect(() => {
    const allElements = [...coreValues, ...activities];
    if (allElements.length > 0 && size.width > 0) {
      const maxY = Math.max(
        ...allElements.map((el) => {
          const pos = toPosition(el.x, el.y, size.width, minHeight, zoom);
          return pos.y;
        })
      );
      const calculatedHeight = Math.max(400, maxY);
      setMinHeight(calculatedHeight);
    }
  }, [size.width, zoom, windowWidth]);

  return (
    <div
      className="relative w-full overflow-visible"
      style={{ minHeight: `${minHeight}px` }}>
      <div ref={containerRef} className="w-full relative">
        <ConnectionLines selectedActivityId={selectedActivityId} zoom={zoom} />

        {coreValues.map((val) => {
          const isHighlighted = selectedActivityId
            ? connections.some(
                (conn) =>
                  (conn.from === selectedActivityId && conn.to === val.id) ||
                  (conn.to === selectedActivityId && conn.from === val.id)
              )
            : false;
          const pos = toPosition(val.x, val.y, size.width, size.height, zoom);
          return (
            <CoreValueBox
              key={val.id}
              {...val}
              {...pos}
              isHighlighted={isHighlighted}
            />
          );
        })}

        {activities.map((act) => (
          <ActivityBox
            key={act.id}
            {...act}
            {...toPosition(act.x, act.y, size.width, size.height, zoom)}
            isSelected={selectedActivityId === act.id}
            onClick={() => handleActivityClick(act.id)}
          />
        ))}
      </div>
    </div>
  );
}
