import React from 'react';
import { useTemplateStore } from '../../../store/templateStore';

export const PreviewCanvas: React.FC = () => {
  const { activeTemplate } = useTemplateStore();

  return (
    <div className="pdf-content bg-white shadow-lg p-4">
      {activeTemplate?.elements.map((element) => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: element.position.x,
            top: element.position.y,
            width: element.position.width,
            height: element.position.height,
            ...element.style,
          }}
        >
          {element.content}
        </div>
      ))}
    </div>
  );
};