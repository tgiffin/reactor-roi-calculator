
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatter";

export const generateROIReport = async (results: CalculatorResults): Promise<jsPDF> => {
  // Create new PDF document
  const doc = new jsPDF();
  const currentDate = formatDate(new Date());
  
  // Get the logo path - the uploaded image is in the public folder
  const logoPath = '/lovable-uploads/957df611-49ea-4ecd-9c0a-b77b2383af35.png';
  
  try {
    // Create an image element to load the image
    const img = new Image();
    
    // Return a promise that resolves when the image loads
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        // Once loaded, add to PDF using the image DOM element
        try {
          // Create canvas to convert image to data URL
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            // Get as data URL
            const dataUrl = canvas.toDataURL('image/png');
            
            // Add to PDF (with proper dimensions)
            doc.addImage(dataUrl, 'PNG', 14, 10, 60, 25);
            console.log("Logo successfully added to PDF");
          }
          resolve();
        } catch (e) {
          console.error("Error adding image to PDF:", e);
          reject(e);
        }
      };
      
      img.onerror = (e) => {
        console.error("Error loading image:", e);
        reject(e);
      };
      
      // Set source (use absolute URL)
      img.src = logoPath;
    }).catch(error => {
      // Fallback if image loading fails
      throw error;
    });
  } catch (error) {
    console.error("Error processing logo:", error);
    
    // Fallback to text header
    doc.setFontSize(24);
    doc.setTextColor(36, 98, 170); // Reactor blue color (#2462AA)
    doc.text("REACTOR", 14, 22);
    doc.setTextColor(0, 0, 0); // Reset to black
    console.log("Using text fallback for logo");
  }
  
  // Set title and header
  doc.setFontSize(20);
  doc.text("ROI Calculator Report", 14, 50);
  doc.setFontSize(10);
  doc.text(`Generated on ${currentDate}`, 14, 58);
  
  // Add total monthly rows prominently near the top
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Monthly Rows: ${formatNumber(results.monthlyRows)}`, 14, 66);
  doc.setFont(undefined, 'normal');
  
  // Add Fivetran vs Reactor comparison table
  autoTable(doc, {
    head: [['Metric', 'Fivetran', 'Reactor', 'Savings']],
    body: [
      [
        'Monthly Cost', 
        formatCurrency(results.fivetranMonthlyCost), 
        formatCurrency(results.reactorMonthlyCost),
        formatCurrency(results.monthlySavings)
      ],
      [
        'Annual Cost', 
        formatCurrency(results.fivetranMonthlyCost * 12), 
        formatCurrency(results.reactorMonthlyCost * 12),
        formatCurrency(results.annualSavings)
      ],
    ],
    startY: 74,
    theme: 'grid',
    headStyles: { fillColor: [36, 98, 170] }, // #2462AA
  });
  
  // Add summary section at the end
  const totalSavings = results.annualSavings;
  doc.setFontSize(16);
  doc.text("Summary", 14, 120);
  doc.setFontSize(12);
  doc.text(`Total Annual Savings: ${formatCurrency(totalSavings)}`, 14, 130);
  doc.text("Why Choose Reactor:", 14, 140);
  doc.setFontSize(10);
  doc.text("• Predictable Pricing: Flat monthly fee regardless of how many records you process", 20, 150);
  doc.text("• Unlimited Transformations: Run as many transformations as you need without paying extra", 20, 158);
  doc.text("• All Connectors Included: Access to all standard connectors with your subscription", 20, 166);
  
  // Add contact information
  doc.setFontSize(10);
  doc.text("For more information, visit reactordata.com or contact our sales team.", 14, 180);
  
  return doc;
};
