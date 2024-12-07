import React from 'react';
import { PreviewToolbar } from './PreviewToolbar';
import { PreviewCanvas } from './PreviewCanvas';

export const PDFPreview: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PreviewToolbar />
      <PreviewCanvas />
    </div>
  );
};