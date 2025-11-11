"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";

interface Position {
  x: number;
  y: number;
}

interface DraggableContextType {
  items: Record<string, Position>;
  updateItemPosition: (id: string, position: Position) => void;
}

const DraggableContext = createContext<DraggableContextType | undefined>(
  undefined
);

export const useDraggableContext = () => {
  const context = useContext(DraggableContext);
  if (!context) {
    throw new Error(
      "useDraggableContext must be used within DraggableProvider"
    );
  }
  return context;
};

interface DraggableProviderProps {
  children: React.ReactNode;
  initialPositions?: Record<string, Position>;
}

export const DraggableProvider: React.FC<DraggableProviderProps> = ({
  children,
  initialPositions = {},
}) => {
  const [items, setItems] =
    useState<Record<string, Position>>(initialPositions);

  const updateItemPosition = useCallback((id: string, position: Position) => {
    setItems((prev) => ({
      ...prev,
      [id]: position,
    }));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 200ms delay before touch drag starts (better for scrolling)
        tolerance: 8, // 8px tolerance for touch movement
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    if (!active.id) return;

    const id = active.id as string;
    const currentPos = items[id] || { x: 0, y: 0 };

    // Only update position on drag end, not during drag
    setItems((prev) => ({
      ...prev,
      [id]: {
        x: currentPos.x + delta.x,
        y: currentPos.y + delta.y,
      },
    }));
  };

  return (
    <DraggableContext.Provider value={{ items, updateItemPosition }}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {children}
      </DndContext>
    </DraggableContext.Provider>
  );
};
