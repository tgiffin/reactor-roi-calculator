
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatter";

export const generateROIReport = async (results: CalculatorResults): Promise<jsPDF> => {
  // Create new PDF document
  const doc = new jsPDF();
  const currentDate = formatDate(new Date());
  
  try {
    // Use a more reliable way to add the logo to the PDF
    const logoUrl = window.location.origin + '/lovable-uploads/3823fd6e-72fa-400d-a590-760d6f904513.png';
    console.log("Adding logo from:", logoUrl);
    
    // Convert the image URL to base64 first
    const base64Image = await urlToBase64(logoUrl);
    
    // If we got a valid base64 string, add it to the PDF
    if (base64Image) {
      doc.addImage(base64Image, 'PNG', 10, 10, 70, 25);
      console.log("Logo successfully added to PDF via base64");
    } else {
      // Fallback to text header if base64 conversion fails
      console.warn("Could not convert logo to base64, using text fallback");
      throw new Error("Base64 conversion failed");
    }
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

// Helper function to convert URL to base64 string
async function urlToBase64(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          console.error("FileReader error when converting to base64");
          resolve(null);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onloadend = function() {
        if (xhr.status !== 200) {
          console.error("XHR request failed with status:", xhr.status);
          resolve(null);
        }
      };
      xhr.onerror = function(error) {
        console.error("XHR error when fetching image:", error);
        resolve(null);
      };
      xhr.send();
    } catch (error) {
      console.error("Error in urlToBase64:", error);
      resolve(null);
    }
  });
}
