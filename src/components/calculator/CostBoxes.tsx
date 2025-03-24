
import React from 'react';
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";

interface CostBoxesProps {
  fivetranMonthlyCost: number;
  reactorMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
}

const CostBoxes: React.FC<CostBoxesProps> = ({
  fivetranMonthlyCost,
  reactorMonthlyCost,
  monthlySavings,
  annualSavings
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#DDDDDD] p-4 rounded-lg border border-[#5B5B5B]">
          <p className="text-sm font-medium text-[#2462AA]">Fivetran Monthly Cost</p>
          <p className="text-2xl font-bold text-reactor-brand-black">{formatCurrency(fivetranMonthlyCost)}</p>
        </div>
        <div className="bg-[#DDDDDD] p-4 rounded-lg border border-[#5B5B5B]">
          <p className="text-sm font-medium text-reactor-reactor-blue">Reactor Monthly Cost</p>
          <p className="text-2xl font-bold text-reactor-brand-black">{formatCurrency(reactorMonthlyCost)}</p>
        </div>
      </div>
      
      <div className="bg-[#DDDDDD] p-4 rounded-lg shadow-sm border border-[#5B5B5B]">
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
      </div>
    </div>
  );
};

export default CostBoxes;
