import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { TemplateElement } from '../../types';

export const DesignCanvas: React.FC = () => {
  const { activeTemplate } = useTemplateStore();

  const renderElement = (element: TemplateElement) => {
    const style = {
      position: 'absolute',
      left: `${element.position.x}px`,
      top: `${element.position.y}px`,
      width: `${element.size.width}px`,
      height: `${element.size.height}px`,
      ...element.style,
    } as React.CSSProperties;

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={style}
            className="cursor-pointer"
          >
            {element.content}
          </div>
        );
      case 'image':
        return (
          <img
            key={element.id}
            src={element.content}
            alt={element.alt || ''}
            style={style}
            className="cursor-pointer object-cover"
          />
        );
      case 'shape':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              backgroundColor: element.backgroundColor || '#000000',
              borderRadius: element.shape === 'circle' ? '50%' : undefined,
            }}
            className="cursor-pointer"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full bg-white shadow-sm" id="pdf-canvas">
      {activeTemplate ? (
        <div className="relative w-full h-full">
          {activeTemplate.elements.map(renderElement)}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No template selected
        </div>
      )}
    </div>
  );
};