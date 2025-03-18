
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import { CalculatorInputs } from "@/lib/calculator-types";

interface GrowthRateSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
}

const GrowthRateSection: React.FC<GrowthRateSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange 
}) => {
  return (
    <div className="space-y-4">
      <SliderInput
        id="growthRate"
        label="Annual Growth Rate (%)"
        tooltip="Your projected annual growth rate in data volume. This affects long-term costs significantly, as Fivetran's per-row pricing scales linearly with growth, while Reactor's tiered pricing provides better cost predictability."
        value={inputs.growthRate}
        onChange={(name, value) => handleSliderChange(name, [value])}
        onInputChange={handleInputChange}
        max={100}
        step={1}
        formatValue={(value) => value.toString()}
      />
      <Slider
        id="growthRateSlider"
        value={[inputs.growthRate]}
        max={100}
        step={1}
        onValueChange={(value) => handleSliderChange('growthRate', value)}
        className="py-2"
      />
    </div>
  );
};

export default GrowthRateSection;
