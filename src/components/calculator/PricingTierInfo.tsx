
import React from 'react';
import { ListIcon } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";

interface PricingTierInfoProps {
  type: 'fivetran-mar' | 'fivetran-transformation' | 'reactor';
}

const PricingTierInfo: React.FC<PricingTierInfoProps> = ({ type }) => {
  return (
    <div className="text-xs bg-[#DDDDDD] p-3 rounded-md shadow-sm border border-[#5B5B5B]">
      {type === 'reactor' && (
        <div className="font-medium text-[#2462AA]/80 mt-1">
          <ListIcon className="h-3 w-3 mr-1 inline-block" />
          All tiers include unlimited model runs
        </div>
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
          <div className="font-semibold flex items-center mb-2">
            <ListIcon className="h-3 w-3 mr-1" /> 
            <span className="text-[#2462AA]">Fivetran Transformation Pricing (Simplified):</span>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>0-5,000 model runs/mo: Free</li>
            <li>5,000-30,000 runs/mo: $0.01 per run</li>
            <li>30,000-100,000 runs/mo: $0.007 per run</li>
            <li>100,000+ runs/mo: $0.002 per run</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default PricingTierInfo;
