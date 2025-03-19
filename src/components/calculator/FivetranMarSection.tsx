
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import { CalculatorInputs } from "@/lib/calculator-types";

interface FivetranMarSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
}

const FivetranMarSection: React.FC<FivetranMarSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange 
}) => {
  return (
    <div className="space-y-4">
      <SliderInput
        id="monthlyActiveRows"
        label="Monthly Active Rows (MARs) - Fivetran"
        tooltip="Monthly Active Rows (MARs) are the primary pricing metric for Fivetran. Each unique row processed in your source that is added, updated, or deleted counts as a MAR and affects your billing."
        value={inputs.monthlyActiveRows}
        onChange={(name, value) => handleSliderChange(name, [value])}
        onInputChange={handleInputChange}
        max={30000000}
        step={500000}
      />
      <Slider
        id="monthlyActiveRowsSlider"
        value={[inputs.monthlyActiveRows]}
        max={30000000}
        step={500000}
        onValueChange={(value) => handleSliderChange('monthlyActiveRows', value)}
        className="py-2"
      />
    </div>
  );
};

export default FivetranMarSection;
