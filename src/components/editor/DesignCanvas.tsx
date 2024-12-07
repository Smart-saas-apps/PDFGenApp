import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { TemplateElement } from '../../types';
import { DraggableElement } from './DraggableElement';

export const DesignCanvas: React.FC = () => {
  const { activeTemplate, setSelectedElementId } = useTemplateStore();

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedElementId(null);
    }
  };

  const renderElement = (element: TemplateElement) => {
    const elementStyle = {
      ...element.style,
    };

    let content: React.ReactNode;
    switch (element.type) {
      case 'text':
        content = (
          <div
            style={elementStyle}
            className="w-full h-full flex items-center"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newContent = e.currentTarget.textContent || '';
              if (newContent !== element.content) {
                useTemplateStore.getState().updateElement(element.id, {
                  content: newContent
                });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
          >
            {element.content}
          </div>
        );
        break;
      case 'image':
        content = (
          <img
            src={element.content}
            alt={element.alt || ''}
            style={elementStyle}
            className="w-full h-full object-cover"
          />
        );
        break;
      case 'shape':
        content = (
          <div
            style={{
              ...elementStyle,
              backgroundColor: element.backgroundColor || '#000000',
              borderRadius: element.shape === 'circle' ? '50%' : undefined,
              width: '100%',
              height: '100%',
            }}
          />
        );
        break;
      default:
        return null;
    }

    return (
      <DraggableElement key={element.id} element={element}>
        {content}
      </DraggableElement>
    );
  };

  return (
    <div
      className="relative w-full h-full bg-white shadow-sm"
      id="pdf-canvas"
      onClick={handleCanvasClick}
    >
      {activeTemplate ? (
        <div className="relative w-full h-full">
          {/* Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
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