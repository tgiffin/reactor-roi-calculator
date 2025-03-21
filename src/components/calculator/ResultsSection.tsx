
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CostChart } from './CostChart';
import { formatCurrency } from '@/lib/formatter';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BreakEvenChart } from './BreakEvenChart';

interface Results {
  fivetranCost: number;
  reactorCost: number;
  annualSavings: number;
  breakEvenMonths: number;
}

interface ResultsSectionProps {
  results: Results;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  
  const generatePDF = () => {
    const { fivetranCost, reactorCost, annualSavings, breakEvenMonths } = results;
    
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(36, 98, 170); // Reactor blue color
    doc.text('Reactor vs. Fivetran Cost Comparison', 14, 22);
    
    // Add subtitle
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('Cost Analysis and Savings Report', 14, 30);
    
    // Monthly comparison table
    doc.setFontSize(16);
    doc.setTextColor(36, 98, 170);
    doc.text('Monthly Cost Comparison', 14, 45);
    
    autoTable(doc, {
      startY: 50,
      head: [['Service', 'Monthly Cost', 'Annual Cost']],
      body: [
        ['Fivetran', formatCurrency(fivetranCost), formatCurrency(fivetranCost * 12)],
        ['Reactor', formatCurrency(reactorCost), formatCurrency(reactorCost * 12)],
        ['Savings', formatCurrency(fivetranCost - reactorCost), formatCurrency(annualSavings)],
      ],
      theme: 'grid',
      headStyles: { 
        fillColor: [36, 98, 170],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      rowPageBreak: 'avoid',
    });
    
    // Break-even analysis
    let breakEvenY = 120;
    
    // Get the final Y position after the table is drawn
    // jsPDF-autotable adds data to the doc object
    const lastTable = (doc as any).lastAutoTable;
    if (lastTable) {
      breakEvenY = lastTable.finalY || 120;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(36, 98, 170);
    doc.text('Break-Even Analysis', 14, breakEvenY + 15);
    
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Break-even point: ${breakEvenMonths} months`, 14, breakEvenY + 25);
    
    // Break-even table showing cumulative costs
    const breakEvenTableData = [];
    for (let i = 1; i <= Math.min(breakEvenMonths + 3, 12); i++) {
      breakEvenTableData.push([
        `Month ${i}`,
        formatCurrency(fivetranCost * i),
        formatCurrency(reactorCost * i),
        formatCurrency((fivetranCost - reactorCost) * i)
      ]);
    }
    
    autoTable(doc, {
      startY: breakEvenY + 30,
      head: [['Period', 'Fivetran Cumulative Cost', 'Reactor Cumulative Cost', 'Cumulative Savings']],
      body: breakEvenTableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [36, 98, 170],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      rowPageBreak: 'avoid',
    });
    
    // Get the final Y position after the table is drawn
    let finalY = 200;
    const lastTable2 = (doc as any).lastAutoTable;
    if (lastTable2) {
      finalY = lastTable2.finalY || 200;
    }
    
    // Add summary section at the end
    const totalSavings = results.annualSavings;
    
    doc.setFontSize(16);
    doc.setTextColor(36, 98, 170);
    doc.text('Summary', 14, finalY + 15);
    
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`By switching to Reactor, you could save approximately ${formatCurrency(totalSavings)} in the first year.`, 14, finalY + 25);
    
    // Add footer with date
    const today = new Date();
    const dateStr = today.toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${dateStr}`, 14, 280);
    
    // Save the PDF
    doc.save('reactor-fivetran-comparison.pdf');
  };

  return (
    <Card className="h-full relative">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Cost Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CostChart 
          fivetranCost={results.fivetranCost} 
          reactorCost={results.reactorCost} 
        />
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#DDDDDD] p-3 rounded-md">
              <div className="text-sm text-reactor-brand-black font-medium">Annual Savings</div>
              <div className="text-2xl font-bold text-reactor-reactor-blue">
                {formatCurrency(results.annualSavings)}
              </div>
            </div>
            <div className="bg-[#DDDDDD] p-3 rounded-md">
              <div className="text-sm text-reactor-brand-black font-medium">Break-even</div>
              <div className="text-2xl font-bold text-reactor-reactor-blue">
                {results.breakEvenMonths} months
              </div>
            </div>
          </div>
          
          <div className="h-48">
            <BreakEvenChart 
              fivetranCosts={Array(12).fill(0).map((_, i) => results.fivetranCost * (i + 1))}
              reactorCosts={Array(12).fill(0).map((_, i) => results.reactorCost * (i + 1))}
            />
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button onClick={generatePDF} variant="outline" className="w-full">
            Download PDF Report
          </Button>
          <Button className="w-full bg-[#FFCC00] text-reactor-brand-black hover:bg-amber-400" asChild>
            <a href="https://www.reactordata.com/demo" target="_blank" rel="noopener noreferrer">
              Schedule a Call
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsSection;
