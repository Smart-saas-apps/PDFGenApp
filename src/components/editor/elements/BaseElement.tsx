import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TemplateElement } from '../../../types';
import { useTemplateStore } from '../../../store/templateStore';

interface BaseElementProps {
  element: TemplateElement;
  children: React.ReactNode;
}

export const BaseElement: React.FC<BaseElementProps> = ({ element, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });
  
  const { selectElement } = useTemplateStore();
  
  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'absolute' as const,
    left: element.position.x,
    top: element.position.y,
    width: element.position.width,
    height: element.position.height,
    transform: `rotate(${element.position.rotation || 0}deg)`,
    ...element.style,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => selectElement(element.id)}
      {...attributes}
      {...listeners}
      className="relative group"
    >
      {children}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 pointer-events-none" />
    </div>
  );
};
