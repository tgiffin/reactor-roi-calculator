
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/lib/formatter";
import { CalculatorInputs } from "@/lib/calculator-types";

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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="monthlyActiveRows" className="text-base flex items-center">
              Monthly Active Rows (MARs) - Fivetran
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    The number of monthly active rows processed in Fivetran
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="monthlyActiveRows"
              value={formatNumber(inputs.monthlyActiveRows)}
              onChange={(e) => handleInputChange('monthlyActiveRows', e.target.value)}
              className="w-32 text-right"
            />
          </div>
          <Slider
            id="monthlyActiveRowsSlider"
            value={[inputs.monthlyActiveRows]}
            max={10000000}
            step={10000}
            onValueChange={(value) => handleSliderChange('monthlyActiveRows', value)}
            className="py-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="totalRecords" className="text-base flex items-center">
              Total Records Per Month - Reactor
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    Total records ingested per month for Reactor pricing
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="totalRecords"
              value={formatNumber(inputs.totalRecords)}
              onChange={(e) => handleInputChange('totalRecords', e.target.value)}
              className="w-32 text-right"
            />
          </div>
          <Slider
            id="totalRecordsSlider"
            value={[inputs.totalRecords]}
            max={10000000}
            step={10000}
            onValueChange={(value) => handleSliderChange('totalRecords', value)}
            className="py-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="modelRuns" className="text-base flex items-center">
              Monthly Model Runs - Fivetran
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    Number of transformation model runs per month in Fivetran
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="modelRuns"
              value={formatNumber(inputs.modelRuns)}
              onChange={(e) => handleInputChange('modelRuns', e.target.value)}
              className="w-32 text-right"
            />
          </div>
          <Slider
            id="modelRunsSlider"
            value={[inputs.modelRuns]}
            max={200000}
            step={1000}
            onValueChange={(value) => handleSliderChange('modelRuns', value)}
            className="py-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="connectors" className="text-base flex items-center">
              Number of Connectors
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    Number of data connectors used (affects Fivetran pricing)
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="connectors"
              value={formatNumber(inputs.connectors)}
              onChange={(e) => handleInputChange('connectors', e.target.value)}
              className="w-32 text-right"
            />
          </div>
          <Slider
            id="connectorsSlider"
            value={[inputs.connectors]}
            max={50}
            step={1}
            onValueChange={(value) => handleSliderChange('connectors', value)}
            className="py-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="growthRate" className="text-base flex items-center">
              Annual Growth Rate (%)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    Expected growth in data volume over the next 12 months
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="growthRate"
              value={inputs.growthRate.toString()}
              onChange={(e) => handleInputChange('growthRate', e.target.value)}
              className="w-32 text-right"
            />
          </div>
          <Slider
            id="growthRateSlider"
            value={[inputs.growthRate]}
            max={100}
            step={1}
            onValueChange={(value) => handleSliderChange('growthRate', value)}
            className="py-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InputSection;
