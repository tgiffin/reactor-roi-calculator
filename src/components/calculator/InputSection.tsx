import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CalculatorInputs, ReactorTier } from "@/lib/calculator-types";
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
import DirectFivetranCostInput from './DirectFivetranCostInput';

interface InputSectionProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs }) => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState<string>(formatNumber(inputs.totalRecords));

  const handleRowsChange = (value: number[]) => {
    setInputs((prev) => ({
      ...prev, 
      totalRecords: value[0]
    }));
    setInputValue(formatNumber(value[0]));
  };

  const handleRowsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Always update the displayed value as the user types
    const rawValue = e.target.value;
    setInputValue(rawValue);
  };

  const handleRowsBlur = () => {
    try {
      // Remove commas and spaces to get a clean number
      const cleanValue = inputValue.replace(/[,\s]/g, '');
      
      // If the input is empty, revert to the current value
      if (!cleanValue) {
        setInputValue(formatNumber(inputs.totalRecords));
        return;
      }
      
      const numValue = Number(cleanValue);
      
      // If not a valid number, revert to the current value
      if (isNaN(numValue)) {
        setInputValue(formatNumber(inputs.totalRecords));
        toast({
          title: "Invalid input",
          description: "Please enter a valid number",
          variant: "destructive"
        });
        return;
      }
      
      // Validate the range
      if (numValue < 0) {
        setInputValue(formatNumber(inputs.totalRecords));
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
        totalRecords: validValue
      }));
      setInputValue(formatNumber(validValue));
    } catch (error) {
      // If any error occurs, revert to the current value
      setInputValue(formatNumber(inputs.totalRecords));
      toast({
        title: "Error processing input",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleFivetranCostChange = (newCost: number) => {
    setInputs((prev) => ({ ...prev, fivetranMonthlyCost: newCost }));
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
        {/* Direct Fivetran Cost Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Fivetran</h3>
          <DirectFivetranCostInput 
            value={inputs.fivetranMonthlyCost} 
            onChange={handleFivetranCostChange} 
          />
        </div>

        {/* Horizontal divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Reactor Section - with tier selection and rows slider */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reactor Settings</h3>
          
          {/* Add the Reactor Tier Selector */}
          <ReactorTierSelector 
            inputs={inputs} 
            setReactorTier={setReactorTier}
          />
          
          {/* Total Monthly Rows Slider for Reactor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="totalRecords" className="text-base font-bold flex items-center">
                Reactor: Total Monthly Rows
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>This represents the total number of records ingested per month in Reactor. Reactor uses a flat rate pricing model of $400 per million rows with a $2,000 monthly minimum.</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="totalRecords"
                value={inputValue}
                onChange={handleRowsInputChange}
                onBlur={handleRowsBlur}
                onFocus={(e) => e.currentTarget.select()}
                className="w-32 text-right"
              />
            </div>
            <Slider
              id="totalRecordsSlider"
              value={[inputs.totalRecords]}
              min={minRowsValue}
              max={maxRowsValue}
              step={500000}
              onValueChange={handleRowsChange}
              className="py-2"
            />
          </div>
          
          {/* Keep existing Reactor Section for additional settings if needed */}
          <ReactorSection 
            inputs={inputs} 
            handleSliderChange={() => {}} 
            handleInputChange={() => {}} 
            hideRowsSlider={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InputSection;
