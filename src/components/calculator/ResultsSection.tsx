
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalculatorResults } from "@/lib/calculator-types";
import { formatCurrency } from "@/lib/formatter";
import { ArrowRight, Download, PhoneCall } from "lucide-react";
import { CostChart } from "./CostChart";
import { BreakEvenChart } from "./BreakEvenChart";

interface ResultsSectionProps {
  results: CalculatorResults;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const handleDownloadReport = () => {
    // This would normally generate and download a PDF report
    alert("Download report feature would be implemented here");
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
              className="flex-1 bg-reactor-reactor-blue hover:bg-reactor-dark-blue text-white"
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
