
import React from 'react';
import { Label } from "@/components/ui/label";
import { CalculatorInputs, ReactorTier } from "@/lib/calculator-types";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatNumber, formatCurrency } from "@/lib/formatter";

interface ReactorTierSelectorProps {
  inputs: CalculatorInputs;
  setReactorTier: (tier: ReactorTier) => void;
}

const ReactorTierSelector: React.FC<ReactorTierSelectorProps> = ({ 
  inputs, 
  setReactorTier
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-base font-bold text-gray-900">Reactor Pricing</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 ml-1 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>Flat rate pricing of $400 per million rows per month with a $2,000 monthly minimum.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="rounded-md border border-[#5B5B5B] p-3 bg-[#DDDDDD]">
        <div className="cursor-pointer flex-1">
          <div className="font-medium text-[#2462AA]">Single Tier: {formatCurrency(400)} per million rows</div>
          <div className="text-xs text-gray-500">{formatCurrency(2000)} minimum monthly commitment</div>
          <div className="text-xs text-gray-500">All features outlined at the top of the page plus unlimited transformations and model runs are included</div>
        </div>
      </div>
    </div>
  );
};

export default ReactorTierSelector;
