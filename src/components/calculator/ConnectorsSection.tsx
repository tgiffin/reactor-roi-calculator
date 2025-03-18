
import React from 'react';
import { Slider } from "@/components/ui/slider";
import SliderInput from './SliderInput';
import { ListIcon } from "lucide-react";
import { CalculatorInputs } from "@/lib/calculator-types";

interface ConnectorsSectionProps {
  inputs: CalculatorInputs;
  handleSliderChange: (name: keyof CalculatorInputs, value: number[]) => void;
  handleInputChange: (name: keyof CalculatorInputs, value: string) => void;
}

const ConnectorsSection: React.FC<ConnectorsSectionProps> = ({ 
  inputs, 
  handleSliderChange, 
  handleInputChange 
}) => {
  return (
    <div className="space-y-4">
      <SliderInput
        id="connectors"
        label="Number of Connectors"
        tooltip="The number of data source connectors used in your data pipeline. Fivetran charges a base fee per connector, while Reactor includes all standard connectors in the flat fee (custom connectors may have additional costs)."
        value={inputs.connectors}
        onChange={handleSliderChange}
        onInputChange={handleInputChange}
        max={50}
        step={1}
      />
      <Slider
        id="connectorsSlider"
        value={[inputs.connectors]}
        max={50}
        step={1}
        onValueChange={(value) => handleSliderChange('connectors', value)}
        className="py-2"
      />
      <div className="text-xs text-muted-foreground">
        <div className="font-semibold flex items-center mb-1">
          <ListIcon className="h-3 w-3 mr-1" /> Connector Pricing (Simplified):
        </div>
        <ul className="list-disc pl-5 space-y-0.5">
          <li>Fivetran: ~$100 per connector per month (simplified)</li>
          <li>Reactor: All standard connectors included in flat fee</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectorsSection;
