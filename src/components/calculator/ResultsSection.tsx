
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorResults } from "@/lib/calculator-types";
import { useToast } from "@/hooks/use-toast";
import { CostChart } from "./CostChart";
import CostBoxes from "./CostBoxes";
import ActionButtons from "./ActionButtons";
import { generateROIReport } from "@/utils/pdf-generator";

interface ResultsSectionProps {
  results: CalculatorResults;
  onScheduleCall: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, onScheduleCall }) => {
  const { toast } = useToast();

  const handleDownloadReport = async () => {
    try {
      // Show loading toast
      toast({
        title: "Generating Report",
        description: "Please wait while we create your report...",
      });
      
      // Generate PDF using our utility (now async)
      const doc = await generateROIReport(results);
      
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
          
          <div className="mt-6">
            <CostBoxes 
              fivetranMonthlyCost={results.fivetranMonthlyCost}
              reactorMonthlyCost={results.reactorMonthlyCost}
              reactorCommittedCost={results.reactorCommittedCost}
              reactorOverageCost={results.reactorOverageCost}
              monthlySavings={results.monthlySavings}
              annualSavings={results.annualSavings}
            />
          </div>
          
          <div className="mt-6 pt-4 border-t border-reactor-light-grey">
            <ActionButtons 
              onDownload={handleDownloadReport}
              onScheduleCall={onScheduleCall}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSection;
