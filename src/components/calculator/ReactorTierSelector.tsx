
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalculatorInputs, ReactorTier } from "@/lib/calculator-types";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Flat rate pricing of $400 per million rows per month with a $2,500 monthly minimum.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <RadioGroup 
        value={inputs.reactorTier}
        onValueChange={(value) => setReactorTier(value as ReactorTier)}
      >
        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 bg-[#DDDDDD]">
          <RadioGroupItem value="flatRate" id="flatRate" checked />
          <Label htmlFor="flatRate" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">Flat Rate - {formatCurrency(2500)} minimum</div>
            <div className="text-xs text-gray-500">{formatCurrency(400)} per million rows (rounded up)</div>
            <div className="text-xs text-gray-500">No additional tiers or volume discounts</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ReactorTierSelector;
