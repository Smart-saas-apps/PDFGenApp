import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Template } from '../types';

export const generatePDF = async (template: Template): Promise<string> => {
  // Get the canvas element
  const canvas = document.querySelector('.pdf-canvas') as HTMLElement;
  if (!canvas) throw new Error('Canvas element not found');

  // Convert the canvas to an image
  const canvasImage = await html2canvas(canvas, {
    scale: 2, // Higher scale for better quality
    useCORS: true, // Enable CORS for images
    logging: false,
  });

  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });

  // Calculate dimensions
  const imgWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvasImage.height * imgWidth) / canvasImage.width;

  // Add the image to the PDF
  pdf.addImage(
    canvasImage.toDataURL('image/jpeg', 1.0),
    'JPEG',
    0,
    0,
    imgWidth,
    imgHeight
  );

  // Return PDF as base64 string
  return pdf.output('datauristring');
};

export const downloadPDF = async (template: Template): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });

  // Get the canvas element
  const canvas = document.querySelector('.pdf-canvas') as HTMLElement;
  if (!canvas) throw new Error('Canvas element not found');

  // Convert the canvas to an image
  const canvasImage = await html2canvas(canvas, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  // Calculate dimensions
  const imgWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvasImage.height * imgWidth) / canvasImage.width;

  // Add the image to the PDF
  pdf.addImage(
    canvasImage.toDataURL('image/jpeg', 1.0),
    'JPEG',
    0,
    0,
    imgWidth,
    imgHeight
  );

  // Download the PDF
  pdf.save(`${template.name || 'document'}.pdf`);
};
