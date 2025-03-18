
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
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Cost Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <CostChart 
            fivetranCost={results.fivetranMonthlyCost} 
            reactorCost={results.reactorMonthlyCost} 
          />
          
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Fivetran Monthly Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(results.fivetranMonthlyCost)}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Reactor Monthly Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(results.reactorMonthlyCost)}</p>
              </div>
            </div>
            
            <div className="bg-reactor-soundcommerce-yellow/20 dark:bg-reactor-soundcommerce-yellow/10 border border-reactor-soundcommerce-yellow/30 dark:border-reactor-soundcommerce-yellow/20 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">Monthly Savings</p>
                  <p className="text-2xl font-bold text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">
                    {formatCurrency(results.monthlySavings)}
                  </p>
                </div>
                <ArrowRight className="h-8 w-8 text-reactor-soundcommerce-yellow" />
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

      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Break-Even Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <BreakEvenChart
            fivetranCosts={results.yearlyFivetranCosts}
            reactorCosts={results.yearlyReactorCosts}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleDownloadReport} 
              variant="outline" 
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button 
              onClick={handleScheduleCall}
              className="flex-1 bg-reactor-blue hover:bg-reactor-blue/90"
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
