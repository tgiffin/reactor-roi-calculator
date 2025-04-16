
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatter";

export const generateROIReport = async (results: CalculatorResults): Promise<jsPDF> => {
  // Create new PDF document
  const doc = new jsPDF();
  const currentDate = formatDate(new Date());
  
  // Get the logo path with the new logo
  const logoPath = '/lovable-uploads/3823fd6e-72fa-400d-a590-760d6f904513.png';
  
  try {
    // Create a new image element
    const img = new Image();
    
    // Create a promise to handle image loading
    await new Promise<void>((resolve, reject) => {
      img.crossOrigin = "Anonymous"; // Try to avoid CORS issues
      
      img.onload = () => {
        try {
          // Create a canvas to draw the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set dimensions
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image on canvas
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            
            // Convert to data URL
            const imgData = canvas.toDataURL('image/png');
            
            // Add to PDF - adjust dimensions to maintain aspect ratio
            // The Reactor logo is more horizontal, so adjust width accordingly
            doc.addImage(imgData, 'PNG', 10, 10, 70, 25);
            console.log("Logo successfully added to PDF");
          }
          resolve();
        } catch (err) {
          console.error("Canvas error:", err);
          reject(err);
        }
      };
      
      img.onerror = (err) => {
        console.error("Image loading error:", err);
        reject(err);
      };
      
      // Set full absolute URL to the image
      const fullUrl = window.location.origin + logoPath;
      console.log("Loading logo from:", fullUrl);
      img.src = fullUrl;
      
      // Set a fallback in case of timeout
      setTimeout(() => {
        if (!img.complete) {
          reject(new Error("Image load timed out"));
        }
      }, 5000);
    });
  } catch (error) {
    console.error("Logo loading failed:", error);
    
    // Fallback to text header
    doc.setFontSize(24);
    doc.setTextColor(36, 98, 170); // Reactor blue color (#2462AA)
    doc.text("REACTOR", 14, 22);
    doc.setTextColor(0, 0, 0); // Reset to black
  }
  
  // Set title and header
  doc.setFontSize(20);
  doc.text("ROI Calculator Report", 14, 50);
  
  // Add disclaimer text
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100); // Set to a softer grey for disclaimer
  const disclaimerText = "The calculations below reflect ETL cost savings only vs. Fivetran. Customers should expect " +
    "additional data warehouse and engineering cost savings and more valuable data that is available faster with Reactor.";
  
  // Wrap the disclaimer text to fit within the page width
  const maxWidth = 180; // maximum width in mm
  const splitText = doc.splitTextToSize(disclaimerText, maxWidth);
  doc.text(splitText, 14, 58);
  
  // Reset text color and continue with existing code
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Generated on ${currentDate}`, 14, 70);
  
  // Adjust subsequent Y positions to account for the new disclaimer text
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Monthly Rows: ${formatNumber(results.monthlyRows)}`, 14, 78);
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
    startY: 84, // Adjusted to make room for the disclaimer
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
