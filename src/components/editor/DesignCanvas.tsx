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
      case 'table':
        content = (
          <table className="w-full h-full border-collapse" style={elementStyle}>
            <tbody>
              {(element.content as string[][]).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 p-2"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newContent = [...element.content];
                        newContent[rowIndex][cellIndex] = e.currentTarget.textContent || '';
                        useTemplateStore.getState().updateElement(element.id, {
                          content: newContent
                        });
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
        break;
      case 'qrcode':
        content = (
          <div className="w-full h-full">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                element.content
              )}`}
              alt="QR Code"
              className="w-full h-full"
            />
          </div>
        );
        break;
      case 'list':
        content = (
          <ul className="w-full h-full list-disc pl-5" style={elementStyle}>
            {(element.content as string[]).map((item, index) => (
              <li
                key={index}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newContent = [...element.content];
                  newContent[index] = e.currentTarget.textContent || '';
                  useTemplateStore.getState().updateElement(element.id, {
                    content: newContent
                  });
                }}
              >
                {item}
              </li>
            ))}
          </ul>
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