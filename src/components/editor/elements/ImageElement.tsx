import React from 'react';
import { TemplateElement } from '../../../types';
import { BaseElement } from './BaseElement';

interface ImageElementProps {
  element: TemplateElement;
}

export const ImageElement: React.FC<ImageElementProps> = ({ element }) => {
  return (
    <BaseElement element={element}>
      <img
        src={element.content}
        alt="Template element"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </BaseElement>
  );
};
