import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { TemplateElement } from '../../../types';
import { useElementStyles } from './hooks/useElementStyles';

interface CanvasElementProps {
  element: TemplateElement;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({ element }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: element.id,
  });

  const styles = useElementStyles(element);

  return (
    <div
      ref={setNodeRef}
      style={styles}
      {...attributes}
      {...listeners}
    >
      {element.content}
    </div>
  );
};