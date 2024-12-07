import React, { useState } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { EyeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { generatePDF, downloadPDF } from '../../utils/pdfGenerator';

export const PDFPreview: React.FC = () => {
  const { activeTemplate } = useTemplateStore();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePreview = async () => {
    if (!activeTemplate) return;
    
    try {
      setIsGenerating(true);
      const pdfUrl = await generatePDF(activeTemplate);
      setPreviewUrl(pdfUrl);
    } catch (error) {
      console.error('Error generating preview:', error);
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

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Preview</h2>
        <div className="flex gap-2 text-sm">
          <button
            onClick={handlePreview}
            disabled={!activeTemplate || isGenerating}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1 text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50"
          >
            <EyeIcon className="w-3.5 h-3.5" />
            Preview
          </button>
          <button
            onClick={handleDownload}
            disabled={!activeTemplate || isGenerating}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            <DocumentArrowDownIcon className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>

      <div className="aspect-[1/1.4142] w-full bg-white rounded border border-gray-200">
        {isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : previewUrl ? (
          <iframe
            src={previewUrl}
            className="w-full h-full border-none"
            title="PDF Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            {activeTemplate ? 'Click Preview to generate PDF' : 'No template selected'}
          </div>
        )}
      </div>
    </div>
  );
};