import { useTemplateStore } from '../../../../store/templateStore';

export const useStyleActions = () => {
  const { updateElement, activeTemplate } = useTemplateStore();

  const updateSelectedElement = (styleUpdates: Record<string, any>) => {
    if (!activeTemplate?.selectedElementId) return;
    
    updateElement(activeTemplate.selectedElementId, {
      style: styleUpdates,
    });
  };

  const updateFontSize = (size: number) => {
    updateSelectedElement({ fontSize: size });
  };

  const updateFontFamily = (family: string) => {
    updateSelectedElement({ fontFamily: family });
  };

  const updateColor = (color: string) => {
    updateSelectedElement({ color });
  };

  return {
    updateFontSize,
    updateFontFamily,
    updateColor,
  };
};