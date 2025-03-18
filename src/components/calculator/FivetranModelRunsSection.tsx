
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import PricingTierInfo from './PricingTierInfo';
import { CalculatorInputs } from "@/lib/calculator-types";

interface FivetranModelRunsSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
}

const FivetranModelRunsSection: React.FC<FivetranModelRunsSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange 
}) => {
  return (
    <div className="space-y-4 ml-4 border-l-2 pl-4 border-gray-200">
      <SliderInput
        id="modelRuns"
        label="Monthly Model Runs - Fivetran Add-on"
        tooltip="This counts the number of transformation model executions in Fivetran each month. Fivetran charges per model run after the free tier (5,000 runs), with decreasing costs at higher volumes."
        value={inputs.modelRuns}
        onChange={handleSliderChange}
        onInputChange={handleInputChange}
        max={200000}
        step={1000}
      />
      <Slider
        id="modelRunsSlider"
        value={[inputs.modelRuns]}
        max={200000}
        step={1000}
        onValueChange={(value) => handleSliderChange('modelRuns', value)}
        className="py-2"
      />
      <PricingTierInfo type="fivetran-transformation" />
    </div>
  );
};

export default FivetranModelRunsSection;
