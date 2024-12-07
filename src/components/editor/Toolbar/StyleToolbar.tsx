import React from 'react';
import { useStyleActions } from './hooks/useStyleActions';

export const StyleToolbar: React.FC = () => {
  const { updateFontSize, updateFontFamily, updateColor } = useStyleActions();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white border-b">
      <select
        onChange={(e) => updateFontSize(parseInt(e.target.value))}
        className="rounded border-gray-300"
      >
        {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
      <select
        onChange={(e) => updateFontFamily(e.target.value)}
        className="rounded border-gray-300"
      >
        {['Arial', 'Times New Roman', 'Helvetica', 'Courier'].map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      <input
        type="color"
        onChange={(e) => updateColor(e.target.value)}
        className="rounded border-gray-300"
      />
    </div>
  );
};