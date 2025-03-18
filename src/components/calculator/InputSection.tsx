
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { InfoIcon, ListIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber, formatCurrency } from "@/lib/formatter";
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
                    <p>Monthly Active Rows (MARs) are the primary pricing metric for Fivetran.</p>
                    <p className="mt-1">Each unique row processed in your source that is added, updated, or deleted counts as a MAR and affects your billing.</p>
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
          <div className="text-xs text-muted-foreground">
            <div className="font-semibold flex items-center mb-1">
              <ListIcon className="h-3 w-3 mr-1" /> Fivetran MAR Pricing Tiers:
            </div>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Up to 1M rows: $1,250 per million MAR</li>
              <li>1M-10M rows: $1,000 per million MAR</li>
              <li>10M+ rows: $750 per million MAR</li>
            </ul>
          </div>
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
                    <p>This represents the total number of records ingested per month in Reactor.</p>
                    <p className="mt-1">Unlike Fivetran's MAR pricing, Reactor uses a flat fee structure based on total data volume, not per-row processing.</p>
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
          <div className="text-xs text-muted-foreground">
            <div className="font-semibold flex items-center mb-1">
              <ListIcon className="h-3 w-3 mr-1" /> Reactor Pricing Tiers:
            </div>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Up to 1M records: {formatCurrency(950)}/month</li>
              <li>1M-5M records: {formatCurrency(1900)}/month</li>
              <li>5M-10M records: {formatCurrency(3800)}/month</li>
              <li>10M+ records: {formatCurrency(3800)} + {formatCurrency(1000)} per 5M additional records</li>
            </ul>
          </div>
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
                    <p>This counts the number of transformation model executions in Fivetran each month.</p>
                    <p className="mt-1">Fivetran charges per model run after the free tier (5,000 runs), with decreasing costs at higher volumes.</p>
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
          <div className="text-xs text-muted-foreground">
            <div className="font-semibold flex items-center mb-1">
              <ListIcon className="h-3 w-3 mr-1" /> Fivetran Transformation Pricing:
            </div>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>0-5,000 model runs: Free</li>
              <li>5,000-30,000 runs: $0.01 per run</li>
              <li>30,000-100,000 runs: $0.007 per run</li>
              <li>100,000+ runs: $0.002 per run</li>
            </ul>
          </div>
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
                    <p>The number of data source connectors used in your data pipeline.</p>
                    <p className="mt-1">Fivetran charges a base fee per connector, while Reactor includes all standard connectors in the flat fee (custom connectors may have additional costs).</p>
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
          <div className="text-xs text-muted-foreground">
            <div className="font-semibold flex items-center mb-1">
              <ListIcon className="h-3 w-3 mr-1" /> Connector Pricing:
            </div>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Fivetran: ~$100 per connector per month (simplified)</li>
              <li>Reactor: All standard connectors included in flat fee</li>
            </ul>
          </div>
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
                    <p>Your projected annual growth rate in data volume.</p>
                    <p className="mt-1">This affects long-term costs significantly, as Fivetran's per-row pricing scales linearly with growth, while Reactor's tiered pricing provides better cost predictability.</p>
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
