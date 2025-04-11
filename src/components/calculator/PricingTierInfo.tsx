
import React from 'react';
import { ListIcon } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";

interface PricingTierInfoProps {
  type: 'fivetran-mar' | 'fivetran-transformation' | 'reactor';
  modelRuns?: number;
}

const PricingTierInfo: React.FC<PricingTierInfoProps> = ({ type, modelRuns = 0 }) => {
  // Calculate transformation cost based on the model runs
  const calculateTransformationCost = (runs: number): number => {
    let transformationCost = 0;
    if (runs > 5000) {
      if (runs <= 30000) {
        // $0.01 per run for 5,000-30,000
        transformationCost = (runs - 5000) * 0.01;
      } else if (runs <= 100000) {
        // First 25,000 runs after free tier at $0.01 each
        // Runs between 30,000-100,000 at $0.007 each
        transformationCost = (25000 * 0.01) + ((runs - 30000) * 0.007);
      } else {
        // First 25,000 runs after free tier at $0.01 each
        // Next 70,000 runs at $0.007 each
        // Remaining runs at $0.002 each
        transformationCost = (25000 * 0.01) + (70000 * 0.007) + ((runs - 100000) * 0.002);
      }
    }
    return transformationCost;
  };

  return (
    <div className="text-xs bg-[#DDDDDD] p-3 rounded-md shadow-sm border border-[#5B5B5B]">
      {type === 'reactor' && (
        <>
          <div className="font-semibold flex items-center mb-2">
            <ListIcon className="h-3 w-3 mr-1" />
            <span className="text-[#2462AA]">Reactor Flat Rate Pricing:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>$400 per million rows (rounded up)</li>
            <li>$2,000 monthly minimum</li>
          </ul>
          <div className="font-medium text-[#2462AA]/80 mt-1">
            <ListIcon className="h-3 w-3 mr-1 inline-block" />
            All tiers include unlimited model runs
          </div>
        </>
      )}
      
      {type === 'fivetran-mar' && (
        <>
          <div className="font-semibold flex items-center mb-2">
            <ListIcon className="h-3 w-3 mr-1" /> 
            <span className="text-[#2462AA]">Fivetran MAR Pricing Tiers:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Up to 5M rows/mo: $550 per million MAR</li>
            <li>5M-15M rows/mo: $450 per million MAR</li>
            <li>15M-20M rows/mo: $350 per million MAR</li>
            <li>20M-30M rows/mo: $325 per million MAR</li>
            <li>30M+ rows/mo: Custom pricing</li>
          </ul>
        </>
      )}
      
      {type === 'fivetran-transformation' && (
        <>
          <div className="font-semibold flex items-center justify-between mb-2">
            <div className="flex items-center">
              <ListIcon className="h-3 w-3 mr-1" /> 
              <span className="text-[#2462AA]">Fivetran Transformation Pricing</span>
            </div>
            <div className="text-[#2462AA] font-bold">
              {formatCurrency(calculateTransformationCost(modelRuns))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PricingTierInfo;
