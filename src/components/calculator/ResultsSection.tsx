
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
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const { toast } = useToast();
  const [logoLoaded, setLogoLoaded] = useState(false);

  // Preload the logo to ensure it's available for PDF generation
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log("Logo successfully preloaded");
      setLogoLoaded(true);
    };
    img.onerror = (error) => {
      console.error("Error preloading logo:", error);
      setLogoLoaded(false);
    };
    img.src = '/lovable-uploads/957df611-49ea-4ecd-9c0a-b77b2383af35.png';
  }, []);

  const handleDownloadReport = () => {
    try {
      // Generate PDF using our utility
      const doc = generateROIReport(results);
      
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
              onScheduleCall={handleScheduleCall}
            />
          </div>
          
          {/* Hidden preloaded image */}
          <img 
            src="/lovable-uploads/957df611-49ea-4ecd-9c0a-b77b2383af35.png" 
            alt="Reactor Logo" 
            style={{ display: 'none' }} 
            onLoad={() => console.log("Hidden logo loaded")}
            onError={(e) => console.error("Hidden logo failed to load:", e)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSection;
