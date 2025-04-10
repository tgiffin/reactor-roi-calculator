
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
  // Calculate max MAR based on the selected Fivetran tier
  let maxMAR = 100000000; // Default max for slider (100M)
  let tooltip = "Monthly Active Rows (MAR) is the number of rows your Fivetran account processes each month.";
  
  return (
    <div className="space-y-4">
      <SliderInput
        id="monthlyActiveRows"
        label="Fivetran: Monthly Active Rows (MAR)"
        tooltip={tooltip}
        value={inputs.monthlyActiveRows}
        onChange={(name, value) => handleSliderChange(name, [value])}
        onInputChange={handleInputChange}
        max={maxMAR}
        step={100000}
        labelClassName="text-base font-bold"
      />
      <Slider
        id="marSlider"
        value={[inputs.monthlyActiveRows]}
        max={maxMAR}
        step={100000}
        onValueChange={(value) => handleSliderChange('monthlyActiveRows', value)}
        className="py-2"
      />
    </div>
  );
};

export default FivetranMarSection;
