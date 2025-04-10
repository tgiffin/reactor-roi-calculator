
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
  // Default configuration for model runs
  const maxRuns = 200000;
  const stepSize = 1000;
  const tooltip = "This represents the number of times your dbt models are executed per month.";

  return (
    <div className="space-y-4">
      <SliderInput
        id="modelRuns"
        label="Monthly Model Runs"
        tooltip={tooltip}
        value={inputs.modelRuns}
        onChange={(name, value) => handleSliderChange(name, [value])}
        onInputChange={handleInputChange}
        max={maxRuns}
        step={stepSize}
        labelClassName="text-base font-bold"
      />
      <Slider
        id="modelRunsSlider"
        value={[inputs.modelRuns]}
        max={maxRuns}
        step={stepSize}
        onValueChange={(value) => handleSliderChange('modelRuns', value)}
        className="py-2"
      />
    </div>
  );
};

export default FivetranModelRunsSection;
