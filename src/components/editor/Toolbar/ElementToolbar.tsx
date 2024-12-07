import React from 'react';
import { useElementActions } from './hooks/useElementActions';

export const ElementToolbar: React.FC = () => {
  const { addTextElement, addImageElement, addShapeElement } = useElementActions();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white border-b">
      <button
        onClick={addTextElement}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Text
      </button>
      <button
        onClick={addImageElement}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Image
      </button>
      <button
        onClick={addShapeElement}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Shape
      </button>
    </div>
  );
};