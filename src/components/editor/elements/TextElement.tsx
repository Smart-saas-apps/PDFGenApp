import React from 'react';
import { TemplateElement } from '../../../types';
import { BaseElement } from './BaseElement';
import { useTemplateStore } from '../../../store/templateStore';

interface TextElementProps {
  element: TemplateElement;
}

export const TextElement: React.FC<TextElementProps> = ({ element }) => {
  const { updateElement } = useTemplateStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateElement(element.id, { content: e.target.value });
  };

  return (
    <BaseElement element={element}>
      <textarea
        value={element.content}
        onChange={handleChange}
        className="w-full h-full resize-none border-none focus:outline-none bg-transparent p-2"
        style={{
          fontFamily: element.style.fontFamily,
          fontSize: element.style.fontSize,
          fontWeight: element.style.fontWeight,
          color: element.style.color,
          textAlign: element.style.textAlign as any,
        }}
      />
    </BaseElement>
  );
};
