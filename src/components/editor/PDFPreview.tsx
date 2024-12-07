import React, { useState } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { EyeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { generatePDF } from '../../utils/pdfGenerator';

export const PDFPreview: React.FC = () => {
  const { activeTemplate } = useTemplateStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      const pdfUrl = await generatePDF(activeTemplate);
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${activeTemplate.name || 'document'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
        {previewUrl ? (
          <iframe 
            src={previewUrl} 
            className="w-full h-[500px] border-0"
            title="PDF Preview"
          />
        ) : (
          <p className="text-sm text-gray-500 py-20">Preview will appear here</p>
        )}
      </div>
      
      <div className="flex gap-2 text-sm">
        <button 
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1 text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
          onClick={handlePreview}
          disabled={!activeTemplate || isGenerating}
        >
          <EyeIcon className="w-3.5 h-3.5" />
          Preview
        </button>
        <button 
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={handleDownload}
          disabled={!activeTemplate || isGenerating}
        >
          <DocumentArrowDownIcon className="w-3.5 h-3.5" />
          Download
        </button>
      </div>
    </div>
  );
};