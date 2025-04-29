
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency } from "@/lib/formatter";
import { useToast } from "@/hooks/use-toast";

interface DirectFivetranCostInputProps {
  value: number;
  onChange: (value: number) => void;
}

const DirectFivetranCostInput: React.FC<DirectFivetranCostInputProps> = ({ value, onChange }) => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState<string>(formatCurrency(value, 0));
  
  // Update local input value when prop value changes
  useEffect(() => {
    setInputValue(formatCurrency(value, 0));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow user to type freely without immediate validation
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    try {
      // Remove currency formatting ($, commas) to parse the number
      const cleanValue = inputValue.replace(/[$,\s]/g, '');
      
      // If empty, revert to current value
      if (!cleanValue) {
        setInputValue(formatCurrency(value, 0));
        return;
      }
      
      const numValue = Number(cleanValue);
      
      // Validate the number
      if (isNaN(numValue)) {
        setInputValue(formatCurrency(value, 0));
        toast({
          title: "Invalid input",
          description: "Please enter a valid number",
          variant: "destructive"
        });
        return;
      }
      
      // Ensure non-negative value
      if (numValue < 0) {
        setInputValue(formatCurrency(value, 0));
        toast({
          title: "Invalid input",
          description: "Please enter a positive number",
          variant: "destructive"
        });
        return;
      }
      
      // Update parent component with new value
      onChange(numValue);
      // Format the displayed value
      setInputValue(formatCurrency(numValue, 0));
    } catch (error) {
      // Revert to current value on any error
      setInputValue(formatCurrency(value, 0));
      toast({
        title: "Error processing input",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when the input is focused
    e.currentTarget.select();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="fivetranCost" className="text-base font-bold flex items-center">
          Current Monthly Fivetran Cost
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Enter your current monthly Fivetran bill. This is the total amount you pay Fivetran each month, which you can find on your Fivetran invoice or dashboard.</p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <Input
          id="fivetranCost"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="w-48 text-right"
          placeholder="$0"
        />
      </div>
    </div>
  );
};

export default DirectFivetranCostInput;
