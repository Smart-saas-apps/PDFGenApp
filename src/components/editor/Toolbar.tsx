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
    <div className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            icon={<DocumentTextIcon className="w-5 h-5" />}
            title="Add Text"
            onClick={handleAddText}
          >
            Text
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<PhotoIcon className="w-5 h-5" />}
            title="Add Image"
            onClick={handleAddImage}
          >
            Image
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<SquaresPlusIcon className="w-5 h-5" />}
            title="Add Shape"
            onClick={handleAddShape}
          >
            Shape
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowPathIcon className="w-5 h-5" />}
          title="Reset Canvas"
          onClick={handleResetCanvas}
        >
          Reset
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={<ArrowDownTrayIcon className="w-5 h-5" />}
          title="Export PDF"
          onClick={handleExportPDF}
        >
          Export PDF
        </Button>
      </div>
    </div>
  );
};