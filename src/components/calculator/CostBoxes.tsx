
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";
import { Button } from "@/components/ui/button";

interface CostBoxesProps {
  fivetranMonthlyCost: number;
  reactorMonthlyCost: number;
  reactorCommittedCost: number;
  reactorOverageCost: number;
  monthlySavings: number;
  annualSavings: number;
}

const CostBoxes: React.FC<CostBoxesProps> = ({
  fivetranMonthlyCost,
  reactorMonthlyCost,
  reactorCommittedCost,
  reactorOverageCost,
  monthlySavings,
  annualSavings
}) => {
  const [showOverageDetails, setShowOverageDetails] = useState(false);

  // Handle the special "Contact Sales" case for SuperNova tier
  const renderReactorCost = () => {
    if (reactorMonthlyCost === -1) {
      return <p className="text-2xl font-bold text-reactor-brand-black">Contact Sales</p>;
    }
    return <p className="text-2xl font-bold text-reactor-brand-black">{formatCurrency(reactorMonthlyCost)}</p>;
  };
  
  // Handle savings display when "Contact Sales" is shown
  const renderSavings = () => {
    if (reactorMonthlyCost === -1) {
      return (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">Monthly Savings</p>
            <p className="text-2xl font-bold text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">
              Contact Sales
            </p>
          </div>
          <ArrowRight className="h-8 w-8 text-[#2462AA]" />
          <div>
            <p className="text-sm font-medium text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">Annual Savings</p>
            <p className="text-2xl font-bold text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">
              Contact Sales
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">Monthly Savings</p>
          <p className="text-2xl font-bold text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">
            {formatCurrency(monthlySavings)}
          </p>
        </div>
        <ArrowRight className="h-8 w-8 text-[#2462AA]" />
        <div>
          <p className="text-sm font-medium text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">Annual Savings</p>
          <p className="text-2xl font-bold text-reactor-brand-black dark:text-reactor-soundcommerce-yellow">
            {formatCurrency(annualSavings)}
          </p>
        </div>
      </div>
    );
  };

  // Render reactor cost breakdown with toggle option
  const renderReactorCostBreakdown = () => {
    if (reactorMonthlyCost === -1) {
      return <p className="text-2xl font-bold">Contact Sales</p>;
    }

    return (
      <div>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-reactor-brand-black">{formatCurrency(reactorMonthlyCost)}</p>
          {reactorOverageCost > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-xs text-reactor-reactor-blue"
              onClick={() => setShowOverageDetails(!showOverageDetails)}
            >
              {showOverageDetails ? 'Hide Details' : 'Show Details'}
              {showOverageDetails ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
            </Button>
          )}
        </div>
        
        {showOverageDetails && reactorOverageCost > 0 && (
          <div className="mt-2 text-sm border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span>Base Tier:</span>
              <span>{formatCurrency(reactorCommittedCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Overage:</span>
              <span>{formatCurrency(reactorOverageCost)}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#DDDDDD] p-4 rounded-lg border border-[#5B5B5B]">
          <p className="text-sm font-medium text-[#2462AA]">Fivetran Monthly Cost</p>
          <p className="text-2xl font-bold text-reactor-brand-black">{formatCurrency(fivetranMonthlyCost)}</p>
        </div>
        <div className="bg-[#DDDDDD] p-4 rounded-lg border border-[#5B5B5B]">
          <p className="text-sm font-medium text-reactor-reactor-blue">Reactor Monthly Cost</p>
          {renderReactorCostBreakdown()}
        </div>
      </div>
      
      <div className="bg-[#DDDDDD] p-4 rounded-lg shadow-sm border border-[#5B5B5B]">
        {renderSavings()}
      </div>
    </div>
  );
};

export default CostBoxes;
