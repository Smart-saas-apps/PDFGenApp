import { TemplateElement } from '../types';

export const generateDefaultElement = (
  type: TemplateElement['type'],
  content: string
): TemplateElement => {
  return {
    id: crypto.randomUUID(),
    type,
    content,
    style: {
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
    },
    position: {
      x: 50,
      y: 50,
      width: 200,
      height: 50,
    },
  };
};