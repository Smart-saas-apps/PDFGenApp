import React, { useState } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { EyeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { PreviewCanvas } from './PDFPreview/PreviewCanvas';

export const PDFPreview: React.FC = () => {
  const { activeTemplate } = useTemplateStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handlePreview = async () => {
    if (!activeTemplate) return;
    
    try {
      setIsGenerating(true);
      const element = document.getElementById('pdf-canvas');
      if (!element) {
        throw new Error('Preview canvas not found');
      }

      // Use html2canvas directly here for better control
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
      });

      // Use jsPDF directly here
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      const pdfUrl = pdf.output('dataurlstring');
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
      const element = document.getElementById('pdf-canvas');
      if (!element) {
        throw new Error('Preview canvas not found');
      }

      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
      });

      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      pdf.save(`${activeTemplate.name || 'document'}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white rounded-md flex items-center justify-center overflow-hidden">
        {isGenerating ? (
          <div className="py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {previewUrl ? (
              <iframe 
                src={previewUrl} 
                className="w-full h-[500px] border-0"
                title="PDF Preview"
              />
            ) : (
              <div className="relative w-full">
                <PreviewCanvas />
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="flex gap-2 text-sm">
        <button 
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1 text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
          onClick={handlePreview}
          disabled={!activeTemplate || isGenerating}
        >
          <EyeIcon className="w-3.5 h-3.5" />
          {isGenerating ? 'Generating...' : 'Preview'}
        </button>
        <button 
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={handleDownload}
          disabled={!activeTemplate || isGenerating}
        >
          <DocumentArrowDownIcon className="w-3.5 h-3.5" />
          {isGenerating ? 'Generating...' : 'Download'}
        </button>
      </div>
    </div>
  );
};