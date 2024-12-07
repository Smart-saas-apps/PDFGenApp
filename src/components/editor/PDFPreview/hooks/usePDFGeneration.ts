import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useTemplateStore } from '../../../../store/templateStore';

export const usePDFGeneration = () => {
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

  return { generatePDF };
};