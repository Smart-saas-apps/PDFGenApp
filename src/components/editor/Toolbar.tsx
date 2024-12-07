import React from 'react';
import { useTemplateStore } from '../../store/templateStore';

export const Toolbar: React.FC = () => {
  const { addElement } = useTemplateStore();

  const addTextElement = () => {
    addElement({
      id: crypto.randomUUID(),
      type: 'text',
      content: 'New Text',
      style: {
        fontSize: 16,
        fontFamily: 'Arial',
        color: '#000000',
      },
      position: {
        x: 50,
        y: 50,
        width: 200,
        height: 50,
      },
    });
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white border-b">
      <button
        onClick={addTextElement}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Text
      </button>
      {/* Add more toolbar buttons here */}
    </div>
  );
};