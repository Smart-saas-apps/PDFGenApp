import React from 'react';
import { TemplateElement } from '../../../types';
import { BaseElement } from './BaseElement';

interface ShapeElementProps {
  element: TemplateElement;
}

export const ShapeElement: React.FC<ShapeElementProps> = ({ element }) => {
  // The content field will contain the shape type: 'rectangle', 'circle', etc.
  return (
    <BaseElement element={element}>
      <div
        className="w-full h-full"
        style={{
          backgroundColor: element.style.backgroundColor,
          borderWidth: element.style.borderWidth,
          borderStyle: element.style.borderStyle,
          borderColor: element.style.borderColor,
          borderRadius: element.content === 'circle' ? '50%' : undefined,
        }}
      />
    </BaseElement>
  );
};
