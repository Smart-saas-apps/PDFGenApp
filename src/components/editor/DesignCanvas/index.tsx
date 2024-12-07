import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { useTemplateStore } from '../../../store/templateStore';
import { CanvasElement } from './CanvasElement';
import { useDragEndHandler } from './hooks/useDragEndHandler';

export const DesignCanvas: React.FC = () => {
  const { activeTemplate } = useTemplateStore();
  const { handleDragEnd } = useDragEndHandler();

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-[794px] h-[1123px] bg-white shadow-lg mx-auto">
        {activeTemplate?.elements.map((element) => (
          <CanvasElement key={element.id} element={element} />
        ))}
      </div>
    </DndContext>
  );
};