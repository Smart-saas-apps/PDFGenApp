import { TemplateElement } from '../../../../types';

export const useElementStyles = (element: TemplateElement) => {
  return {
    position: 'absolute' as const,
    left: element.position.x,
    top: element.position.y,
    width: element.position.width,
    height: element.position.height,
    ...element.style,
  };
};