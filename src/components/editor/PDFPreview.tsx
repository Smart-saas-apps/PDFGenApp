import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useTemplateStore } from '../../store/templateStore';

export const PDFPreview: React.FC = () => {
  const { activeTemplate } = useTemplateStore();

  const generatePDF = async () => {
    if (!activeTemplate) return;

    const canvas = await html2canvas(document.querySelector('.pdf-content') as HTMLElement);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123);
    pdf.save(`${activeTemplate.name}.pdf`);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Generate PDF
      </button>
      <div className="pdf-content">
        {/* PDF preview content */}
      </div>
    </div>
  );
};