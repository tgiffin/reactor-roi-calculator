
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
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
        onChange={(name, value) => handleSliderChange(name, [value])}
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
      
      <div className="text-xs bg-white/80 p-3 rounded-md border border-reactor-light-grey/50 shadow-sm mt-2">
        <div className="font-semibold text-reactor-fivetran mb-2">MMR Pricing Tiers:</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>0-5,000 model runs/mo: Free</li>
          <li>5,000-30,000 runs/mo: $0.01 per run</li>
          <li>30,000-100,000 runs/mo: $0.007 per run</li>
          <li>100,000+ runs/mo: $0.002 per run</li>
        </ul>
      </div>
    </div>
  );
};

export default FivetranModelRunsSection;
