
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import PricingTierInfo from './PricingTierInfo';
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
        onChange={handleSliderChange}
        onInputChange={handleInputChange}
        max={10000000}
        step={10000}
      />
      <Slider
        id="monthlyActiveRowsSlider"
        value={[inputs.monthlyActiveRows]}
        max={10000000}
        step={10000}
        onValueChange={(value) => handleSliderChange('monthlyActiveRows', value)}
        className="py-2"
      />
      <PricingTierInfo type="fivetran-mar" />
    </div>
  );
};

export default FivetranMarSection;
