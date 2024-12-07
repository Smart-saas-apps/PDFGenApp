import React from 'react';
import { FaFont, FaImage, FaTable, FaQrcode, FaList, FaTrash, FaCopy,
  FaSquare, FaCircle, FaCaretUp, FaStar, FaGem, FaMinus, FaArrowRight,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaBold, FaItalic, FaUnderline,
  FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useTemplateStore } from '../../store/templateStore';
import { NewElement } from '../../types';

const Toolbar: React.FC = () => {
  const { addElement, selectedElementId, deleteElement, updateElement } = useTemplateStore();

  const handleAddText = () => {
    const newElement: NewElement = {
      type: 'text',
      content: 'New Text',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 },
      style: { fontSize: '16px', fontFamily: 'Arial' },
      zIndex: 1,
    };
    addElement(newElement);
  };

  const handleAddImage = () => {
    const newElement: NewElement = {
      type: 'image',
      content: 'placeholder.jpg',
      alt: 'Image description',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 200 },
      style: {},
      zIndex: 1,
    };
    addElement(newElement);
  };

  const handleAddShape = (shape: 'rectangle' | 'circle' | 'triangle' | 'star' | 'hexagon' | 'line' | 'arrow') => {
    const newElement: NewElement = {
      type: 'shape',
      shape,
      content: '',
      backgroundColor: '#e2e8f0',
      borderColor: '#64748b',
      borderWidth: 1,
      rotation: 0,
      position: { x: 100, y: 100 },
      size: { width: 100, height: 100 },
      style: {},
      zIndex: 1,
    };
    addElement(newElement);
  };

  const handleAddTable = () => {
    const newElement: NewElement = {
      type: 'table',
      content: [['Cell 1', 'Cell 2'], ['Cell 3', 'Cell 4']],
      position: { x: 100, y: 100 },
      size: { width: 300, height: 200 },
      style: {},
      zIndex: 1,
    };
    addElement(newElement);
  };

  const handleAddQRCode = () => {
    const newElement: NewElement = {
      type: 'qrcode',
      content: 'https://example.com',
      position: { x: 100, y: 100 },
      size: { width: 150, height: 150 },
      style: {},
      zIndex: 1,
    };
    addElement(newElement);
  };

  const handleAddList = () => {
    const newElement: NewElement = {
      type: 'list',
      content: ['Item 1', 'Item 2', 'Item 3'],
      position: { x: 100, y: 100 },
      size: { width: 200, height: 150 },
      style: {},
      zIndex: 1,
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
      // Logic to duplicate the selected element
    }
  };

  const handleTextStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (selectedElementId) {
      updateElement(selectedElementId, {
        style: { fontWeight: style === 'bold' ? 'bold' : undefined,
                fontStyle: style === 'italic' ? 'italic' : undefined,
                textDecoration: style === 'underline' ? 'underline' : undefined }
      });
    }
  };

  const handleAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    if (selectedElementId) {
      updateElement(selectedElementId, {
        style: { textAlign: alignment }
      });
    }
  };

  const handleLayer = (direction: 'up' | 'down') => {
    if (selectedElementId) {
      updateElement(selectedElementId, {
        zIndex: direction === 'up' ? 1 : -1
      });
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white shadow-md">
      {/* Basic Elements */}
      <div className="flex items-center gap-2">
        <button onClick={handleAddText} className="p-1 hover:bg-gray-100 rounded" title="Add Text">
          <FaFont className="w-4 h-4" />
        </button>
        <button onClick={handleAddImage} className="p-1 hover:bg-gray-100 rounded" title="Add Image">
          <FaImage className="w-4 h-4" />
        </button>
        <button onClick={handleAddTable} className="p-1 hover:bg-gray-100 rounded" title="Add Table">
          <FaTable className="w-4 h-4" />
        </button>
        <button onClick={handleAddQRCode} className="p-1 hover:bg-gray-100 rounded" title="Add QR Code">
          <FaQrcode className="w-4 h-4" />
        </button>
        <button onClick={handleAddList} className="p-1 hover:bg-gray-100 rounded" title="Add List">
          <FaList className="w-4 h-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-200" />

      {/* Shapes */}
      <div className="flex items-center gap-2">
        <button onClick={() => handleAddShape('rectangle')} className="p-1 hover:bg-gray-100 rounded" title="Rectangle">
          <FaSquare className="w-4 h-4" />
        </button>
        <button onClick={() => handleAddShape('circle')} className="p-1 hover:bg-gray-100 rounded" title="Circle">
          <FaCircle className="w-4 h-4" />
        </button>
        <button onClick={() => handleAddShape('triangle')} className="p-1 hover:bg-gray-100 rounded" title="Triangle">
          <FaCaretUp className="w-4 h-4" />
        </button>
        <button onClick={() => handleAddShape('star')} className="p-1 hover:bg-gray-100 rounded" title="Star">
          <FaStar className="w-4 h-4" />
        </button>
        <button onClick={() => handleAddShape('hexagon')} className="p-1 hover:bg-gray-100 rounded" title="Hexagon">
          <FaGem className="w-4 h-4" />
        </button>
        <button onClick={() => handleAddShape('line')} className="p-1 hover:bg-gray-100 rounded" title="Line">
          <FaMinus className="w-4 h-4" />
        </button>
        <button onClick={() => handleAddShape('arrow')} className="p-1 hover:bg-gray-100 rounded" title="Arrow">
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-200" />

      {/* Text Formatting */}
      <div className="flex items-center gap-2">
        <button onClick={() => handleTextStyle('bold')} className="p-1 hover:bg-gray-100 rounded" title="Bold">
          <FaBold className="w-4 h-4" />
        </button>
        <button onClick={() => handleTextStyle('italic')} className="p-1 hover:bg-gray-100 rounded" title="Italic">
          <FaItalic className="w-4 h-4" />
        </button>
        <button onClick={() => handleTextStyle('underline')} className="p-1 hover:bg-gray-100 rounded" title="Underline">
          <FaUnderline className="w-4 h-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-200" />

      {/* Alignment */}
      <div className="flex items-center gap-2">
        <button onClick={() => handleAlignment('left')} className="p-1 hover:bg-gray-100 rounded" title="Align Left">
          <FaAlignLeft className="w-4 h-4" />
        </button>
        <button onClick={() => handleAlignment('center')} className="p-1 hover:bg-gray-100 rounded" title="Align Center">
          <FaAlignCenter className="w-4 h-4" />
        </button>
        <button onClick={() => handleAlignment('right')} className="p-1 hover:bg-gray-100 rounded" title="Align Right">
          <FaAlignRight className="w-4 h-4" />
        </button>
        <button onClick={() => handleAlignment('justify')} className="p-1 hover:bg-gray-100 rounded" title="Justify">
          <FaAlignJustify className="w-4 h-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-200" />

      {/* Layer Controls */}
      <div className="flex items-center gap-2">
        <button onClick={() => handleLayer('up')} className="p-1 hover:bg-gray-100 rounded" title="Bring Forward">
          <FaArrowUp className="w-4 h-4" />
        </button>
        <button onClick={() => handleLayer('down')} className="p-1 hover:bg-gray-100 rounded" title="Send Backward">
          <FaArrowDown className="w-4 h-4" />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-200" />

      {/* Element Actions */}
      <div className="flex items-center gap-2">
        <button onClick={handleDeleteElement} className="p-1 hover:bg-gray-100 rounded" title="Delete">
          <FaTrash className="w-4 h-4" />
        </button>
        <button onClick={handleDuplicateElement} className="p-1 hover:bg-gray-100 rounded" title="Duplicate">
          <FaCopy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;