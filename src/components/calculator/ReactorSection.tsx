
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import { CalculatorInputs } from "@/lib/calculator-types";

interface ReactorSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
  hideRowsSlider?: boolean;
}

const ReactorSection: React.FC<ReactorSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange,
  hideRowsSlider = false
}) => {
  return (
    <div className="space-y-4">
      {/* Only show the Reactor-specific total records input if not hidden */}
      {!hideRowsSlider && (
        <>
          <SliderInput
            id="totalRecords"
            label="Reactor: Total Records Per Month"
            tooltip="This represents the total number of records ingested per month in Reactor. Reactor uses a flat rate pricing model of $400 per million rows with a $2,500 monthly minimum."
            value={inputs.totalRecords}
            onChange={(name, value) => handleSliderChange(name, [value])}
            onInputChange={handleInputChange}
            max={30000000}
            step={500000}
            labelClassName="text-base font-bold"
          />
          <Slider
            id="totalRecordsSlider"
            value={[inputs.totalRecords]}
            max={30000000}
            step={500000}
            onValueChange={(value) => handleSliderChange('totalRecords', value)}
            className="py-2"
          />
        </>
      )}
    </div>
  );
};

export default ReactorSection;
