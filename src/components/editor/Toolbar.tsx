import React, { useRef } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Button } from '../ui/Button';
import {
  DocumentTextIcon,
  PhotoIcon,
  TableCellsIcon,
  Square2StackIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export const Toolbar: React.FC = () => {
  const { addElement, activeTemplate, duplicateElement, removeElement } = useTemplateStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddElement = (type: 'text' | 'image' | 'shape' | 'table') => {
    let defaultProps = {};
    
    switch (type) {
      case 'text':
        defaultProps = {
          content: 'New Text',
          style: {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#000000',
          },
        };
        break;
      case 'table':
        defaultProps = {
          content: JSON.stringify({
            rows: 3,
            columns: 3,
            data: Array(3).fill(Array(3).fill('')),
          }),
        };
        break;
      case 'shape':
        defaultProps = {
          content: 'rectangle',
          style: {
            backgroundColor: '#E5E7EB',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#D1D5DB',
          },
        };
        break;
    }
    
    addElement(type, defaultProps);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addElement('image', {
          content: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const selectedElementId = activeTemplate?.selectedElementId;

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => handleAddElement('text')}
          icon={<DocumentTextIcon className="w-5 h-5" />}
        >
          Text
        </Button>
        
        <div>
          <Button
            onClick={handleImageButtonClick}
            icon={<PhotoIcon className="w-5 h-5" />}
          >
            Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        
        <Button
          onClick={() => handleAddElement('shape')}
          icon={<Square2StackIcon className="w-5 h-5" />}
        >
          Shape
        </Button>
        
        <Button
          onClick={() => handleAddElement('table')}
          icon={<TableCellsIcon className="w-5 h-5" />}
        >
          Table
        </Button>
      </div>
      
      {selectedElementId && (
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            onClick={() => duplicateElement(selectedElementId)}
            icon={<DocumentDuplicateIcon className="w-5 h-5" />}
          >
            Duplicate
          </Button>
          
          <Button
            variant="error"
            onClick={() => removeElement(selectedElementId)}
            icon={<TrashIcon className="w-5 h-5" />}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};