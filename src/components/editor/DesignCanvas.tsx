import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { BaseElement } from './elements/BaseElement';
import { TextElement } from './elements/TextElement';
import { ImageElement } from './elements/ImageElement';
import { ShapeElement } from './elements/ShapeElement';
import { TableElement } from './elements/TableElement';

const elementComponents = {
  text: TextElement,
  image: ImageElement,
  shape: ShapeElement,
  table: TableElement,
};

export const DesignCanvas: React.FC = () => {
  const { activeTemplate, setSelectedElementId } = useTemplateStore();

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedElementId(null);
    }
  };

  return (
    <div className="relative h-full min-h-[800px] bg-white shadow-inner">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 bg-[length:40px_40px] bg-grid-pattern opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                           linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
        }}
      />
      
      {/* Canvas Content */}
      <div
        className="relative h-full w-full"
        onClick={handleCanvasClick}
      >
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-center">
          <div className="bg-gray-50 px-3 py-1.5 rounded-full text-sm text-gray-500 font-medium shadow-sm">
            A4 - Portrait
          </div>
        </div>

        {/* Elements */}
        {activeTemplate?.elements.map((element) => {
          const ElementComponent = elementComponents[element.type];
          return (
            <BaseElement
              key={element.id}
              element={element}
            >
              <ElementComponent element={element} />
            </BaseElement>
          );
        })}

        {/* Empty State */}
        {(!activeTemplate?.elements || activeTemplate.elements.length === 0) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg
                  className="h-full w-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No elements
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding some elements to your template
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};