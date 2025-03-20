
import React, { useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import { CalculatorInputs, FivetranTier } from "@/lib/calculator-types";

interface FivetranModelRunsSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
  setFivetranTier: (tier: FivetranTier) => void;
}

const FivetranModelRunsSection: React.FC<FivetranModelRunsSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange,
  setFivetranTier
}) => {
  // This effect watches for when the model runs exceed 5000 while the free tier is selected
  useEffect(() => {
    if (inputs.fivetranTier === 'free' && inputs.modelRuns > 5000) {
      setFivetranTier('standard');
    }
  }, [inputs.modelRuns, inputs.fivetranTier, setFivetranTier]);

  // Determine max value and step based on selected tier
  const maxValue = inputs.fivetranTier === 'free' ? 5000 : 200000;
  const stepValue = inputs.fivetranTier === 'free' ? 100 : 1000;

  return (
    <div className="space-y-4 ml-4 border-l-2 pl-4 border-gray-200">
      <SliderInput
        id="modelRuns"
        label="Monthly Model Runs - Fivetran Add-on"
        tooltip="This counts the number of transformation model executions in Fivetran each month. Fivetran charges per model run after the free tier (5,000 runs), with decreasing costs at higher volumes."
        value={inputs.modelRuns}
        onChange={(name, value) => handleSliderChange(name, [value])}
        onInputChange={handleInputChange}
        max={maxValue}
        step={stepValue}
        labelClassName="text-sm font-bold text-gray-900"
      />
      <Slider
        id="modelRunsSlider"
        value={[inputs.modelRuns]}
        max={maxValue}
        step={stepValue}
        onValueChange={(value) => handleSliderChange('modelRuns', value)}
        className="py-2"
      />
      
      <div className="text-xs bg-[#DDDDDD] p-3 rounded-md border border-reactor-light-grey/50 shadow-sm mt-2">
        <div className="font-semibold text-[#2462AA] mb-2">MMR Pricing Tiers:</div>
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
