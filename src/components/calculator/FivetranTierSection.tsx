
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalculatorInputs, FivetranTier } from "@/lib/calculator-types";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FivetranTierSectionProps {
  inputs: CalculatorInputs;
  setFivetranTier: (tier: FivetranTier) => void;
  simplified?: boolean;
}

const FivetranTierSection: React.FC<FivetranTierSectionProps> = ({ 
  inputs, 
  setFivetranTier,
  simplified = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-base font-bold text-gray-900">What is your Fivetran Pricing Tier?</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Select the Fivetran pricing tier that applies to your organization.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <RadioGroup
        value={inputs.fivetranTier}
        onValueChange={(value) => setFivetranTier(value as FivetranTier)}
        className="grid grid-cols-1 gap-2"
      >
        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="free" id="free" />
          <Label htmlFor="free" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">Free</div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="standard" id="standard" />
          <Label htmlFor="standard" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">Standard - $500/mo per million rows</div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="enterprise" id="enterprise" />
          <Label htmlFor="enterprise" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">Enterprise - $667/mo per million rows</div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border border-[#5B5B5B] p-3 cursor-pointer hover:bg-gray-50 bg-[#DDDDDD]">
          <RadioGroupItem value="businessCritical" id="businessCritical" />
          <Label htmlFor="businessCritical" className="cursor-pointer flex-1">
            <div className="font-medium text-[#2462AA]">Business Critical - $1,067/mo per million rows</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default FivetranTierSection;
