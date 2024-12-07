import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Button } from '../ui/Button';
import {
  DocumentTextIcon,
  PhotoIcon,
  SquaresPlusIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

export const Toolbar: React.FC = () => {
  const { addElement } = useTemplateStore();

  const handleAddText = () => {
    addElement({
      type: 'text',
      content: 'New Text',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 50 },
      style: {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#000000',
      },
    });
  };

  const handleAddImage = () => {
    // For demo, using a placeholder image
    addElement({
      type: 'image',
      content: 'https://via.placeholder.com/200',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 200 },
      style: {},
      alt: 'Placeholder image',
    });
  };

  const handleAddShape = () => {
    addElement({
      type: 'shape',
      shape: 'rectangle',
      content: '',
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
      style: {},
      backgroundColor: '#4B5563',
    });
  };

  const handleResetCanvas = () => {
    // Implement reset canvas logic here
  };

  const handleExportPDF = () => {
    // Implement export PDF logic here
  };

  return (
    <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          onClick={handleAddText}
        >
          <DocumentTextIcon className="w-4 h-4" />
          Text
        </button>
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          onClick={handleAddImage}
        >
          <PhotoIcon className="w-4 h-4" />
          Image
        </button>
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          onClick={handleAddShape}
        >
          <SquaresPlusIcon className="w-4 h-4" />
          Shape
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          onClick={handleResetCanvas}
        >
          <ArrowPathIcon className="w-4 h-4" />
          Reset
        </button>
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
          onClick={handleExportPDF}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export PDF
        </button>
      </div>
    </div>
  );
};