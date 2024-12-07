import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Button } from '../ui/Button';
import {
  DocumentTextIcon,
  PhotoIcon,
  SquaresPlusIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  TableCellsIcon,
  QrCodeIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { NewTextElement, NewImageElement, NewShapeElement, NewTableElement, NewQRCodeElement, NewListElement } from '../../types';

export const Toolbar: React.FC = () => {
  const { addElement, deleteElement, selectedElementId } = useTemplateStore();

  const handleAddText = () => {
    const newElement: NewTextElement = {
      type: 'text',
      content: 'New Text',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 50 },
      style: {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#000000',
      },
    };
    addElement(newElement);
  };

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newElement: NewImageElement = {
            type: 'image',
            content: e.target?.result as string,
            position: { x: 50, y: 50 },
            size: { width: 200, height: 200 },
            style: {},
            alt: file.name,
          };
          addElement(newElement);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddShape = () => {
    const newElement: NewShapeElement = {
      type: 'shape',
      shape: 'rectangle',
      content: '',
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
      style: {},
      backgroundColor: '#4B5563',
    };
    addElement(newElement);
  };

  const handleAddTable = () => {
    const newElement: NewTableElement = {
      type: 'table',
      content: [['Header 1', 'Header 2'], ['Cell 1', 'Cell 2']],
      position: { x: 50, y: 50 },
      size: { width: 300, height: 150 },
      style: {
        borderCollapse: 'collapse',
        border: '1px solid #ccc',
      },
    };
    addElement(newElement);
  };

  const handleAddQRCode = () => {
    const newElement: NewQRCodeElement = {
      type: 'qrcode',
      content: 'https://example.com',
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
      style: {},
    };
    addElement(newElement);
  };

  const handleAddList = () => {
    const newElement: NewListElement = {
      type: 'list',
      content: ['Item 1', 'Item 2', 'Item 3'],
      position: { x: 50, y: 50 },
      size: { width: 200, height: 150 },
      style: {
        listStyle: 'disc',
        paddingLeft: '20px',
      },
    };
    addElement(newElement);
  };

  const handleDeleteElement = () => {
    if (selectedElementId) {
      deleteElement(selectedElementId);
    }
  };

  const handleDuplicateElement = () => {
    if (selectedElementId) {
      const element = useTemplateStore.getState().activeTemplate?.elements.find(
        (el) => el.id === selectedElementId
      );
      if (element) {
        const { id, ...elementWithoutId } = element;
        addElement({
          ...elementWithoutId,
          position: {
            x: element.position.x + 20,
            y: element.position.y + 20,
          },
        });
      }
    }
  };

  return (
    <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-3">
        {/* Insert Elements */}
        <div className="flex items-center gap-2 border-r pr-3 border-gray-200">
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={handleAddText}
            title="Add Text"
          >
            <DocumentTextIcon className="w-4 h-4" />
            Text
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={handleAddImage}
            title="Add Image"
          >
            <PhotoIcon className="w-4 h-4" />
            Image
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={handleAddShape}
            title="Add Shape"
          >
            <SquaresPlusIcon className="w-4 h-4" />
            Shape
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={handleAddTable}
            title="Add Table"
          >
            <TableCellsIcon className="w-4 h-4" />
            Table
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={handleAddQRCode}
            title="Add QR Code"
          >
            <QrCodeIcon className="w-4 h-4" />
            QR Code
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            onClick={handleAddList}
            title="Add List"
          >
            <ListBulletIcon className="w-4 h-4" />
            List
          </button>
        </div>

        {/* Element Actions */}
        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
              selectedElementId
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            } rounded-md transition-colors`}
            onClick={handleDeleteElement}
            disabled={!selectedElementId}
            title="Delete Element"
          >
            <TrashIcon className="w-4 h-4" />
            Delete
          </button>
          <button
            className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
              selectedElementId
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            } rounded-md transition-colors`}
            onClick={handleDuplicateElement}
            disabled={!selectedElementId}
            title="Duplicate Element"
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
            Duplicate
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => {}}
          title="Reset Canvas"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Reset
        </button>
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
          onClick={() => {}}
          title="Export PDF"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export PDF
        </button>
      </div>
    </div>
  );
};