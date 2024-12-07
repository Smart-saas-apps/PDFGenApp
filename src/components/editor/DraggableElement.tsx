import React, { useCallback } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useTemplateStore } from '../../store/templateStore';
import { TemplateElement } from '../../types';

interface DraggableElementProps {
  element: TemplateElement;
  children: React.ReactNode;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  children,
}) => {
  const { updateElement, setSelectedElementId } = useTemplateStore();

  const handleDrag = useCallback(
    (_: DraggableEvent, data: DraggableData) => {
      updateElement(element.id, {
        position: {
          x: data.x,
          y: data.y,
        },
      });
    },
    [element.id, updateElement]
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElementId(element.id);
  };

  return (
    <Draggable
      position={element.position}
      onDrag={handleDrag}
      bounds="parent"
      grid={[5, 5]} // Snap to grid
    >
      <div
        onClick={handleClick}
        className="absolute cursor-move"
        style={{
          width: element.size.width,
          height: element.size.height,
          zIndex: element.zIndex || 0,
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};
