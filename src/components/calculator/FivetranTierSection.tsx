
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalculatorInputs, FivetranTier } from "@/lib/calculator-types";
import { InfoCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FivetranTierSectionProps {
  inputs: CalculatorInputs;
  setFivetranTier: (tier: FivetranTier) => void;
}

const FivetranTierSection: React.FC<FivetranTierSectionProps> = ({ 
  inputs, 
  setFivetranTier
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-900">Fivetran Pricing Tier</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoCircle className="h-4 w-4 ml-1 text-gray-400" />
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
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
          <RadioGroupItem value="free" id="free" />
          <Label htmlFor="free" className="cursor-pointer flex-1">
            <div className="font-medium text-reactor-fivetran">Free</div>
            <div className="text-xs text-gray-500">500k MARs & 5,000 model runs included</div>
            <div className="text-xs text-gray-600 mt-1">An introductory offering for low volumes of data with limited access to their core platform functionality.</div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
          <RadioGroupItem value="standard" id="standard" />
          <Label htmlFor="standard" className="cursor-pointer flex-1">
            <div className="font-medium text-reactor-fivetran">Standard - $500/mo per million rows</div>
            <div className="text-xs text-gray-500">MMR pricing applies separately</div>
            <div className="text-xs text-gray-600 mt-1">Access to their core platform functionality for teams looking to automate their data movement. With limited feature capability for destinations, security, and cloud providers.</div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
          <RadioGroupItem value="enterprise" id="enterprise" />
          <Label htmlFor="enterprise" className="cursor-pointer flex-1">
            <div className="font-medium text-reactor-fivetran">Enterprise - $667/mo per million rows</div>
            <div className="text-xs text-gray-500">MMR pricing applies separately</div>
            <div className="text-xs text-gray-600 mt-1">This tier gives companies greater platform flexibility and more granular functionality for destinations, governance, security and cloud providers and the type of deployment.</div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
          <RadioGroupItem value="businessCritical" id="businessCritical" />
          <Label htmlFor="businessCritical" className="cursor-pointer flex-1">
            <div className="font-medium text-reactor-fivetran">Business Critical - $1,067/mo per million rows</div>
            <div className="text-xs text-gray-500">MMR pricing applies separately</div>
            <div className="text-xs text-gray-600 mt-1">Their highest level of data protection and compliance for companies with sensitive or regulated data needs.</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default FivetranTierSection;
