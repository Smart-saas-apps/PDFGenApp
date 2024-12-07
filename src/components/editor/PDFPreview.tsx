import React, { useState } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Button } from '../ui/Button';
import { DocumentArrowDownIcon, EyeIcon } from '@heroicons/react/24/outline';
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
        <div className="flex gap-2">
          <Button
            onClick={handlePreview}
            disabled={!activeTemplate || isGenerating}
            icon={<EyeIcon className="w-5 h-5" />}
          >
            Preview
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!activeTemplate || isGenerating}
            icon={<DocumentArrowDownIcon className="w-5 h-5" />}
          >
            Download
          </Button>
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