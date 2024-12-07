import React from 'react';
import { useTemplateStore } from '../../../store/templateStore';

export const PreviewCanvas: React.FC = () => {
  const { activeTemplate } = useTemplateStore();

  if (!activeTemplate) {
    return (
      <div className="w-[794px] h-[1123px] bg-white mx-auto flex items-center justify-center">
        <p className="text-gray-400">No template selected</p>
      </div>
    );
  }

  return (
    <div 
      id="pdf-canvas"
      className="relative w-[794px] h-[1123px] bg-white mx-auto"
      style={{ 
        transform: 'scale(0.5)',
        transformOrigin: 'top center',
      }}
    >
      {activeTemplate.elements.map((element) => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: `${element.position.x}px`,
            top: `${element.position.y}px`,
            width: `${element.position.width}px`,
            height: `${element.position.height}px`,
            transform: `rotate(${element.rotation || 0}deg)`,
            ...element.style,
          }}
        >
          {element.content}
        </div>
      ))}
    </div>
  );
};