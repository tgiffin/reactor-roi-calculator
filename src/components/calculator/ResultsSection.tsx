
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { ArrowRight, Download, PhoneCall } from "lucide-react";
import { CostChart } from "./CostChart";
import { BreakEvenChart } from "./BreakEvenChart";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ResultsSectionProps {
  results: CalculatorResults;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const { toast } = useToast();

  const handleDownloadReport = () => {
    try {
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
      
      // Add the monthly costs table and get its final Y position
      const finalTablePosition = autoTable(doc, {
        head: [['Month', 'Fivetran Cost', 'Reactor Cost', 'Monthly Savings']],
        body: tableBody,
        startY: 90,
        theme: 'grid',
        headStyles: { fillColor: [36, 98, 170] }, // #2462AA
      });
      
      // Get the final Y position after the table is drawn
      const finalY = finalTablePosition.finalY || 200;
      
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
      
      // Save the PDF
      doc.save('reactor-roi-calculator-report.pdf');
      
      // Show success toast
      toast({
        title: "Report Downloaded",
        description: "Your ROI comparison report has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleScheduleCall = () => {
    // This would normally open a calendar booking widget
    window.open("https://reactordata.com/contact", "_blank");
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <Card className="flex-1 shadow-md border-reactor-light-grey bg-[#F3F3F3]">
        <CardHeader className="rounded-t-lg">
          <CardTitle className="text-xl font-bold text-reactor-navy">Cost Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <CostChart 
            fivetranCost={results.fivetranMonthlyCost} 
            reactorCost={results.reactorMonthlyCost} 
          />
          
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#DDDDDD] p-4 rounded-lg">
                <p className="text-sm font-medium text-[#2462AA]">Fivetran Monthly Cost</p>
                <p className="text-2xl font-bold text-reactor-brand-black">{formatCurrency(results.fivetranMonthlyCost)}</p>
              </div>
              <div className="bg-[#DDDDDD] p-4 rounded-lg">
                <p className="text-sm font-medium text-reactor-reactor-blue">Reactor Monthly Cost</p>
                <p className="text-2xl font-bold text-reactor-brand-black">{formatCurrency(results.reactorMonthlyCost)}</p>
              </div>
            </div>
            
            <div className="bg-[#DDDDDD] p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">Monthly Savings</p>
                  <p className="text-2xl font-bold text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">
                    {formatCurrency(results.monthlySavings)}
                  </p>
                </div>
                <ArrowRight className="h-8 w-8 text-[#2462AA]" />
                <div>
                  <p className="text-sm font-medium text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">Annual Savings</p>
                  <p className="text-2xl font-bold text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">
                    {formatCurrency(results.annualSavings)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 shadow-md border-reactor-light-grey bg-[#F3F3F3]">
        <CardHeader className="rounded-t-lg">
          <CardTitle className="text-xl font-bold text-reactor-navy">Break-Even Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <BreakEvenChart
            fivetranCosts={results.yearlyFivetranCosts}
            reactorCosts={results.yearlyReactorCosts}
          />
        </CardContent>
      </Card>

      <Card className="shadow-md border-reactor-light-grey bg-[#F3F3F3]">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleDownloadReport} 
              variant="outline" 
              className="flex-1 border-reactor-light-grey bg-[#DDDDDD] hover:bg-reactor-light-grey"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button 
              onClick={handleScheduleCall}
              className="flex-1 bg-[#FFCC00] hover:bg-[#FFD633] text-reactor-brand-black"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Schedule a Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSection;
