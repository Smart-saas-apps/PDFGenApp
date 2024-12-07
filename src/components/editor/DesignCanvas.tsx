import React from 'react';
import { useDndMonitor, DndContext } from '@dnd-kit/core';
import { useTemplateStore } from '../../store/templateStore';
import { TemplateElement } from '../../types';

export const DesignCanvas: React.FC = () => {
  return (
    <DndContext>
      <CanvasContent />
    </DndContext>
  );
};

const CanvasContent: React.FC = () => {
  const { activeTemplate, updateElement } = useTemplateStore();

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (over) {
        updateElement(active.id as string, {
          position: {
            x: over.rect.left,
            y: over.rect.top,
            width: over.rect.width,
            height: over.rect.height,
          },
        });
      }
    },
  });

  return (
    <div className="relative w-[794px] h-[1123px] bg-white shadow-lg mx-auto">
      {activeTemplate?.elements.map((element: TemplateElement) => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: element.position.x,
            top: element.position.y,
            width: element.position.width,
            height: element.position.height,
            ...element.style,
          }}
        >
          {element.content}
        </div>
      ))}
    </div>
  );
};