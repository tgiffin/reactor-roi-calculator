
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatter";

export const generateROIReport = (results: CalculatorResults): jsPDF => {
  // Create new PDF document
  const doc = new jsPDF();
  const currentDate = formatDate(new Date());
  
  // We need to use an absolute URL or data URL for the logo
  // Instead of trying to use a relative path which doesn't work in PDFs
  const logoBase64 = "data:image/png;base64,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";
  
  try {
    // Add logo with appropriate dimensions
    doc.addImage(logoBase64, 'PNG', 14, 10, 60, 25);
  } catch (error) {
    console.error("Error adding logo to PDF:", error);
    
    // Fallback to text header if image fails
    doc.setFontSize(24);
    doc.setTextColor(36, 98, 170); // Reactor blue color (#2462AA)
    doc.text("REACTOR", 14, 22);
    doc.setTextColor(0, 0, 0); // Reset to black
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
