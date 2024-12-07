import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Button } from '../ui/Button';
import {
  DocumentTextIcon,
  PhotoIcon,
  Square2StackIcon,
  CircleStackIcon,
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

  const handleAddRectangle = () => {
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

  const handleAddCircle = () => {
    addElement({
      type: 'shape',
      shape: 'circle',
      content: '',
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
      style: {},
      backgroundColor: '#4B5563',
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Elements</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleAddText}
          icon={<DocumentTextIcon className="w-5 h-5" />}
        >
          Add Text
        </Button>
        <Button
          onClick={handleAddImage}
          icon={<PhotoIcon className="w-5 h-5" />}
        >
          Add Image
        </Button>
        <Button
          onClick={handleAddRectangle}
          icon={<Square2StackIcon className="w-5 h-5" />}
        >
          Add Rectangle
        </Button>
        <Button
          onClick={handleAddCircle}
          icon={<CircleStackIcon className="w-5 h-5" />}
        >
          Add Circle
        </Button>
      </div>
    </div>
  );
};