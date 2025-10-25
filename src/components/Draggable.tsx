"use client";

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useDraggableContext } from '@/context/DraggableContext';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const Draggable: React.FC<DraggableProps> = ({ id, children, className = '' }) => {
  const { items } = useDraggableContext();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const position = items[id] || { x: 0, y: 0 };

  // Combine stored position with current drag transform
  const x = position.x + (transform?.x || 0);
  const y = position.y + (transform?.y || 0);

  const style: React.CSSProperties = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
    position: 'relative',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};
