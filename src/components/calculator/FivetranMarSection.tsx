
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import PricingTierInfo from './PricingTierInfo';
import { InfoIcon } from "lucide-react";
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
  // Set the maximum value based on the selected tier
  const getMaxValue = () => {
    return 30000000;   // Go up to 30M for visualization
  };

  // Get step size based on tier
  const getStepSize = () => {
    return 500000;
  };

  return (
    <div className="space-y-4">
      {/* MAR Slider */}
      <SliderInput
        id="monthlyActiveRows"
        label="Fivetran: Monthly Active Rows (MAR)"
        tooltip="This represents the number of rows processed by Fivetran each month. Fivetran pricing is based on Monthly Active Rows (MARs)."
        value={inputs.monthlyActiveRows}
        onChange={(name, value) => handleSliderChange(name, [value])}
        onInputChange={handleInputChange}
        max={getMaxValue()}
        step={getStepSize()}
        labelClassName="text-base font-bold"
      />
      <Slider
        id="monthlyActiveRowsSlider"
        value={[inputs.monthlyActiveRows]}
        max={getMaxValue()}
        step={getStepSize()}
        onValueChange={(value) => handleSliderChange('monthlyActiveRows', value)}
        className="py-2"
      />
      <PricingTierInfo type="fivetran-mar" />
    </div>
  );
};

export default FivetranMarSection;
