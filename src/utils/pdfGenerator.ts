import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Template } from '../types';

export const generatePDF = async (template: Template): Promise<string> => {
  try {
    // Get the template container element
    const element = document.getElementById('pdf-canvas');
    if (!element) {
      throw new Error('Template container not found');
    }

    // Convert the HTML content to canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable loading cross-origin images
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Calculate dimensions to fit the content properly
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add the canvas content to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Return PDF as data URL
    return pdf.output('dataurlstring');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const downloadPDF = async (template: Template): Promise<void> => {
  try {
    const pdf = await generatePDF(template);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = pdf;
    link.download = `${template.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};
