
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate } from "@/lib/formatter";

export const generateROIReport = (results: CalculatorResults): jsPDF => {
  // Create new PDF document
  const doc = new jsPDF();
  const currentDate = formatDate(new Date());
  
  // Set title and header
  doc.setFontSize(20);
  doc.text("ROI Calculator Report", 14, 22);
  doc.setFontSize(10);
  doc.text(`Generated on ${currentDate}`, 14, 30);
  
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
    startY: 40,
    theme: 'grid',
    headStyles: { fillColor: [36, 98, 170] }, // #2462AA
  });
  
  // Add Break-Even Analysis section
  doc.setFontSize(16);
  doc.text("Monthly Cost Projection Over 12 Months", 14, 80);
  
  // Create monthly costs table
  const monthNames = [
    'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 
    'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'
  ];
  
  const tableBody = monthNames.map((month, index) => [
    month,
    formatCurrency(results.yearlyFivetranCosts[index]),
    formatCurrency(results.yearlyReactorCosts[index]),
    formatCurrency(results.yearlyFivetranCosts[index] - results.yearlyReactorCosts[index])
  ]);
  
  // Add the monthly costs table
  const tablePosition = autoTable(doc, {
    head: [['Month', 'Fivetran Cost', 'Reactor Cost', 'Monthly Savings']],
    body: tableBody,
    startY: 90,
    theme: 'grid',
    headStyles: { fillColor: [36, 98, 170] }, // #2462AA
  });
  
  // Get the final Y position after the table is drawn
  // @ts-ignore - ignore the TypeScript error for now as jspdf-autotable types are incorrect
  const finalY = tablePosition?.finalY || 200;
  
  // Add summary section at the end
  const totalSavings = results.annualSavings;
  doc.setFontSize(16);
  doc.text("Summary", 14, finalY + 20);
  doc.setFontSize(12);
  doc.text(`Total Annual Savings: ${formatCurrency(totalSavings)}`, 14, finalY + 30);
  doc.text("Why Choose Reactor:", 14, finalY + 40);
  doc.setFontSize(10);
  doc.text("• Predictable Pricing: Flat monthly fee regardless of how many records you process", 20, finalY + 50);
  doc.text("• Unlimited Transformations: Run as many transformations as you need without paying extra", 20, finalY + 58);
  doc.text("• All Connectors Included: Access to all standard connectors with your subscription", 20, finalY + 66);
  
  // Add contact information
  doc.setFontSize(10);
  doc.text("For more information, visit reactordata.com or contact our sales team.", 14, finalY + 80);
  
  return doc;
};
