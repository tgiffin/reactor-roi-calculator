
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CalculatorInputs } from "@/lib/calculator-types";
import FivetranMarSection from './FivetranMarSection';
import FivetranModelRunsSection from './FivetranModelRunsSection';
import ReactorSection from './ReactorSection';
import ConnectorsSection from './ConnectorsSection';
import GrowthRateSection from './GrowthRateSection';

interface InputSectionProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs }) => {
  const { toast } = useToast();

  const handleSliderChange = (name: keyof CalculatorInputs, value: number[]) => {
    setInputs((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleInputChange = (name: keyof CalculatorInputs, value: string) => {
    const numValue = Number(value.replace(/,/g, ''));
    
    if (isNaN(numValue) || numValue < 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number",
        variant: "destructive"
      });
      return;
    }
    
    setInputs((prev) => ({ ...prev, [name]: numValue }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Calculator Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fivetran MAR Section */}
        <FivetranMarSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange} 
        />

        {/* Fivetran Model Runs Section - as a subsection under MARs */}
        <FivetranModelRunsSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange} 
        />

        {/* Reactor Section */}
        <ReactorSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange} 
        />

        {/* Connectors Section */}
        <ConnectorsSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange} 
        />

        {/* Growth Rate Section */}
        <GrowthRateSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange} 
        />
      </CardContent>
    </Card>
  );
};

export default InputSection;
