
import React, { useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import { CalculatorInputs, FivetranTier } from "@/lib/calculator-types";

interface FivetranMarSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
  setFivetranTier: (tier: FivetranTier) => void;
}

const FivetranMarSection: React.FC<FivetranMarSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange,
  setFivetranTier
}) => {
  // This effect watches for when the MAR value exceeds 500k while the free tier is selected
  useEffect(() => {
    if (inputs.fivetranTier === 'free' && inputs.monthlyActiveRows > 500000) {
      setFivetranTier('standard');
    }
  }, [inputs.monthlyActiveRows, inputs.fivetranTier, setFivetranTier]);

  // Determine max value based on selected tier
  const maxValue = inputs.fivetranTier === 'free' ? 500000 : 30000000;

  return (
    <div className="space-y-4">
      <SliderInput
        id="monthlyActiveRows"
        label="Monthly Active Rows (MARs) - Fivetran"
        tooltip="Monthly Active Rows (MARs) are the primary pricing metric for Fivetran. Each unique row processed in your source that is added, updated, or deleted counts as a MAR and affects your billing."
        value={inputs.monthlyActiveRows}
        onChange={(name, value) => handleSliderChange(name, [value])}
        onInputChange={handleInputChange}
        max={maxValue}
        step={inputs.fivetranTier === 'free' ? 10000 : 500000}
        labelClassName="text-sm font-bold text-gray-900"
      />
      <Slider
        id="monthlyActiveRowsSlider"
        value={[inputs.monthlyActiveRows]}
        max={maxValue}
        step={inputs.fivetranTier === 'free' ? 10000 : 500000}
        onValueChange={(value) => handleSliderChange('monthlyActiveRows', value)}
        className="py-2"
      />
    </div>
  );
};

export default FivetranMarSection;
