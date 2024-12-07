import React, { useState, useEffect } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { generatePDF, downloadPDF } from '../../utils/pdfGenerator';
import { ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';

export const PDFPreview: React.FC = () => {
  const { activeTemplate } = useTemplateStore();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (activeTemplate) {
      updatePreview();
    }
  }, [activeTemplate]);

  const updatePreview = async () => {
    if (!activeTemplate) return;
    
    try {
      setIsGenerating(true);
      const pdfDataUri = await generatePDF(activeTemplate);
      setPreviewUrl(pdfDataUri);
    } catch (error) {
      console.error('Error generating PDF preview:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!activeTemplate) return;
    
    try {
      setIsGenerating(true);
      await downloadPDF(activeTemplate);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!activeTemplate) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No template selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-96 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">PDF Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={updatePreview}
            disabled={isGenerating}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview
          </button>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Download
          </button>
        </div>
      </div>
      
      <div className="relative flex-1 p-4">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : previewUrl ? (
          <iframe
            src={previewUrl}
            className="w-full h-[600px] border rounded"
            title="PDF Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50 rounded">
            <p className="text-gray-500">Click Preview to generate PDF</p>
          </div>
        )}
      </div>
    </div>
  );
};