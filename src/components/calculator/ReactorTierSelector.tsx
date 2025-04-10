
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
          <h3 className="text-base font-bold text-gray-900">Select Your Reactor Tier Commitment</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Select your monthly tier commitment. If your usage exceeds this tier, overage charges will apply.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <RadioGroup
        value={inputs.reactorTier}
        onValueChange={(value) => setReactorTier(value as ReactorTier)}
        className="grid grid-cols-1 gap-2"
      >
        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="5M" id="tier5M" />
          <Label htmlFor="tier5M" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">5M Tier - {formatCurrency(2500)}</div>
            <div className="text-xs text-gray-500">Up to {formatNumber(5000000)} rows/month</div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="10M" id="tier10M" />
          <Label htmlFor="tier10M" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">10M Tier - {formatCurrency(4800)}</div>
            <div className="text-xs text-gray-500">Up to {formatNumber(10000000)} rows/month</div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="15M" id="tier15M" />
          <Label htmlFor="tier15M" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">15M Tier - {formatCurrency(6900)}</div>
            <div className="text-xs text-gray-500">Up to {formatNumber(15000000)} rows/month</div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="20M" id="tier20M" />
          <Label htmlFor="tier20M" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">20M Tier - {formatCurrency(8800)}</div>
            <div className="text-xs text-gray-500">Up to {formatNumber(20000000)} rows/month</div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="25M" id="tier25M" />
          <Label htmlFor="tier25M" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">25M Tier - {formatCurrency(10500)}</div>
            <div className="text-xs text-gray-500">Up to {formatNumber(25000000)} rows/month</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ReactorTierSelector;
