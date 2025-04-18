
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CalculatorInputs, FivetranTier, ReactorTier } from "@/lib/calculator-types";
import FivetranModelRunsSection from './FivetranModelRunsSection';
import FivetranTierSection from './FivetranTierSection';
import ReactorSection from './ReactorSection';
import ReactorTierSelector from './ReactorTierSelector';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/lib/formatter";

interface InputSectionProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs }) => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState<string>(formatNumber(inputs.monthlyActiveRows));

  const handleGlobalRowsChange = (value: number[]) => {
    setInputs((prev) => ({
      ...prev, 
      monthlyActiveRows: value[0],
      totalRecords: value[0] // Set both values to the same
    }));
    setInputValue(formatNumber(value[0]));
  };

  const handleGlobalRowsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Always update the displayed value as the user types
    const rawValue = e.target.value;
    setInputValue(rawValue);
  };

  const handleGlobalRowsBlur = () => {
    try {
      // Remove commas and spaces to get a clean number
      const cleanValue = inputValue.replace(/[,\s]/g, '');
      
      // If the input is empty, revert to the current value
      if (!cleanValue) {
        setInputValue(formatNumber(inputs.monthlyActiveRows));
        return;
      }
      
      const numValue = Number(cleanValue);
      
      // If not a valid number, revert to the current value
      if (isNaN(numValue)) {
        setInputValue(formatNumber(inputs.monthlyActiveRows));
        toast({
          title: "Invalid input",
          description: "Please enter a valid number",
          variant: "destructive"
        });
        return;
      }
      
      // Validate the range
      if (numValue < 0) {
        setInputValue(formatNumber(inputs.monthlyActiveRows));
        toast({
          title: "Invalid input",
          description: "Please enter a positive number",
          variant: "destructive"
        });
        return;
      }
      
      // Ensure the input value is at least the minimum value
      const validValue = Math.max(numValue, minRowsValue);
      
      // Update the actual state and formatted display value
      setInputs((prev) => ({
        ...prev,
        monthlyActiveRows: validValue,
        totalRecords: validValue // Set both values to the same
      }));
      setInputValue(formatNumber(validValue));
    } catch (error) {
      // If any error occurs, revert to the current value
      setInputValue(formatNumber(inputs.monthlyActiveRows));
      toast({
        title: "Error processing input",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

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
    setInputs((prev) => ({ ...prev, fivetranTier: tier }));
  };

  const setReactorTier = (tier: ReactorTier) => {
    setInputs((prev) => ({ ...prev, reactorTier: tier }));
  };

  // Determine max value based on selected tier for global slider
  // Updated to 75M to match new calculation limit
  const maxRowsValue = 75000000;
  const minRowsValue = 4000000;

  return (
    <Card className="h-full bg-[#F3F3F3]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Calculator Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Global Rows Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="globalRows" className="text-base font-bold flex items-center">
              Total Monthly Rows
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>This sets the number of rows for both Reactor and Fivetran. For Reactor, this represents total records ingested, and for Fivetran, this sets the Monthly Active Rows (MARs).</p>
                </TooltipContent>
              </Tooltip>
            </Label>
            <Input
              id="globalRows"
              value={inputValue}
              onChange={handleGlobalRowsInputChange}
              onBlur={handleGlobalRowsBlur}
              onFocus={(e) => e.currentTarget.select()}
              className="w-32 text-right"
            />
          </div>
          <Slider
            id="globalRowsSlider"
            value={[inputs.totalRecords]}
            min={minRowsValue}
            max={maxRowsValue}
            step={500000}
            onValueChange={handleGlobalRowsChange}
            className="py-2"
          />
        </div>

        {/* Reactor Section - with tier selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reactor Settings</h3>
          
          {/* Add the new Reactor Tier Selector */}
          <ReactorTierSelector 
            inputs={inputs} 
            setReactorTier={setReactorTier}
          />
          
          <ReactorSection 
            inputs={inputs} 
            handleSliderChange={handleSliderChange} 
            handleInputChange={handleInputChange} 
            hideRowsSlider={true}
          />
        </div>

        {/* Fivetran Tier Selection */}
        <FivetranTierSection 
          inputs={inputs} 
          setFivetranTier={setFivetranTier} 
          simplified={true}
        />

        {/* Fivetran Model Runs Section */}
        <FivetranModelRunsSection 
          inputs={inputs} 
          handleSliderChange={handleSliderChange} 
          handleInputChange={handleInputChange}
          setFivetranTier={setFivetranTier}
        />
      </CardContent>
    </Card>
  );
};

export default InputSection;
