"use client";

import React, { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useDraggableContext } from '@/context/DraggableContext';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const Draggable: React.FC<DraggableProps> = ({ id, children, className = '' }) => {
  const { items } = useDraggableContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: isMobile, // Disable dragging on mobile
  });

  const position = items[id] || { x: 0, y: 0 };

  // Combine stored position with current drag transform
  const x = position.x + (transform?.x || 0);
  const y = position.y + (transform?.y || 0);

  const style: React.CSSProperties = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
    position: 'relative',
    cursor: isMobile ? 'default' : (isDragging ? 'grabbing' : 'grab'),
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...(isMobile ? {} : listeners)} // Only apply listeners on desktop
      {...attributes}
    >
      {children}
    </div>
  );
};
