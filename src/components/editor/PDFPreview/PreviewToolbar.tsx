import React from 'react';
import { usePDFGeneration } from './hooks/usePDFGeneration';

export const PreviewToolbar: React.FC = () => {
  const { generatePDF } = usePDFGeneration();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white border-b">
      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Generate PDF
      </button>
    </div>
  );
};