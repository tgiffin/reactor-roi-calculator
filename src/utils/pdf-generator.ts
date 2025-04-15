
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatter";

export const generateROIReport = (results: CalculatorResults): jsPDF => {
  // Create new PDF document
  const doc = new jsPDF();
  const currentDate = formatDate(new Date());
  
  // Add Reactor logo
  const logoPath = '/public/lovable-uploads/de039e5c-f10c-4c9c-a4c3-379a38647044.png';
  
  // Logo parameters
  const logoWidth = 40; // Adjust as needed
  const logoHeight = 20; // Adjust as needed
  const logoX = 14;
  const logoY = 10;

  // Add logo to the PDF
  doc.addImage(logoPath, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
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

