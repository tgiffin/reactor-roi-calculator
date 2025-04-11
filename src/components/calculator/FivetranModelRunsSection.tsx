
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import PricingTierInfo from './PricingTierInfo';
import { CalculatorInputs, FivetranTier } from "@/lib/calculator-types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface FivetranModelRunsSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
  setFivetranTier?: (tier: FivetranTier) => void;
}

const FivetranModelRunsSection: React.FC<FivetranModelRunsSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange,
  setFivetranTier
}) => {
  const showConnectors = true;
  
  // Set maximum model runs based on tier
  const maxModelRuns = 200000;
  
  return (
    <div className="space-y-6">
      {/* Model Runs */}
      <div className="space-y-4">
        <SliderInput
          id="modelRuns"
          label="Fivetran: Monthly Model Runs"
          tooltip="Number of dbt model runs per month. First 5,000 runs are free."
          value={inputs.modelRuns}
          onChange={(name, value) => handleSliderChange(name, [value])}
          onInputChange={handleInputChange}
          max={maxModelRuns}
          step={1000}
          labelClassName="text-base font-semibold"
        />
        <Slider
          id="modelRunsSlider"
          value={[inputs.modelRuns]}
          max={maxModelRuns}
          step={1000}
          onValueChange={(value) => handleSliderChange('modelRuns', value)}
          className="py-2"
        />
        
        <PricingTierInfo type="fivetran-transformation" />
      </div>

      {/* Connectors */}
      {showConnectors && (
        <div className="space-y-4">
          <SliderInput
            id="connectors"
            label="Fivetran: Number of Connectors"
            tooltip="Each connector costs approximately $100 per month."
            value={inputs.connectors}
            onChange={(name, value) => handleSliderChange(name, [value])}
            onInputChange={handleInputChange}
            max={50}
            step={1}
            labelClassName="text-base font-semibold"
          />
          <Slider
            id="connectorsSlider"
            value={[inputs.connectors]}
            max={50}
            step={1}
            onValueChange={(value) => handleSliderChange('connectors', value)}
            className="py-2"
          />
        </div>
      )}
    </div>
  );
};

export default FivetranModelRunsSection;
