
import React from 'react';
import { ListIcon } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";

interface PricingTierInfoProps {
  type: 'fivetran-mar' | 'fivetran-transformation' | 'reactor';
}

const PricingTierInfo: React.FC<PricingTierInfoProps> = ({ type }) => {
  return (
    <div className="text-xs bg-[#BEBCBA] p-3 rounded-md shadow-sm">
      <div className="font-semibold flex items-center mb-2">
        <ListIcon className="h-3 w-3 mr-1" /> 
        {type === 'fivetran-mar' && (
          <span className="text-[#2462AA]">Fivetran MAR Pricing Tiers:</span>
        )}
        {type === 'fivetran-transformation' && (
          <span className="text-[#2462AA]">Fivetran Transformation Pricing (Simplified):</span>
        )}
        {type === 'reactor' && (
          <span className="text-[#2462AA]">Reactor Pricing Tiers (Simplified):</span>
        )}
      </div>
      <ul className="list-disc pl-5 space-y-1">
        {type === 'fivetran-mar' && (
          <>
            <li>Up to 5M rows/mo: $550 per million MAR</li>
            <li>5M-15M rows/mo: $450 per million MAR</li>
            <li>15M-20M rows/mo: $350 per million MAR</li>
            <li>20M-30M rows/mo: $325 per million MAR</li>
            <li>30M+ rows/mo: Custom pricing</li>
          </>
        )}
        {type === 'fivetran-transformation' && (
          <>
            <li>0-5,000 model runs/mo: Free</li>
            <li>5,000-30,000 runs/mo: $0.01 per run</li>
            <li>30,000-100,000 runs/mo: $0.007 per run</li>
            <li>100,000+ runs/mo: $0.002 per run</li>
          </>
        )}
        {type === 'reactor' && (
          <>
            <li>Up to 1M records/mo: {formatCurrency(950)}/month</li>
            <li>1M-5M records/mo: {formatCurrency(1900)}/month</li>
            <li>5M-10M records/mo: {formatCurrency(3800)}/month</li>
            <li>10M+ records/mo: {formatCurrency(3800)} + {formatCurrency(1000)} per 5M additional records</li>
            <li className="font-medium text-[#2462AA]/80">All tiers include unlimited model runs for transformations</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default PricingTierInfo;
