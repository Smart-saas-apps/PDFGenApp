import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Button } from '../ui/Button';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export const PDFPreview: React.FC = () => {
  const { activeTemplate } = useTemplateStore();

  const handleDownload = () => {
    // TODO: Implement PDF download
    console.log('Downloading PDF...');
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Preview</h2>
        <Button
          onClick={handleDownload}
          icon={<DocumentArrowDownIcon className="w-5 h-5" />}
        >
          Download PDF
        </Button>
      </div>

      <div className="aspect-[1/1.4142] w-full bg-white rounded border border-gray-200">
        {activeTemplate ? (
          <div className="w-full h-full p-4">
            {/* TODO: Implement PDF preview */}
            <div className="flex items-center justify-center h-full text-gray-400">
              PDF Preview Coming Soon
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No template selected
          </div>
        )}
      </div>
    </div>
  );
};