
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CalculatorInputs, FivetranTier } from "@/lib/calculator-types";
import FivetranMarSection from './FivetranMarSection';
import FivetranModelRunsSection from './FivetranModelRunsSection';
import FivetranTierSection from './FivetranTierSection';
import ReactorSection from './ReactorSection';
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

  const setFivetranTier = (tier: FivetranTier) => {
    // If switching to free tier, check both MAR and model runs limits
    if (tier === 'free') {
      // Cap values to free tier limits
      setInputs((prev) => ({ 
        ...prev, 
        fivetranTier: tier,
        monthlyActiveRows: prev.monthlyActiveRows > 500000 ? 500000 : prev.monthlyActiveRows,
        modelRuns: prev.modelRuns > 5000 ? 5000 : prev.modelRuns
      }));
    } else {
      setInputs((prev) => ({ ...prev, fivetranTier: tier }));
    }
  };

  return (
    <Card className="h-full bg-[#F3F3F3]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Calculator Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Reactor Section - Now moved to the top */}
        <ReactorSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange} 
        />

        {/* Fivetran Tier Selection */}
        <FivetranTierSection 
          inputs={inputs} 
          setFivetranTier={setFivetranTier} 
        />

        {/* Fivetran MAR Section */}
        <FivetranMarSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange} 
          setFivetranTier={setFivetranTier}
        />

        {/* Fivetran Model Runs Section - as a subsection under MARs */}
        <FivetranModelRunsSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange}
          setFivetranTier={setFivetranTier}
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
