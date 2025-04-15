
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatter";

export const generateROIReport = (results: CalculatorResults): jsPDF => {
  // Create new PDF document
  const doc = new jsPDF();
  const currentDate = formatDate(new Date());
  
  // Add Reactor logo - using a base64 string for reliability
  const logoBase64 = 'data:image/png;base64,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';
  
  // Logo parameters
  const logoWidth = 40; 
  const logoHeight = 20;
  const logoX = 14;
  const logoY = 10;

  // Add logo to the PDF using base64 data
  doc.addImage(logoBase64, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
  // Set title and header
  doc.setFontSize(20);
  doc.text("ROI Calculator Report", 14, 40);
  doc.setFontSize(10);
  doc.text(`Generated on ${currentDate}`, 14, 48);
  
  // Add total monthly rows prominently near the top
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Monthly Rows: ${formatNumber(results.monthlyRows)}`, 14, 56);
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
    startY: 64, // Adjusted to make room for logo
    theme: 'grid',
    headStyles: { fillColor: [36, 98, 170] }, // #2462AA
  });
  
  // Add summary section at the end
  const totalSavings = results.annualSavings;
  doc.setFontSize(16);
  doc.text("Summary", 14, 110);
  doc.setFontSize(12);
  doc.text(`Total Annual Savings: ${formatCurrency(totalSavings)}`, 14, 120);
  doc.text("Why Choose Reactor:", 14, 130);
  doc.setFontSize(10);
  doc.text("• Predictable Pricing: Flat monthly fee regardless of how many records you process", 20, 140);
  doc.text("• Unlimited Transformations: Run as many transformations as you need without paying extra", 20, 148);
  doc.text("• All Connectors Included: Access to all standard connectors with your subscription", 20, 156);
  
  // Add contact information
  doc.setFontSize(10);
  doc.text("For more information, visit reactordata.com or contact our sales team.", 14, 170);
  
  return doc;
};

