
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatter";

export const generateROIReport = (results: CalculatorResults): jsPDF => {
  // Create new PDF document
  const doc = new jsPDF();
  const currentDate = formatDate(new Date());
  
  // Add logo at the top of the document
  const logoUrl = '/lovable-uploads/f3ba3d17-5973-451b-abd6-7c2da53d7b96.png';
  
  try {
    // Add logo with appropriate dimensions
    doc.addImage(logoUrl, 'PNG', 14, 10, 60, 25);
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
