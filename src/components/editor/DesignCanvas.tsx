import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTemplateStore } from '../../store/templateStore';
import { TemplateElement } from '../../types';
import { TextElement } from './elements/TextElement';
import { ImageElement } from './elements/ImageElement';
import { ShapeElement } from './elements/ShapeElement';
import { TableElement } from './elements/TableElement';

export const DesignCanvas: React.FC = () => {
  const { activeTemplate, moveElement } = useTemplateStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const elementId = active.id as string;
    const element = activeTemplate?.elements.find((el) => el.id === elementId);
    
    if (element) {
      moveElement(elementId, {
        x: element.position.x + delta.x,
        y: element.position.y + delta.y,
      });
    }
  };

  const renderElement = (element: TemplateElement) => {
    switch (element.type) {
      case 'text':
        return <TextElement key={element.id} element={element} />;
      case 'image':
        return <ImageElement key={element.id} element={element} />;
      case 'shape':
        return <ShapeElement key={element.id} element={element} />;
      case 'table':
        return <TableElement key={element.id} element={element} />;
      default:
        return null;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-[794px] h-[1123px] bg-white shadow-lg mx-auto">
        {activeTemplate?.elements.map(renderElement)}
      </div>
    </DndContext>
  );
};