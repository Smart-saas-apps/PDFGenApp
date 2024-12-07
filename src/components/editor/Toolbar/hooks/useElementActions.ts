import { useTemplateStore } from '../../../../store/templateStore';
import { generateDefaultElement } from '../../../../utils/elementUtils';

export const useElementActions = () => {
  const { addElement } = useTemplateStore();

  const addTextElement = () => {
    addElement(generateDefaultElement('text', 'New Text'));
  };

  const addImageElement = () => {
    addElement(generateDefaultElement('image', 'Image Placeholder'));
  };

  const addShapeElement = () => {
    addElement(generateDefaultElement('shape', 'Rectangle'));
  };

  return {
    addTextElement,
    addImageElement,
    addShapeElement,
  };
};