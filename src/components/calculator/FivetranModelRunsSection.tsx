
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import PricingTierInfo from './PricingTierInfo';
import { CalculatorInputs, FivetranTier } from "@/lib/calculator-types";

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
    </div>
  );
};

export default FivetranModelRunsSection;
