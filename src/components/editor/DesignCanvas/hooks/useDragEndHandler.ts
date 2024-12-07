import { DragEndEvent } from '@dnd-kit/core';
import { useTemplateStore } from '../../../../store/templateStore';

export const useDragEndHandler = () => {
  const { updateElement } = useTemplateStore();

  const handleDragEnd = (event: DragEndEvent) => {
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
  };

  return { handleDragEnd };
};