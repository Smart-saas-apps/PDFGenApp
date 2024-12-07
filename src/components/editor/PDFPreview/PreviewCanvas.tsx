import React from 'react';
import { useTemplateStore } from '../../../store/templateStore';

export const PreviewCanvas: React.FC = () => {
  const { activeTemplate } = useTemplateStore();

  if (!activeTemplate) {
    return (
      <div className="w-[794px] h-[1123px] bg-white shadow-lg mx-auto flex items-center justify-center">
        <p className="text-gray-400">No template selected</p>
      </div>
    );
  }

  return (
    <div 
      id="pdf-canvas"
      className="relative w-[794px] h-[1123px] bg-white shadow-lg mx-auto"
    >
      {activeTemplate.elements.map((element) => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: element.position.x,
            top: element.position.y,
            width: element.position.width,
            height: element.position.height,
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