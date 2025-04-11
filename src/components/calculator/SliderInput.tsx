
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/lib/formatter";
import { useToast } from "@/hooks/use-toast";
import { CalculatorInputs } from "@/lib/calculator-types";

interface SliderInputProps {
  id: keyof CalculatorInputs;
  label: string;
  tooltip: string;
  value: number;
  onChange: (name: keyof CalculatorInputs, value: number) => void;
  onInputChange: (name: keyof CalculatorInputs, value: string) => void;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
  labelClassName?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({
  id,
  label,
  tooltip,
  value,
  onChange,
  onInputChange,
  max,
  step,
  formatValue = formatNumber,
  labelClassName = "text-base",
}) => {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className={`${labelClassName} flex items-center`}>
        {label}
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="ml-2 h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </Label>
      <Input
        id={id}
        value={formatValue(value)}
        onChange={(e) => onInputChange(id, e.target.value)}
        className="w-32 text-right"
      />
    </div>
  );
};

export default SliderInput;
