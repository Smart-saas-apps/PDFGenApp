import React, { useCallback } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { useTemplateStore } from '../../store/templateStore';
import { TemplateElement } from '../../types';
import 'react-resizable/css/styles.css';

interface DraggableElementProps {
  element: TemplateElement;
  children: React.ReactNode;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  children,
}) => {
  const { updateElement, setSelectedElementId, selectedElementId } = useTemplateStore();

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

  const handleResize = useCallback(
    (_: React.SyntheticEvent, data: ResizeCallbackData) => {
      updateElement(element.id, {
        size: {
          width: data.size.width,
          height: data.size.height,
        },
      });
    },
    [element.id, updateElement]
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElementId(element.id);
  };

  const isSelected = selectedElementId === element.id;

  return (
    <Draggable
      position={element.position}
      onDrag={handleDrag}
      bounds="parent"
      grid={[5, 5]}
      handle=".drag-handle"
    >
      <div className="absolute">
        <ResizableBox
          width={element.size.width}
          height={element.size.height}
          onResize={handleResize}
          minConstraints={[50, 50]}
          maxConstraints={[1000, 1000]}
          resizeHandles={['se', 'sw', 'ne', 'nw', 'e', 'w', 'n', 's']}
          handle={(handleAxis, ref) => (
            <div
              ref={ref}
              className={`resizable-handle handle-${handleAxis} ${
                isSelected ? 'visible' : 'invisible'
              }`}
            />
          )}
        >
          <div
            onClick={handleClick}
            className={`relative w-full h-full drag-handle group ${
              isSelected ? 'ring-2 ring-blue-500' : ''
            }`}
            style={{
              cursor: 'move',
              zIndex: element.zIndex || 0,
            }}
          >
            {children}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};
