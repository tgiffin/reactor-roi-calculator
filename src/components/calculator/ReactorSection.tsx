
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import PricingTierInfo from './PricingTierInfo';
import { CalculatorInputs } from "@/lib/calculator-types";

interface ReactorSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
}

const ReactorSection: React.FC<ReactorSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange 
}) => {
  return (
    <div className="space-y-4">
      <SliderInput
        id="totalRecords"
        label="Reactor: Total Records Per Month"
        tooltip="This represents the total number of records ingested per month in Reactor. Unlike Fivetran's MAR pricing, Reactor uses a flat fee structure based on total data volume, not per-row processing. Reactor includes unlimited model runs for transformations and entity output materializations at no additional cost."
        value={inputs.totalRecords}
        onChange={(name, value) => handleSliderChange(name, [value])}
        onInputChange={handleInputChange}
        max={10000000}
        step={10000}
        labelClassName="text-base font-bold"
      />
      <Slider
        id="totalRecordsSlider"
        value={[inputs.totalRecords]}
        max={10000000}
        step={10000}
        onValueChange={(value) => handleSliderChange('totalRecords', value)}
        className="py-2"
      />
      <PricingTierInfo type="reactor" />
    </div>
  );
};

export default ReactorSection;
