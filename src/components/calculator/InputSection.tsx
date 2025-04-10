
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorInputs, FivetranTier, ReactorTier } from "@/lib/calculator-types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FivetranTierSection from "./FivetranTierSection";
import ReactorTierSelector from "./ReactorTierSelector";
import FivetranMarSection from "./FivetranMarSection";
import ConnectorsSection from "./ConnectorsSection";
import FivetranModelRunsSection from "./FivetranModelRunsSection";
import GrowthRateSection from "./GrowthRateSection";
import ReactorSection from "./ReactorSection";

interface InputSectionProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs }) => {
  const [activeTab, setActiveTab] = useState<string>("fivetran");

  const handleSliderChange = (name: keyof CalculatorInputs, value: number[]) => {
    setInputs(prev => ({
      ...prev,
      [name]: value[0] // Only take the first value since we're using single-value sliders
    }));
  };

  const handleInputChange = (name: keyof CalculatorInputs, value: string) => {
    const numberValue = value === "" ? 0 : parseFloat(value.replace(/,/g, ""));
    if (isNaN(numberValue)) return;

    setInputs(prev => ({
      ...prev,
      [name]: numberValue
    }));
  };

  const setFivetranTier = (tier: FivetranTier) => {
    setInputs(prev => ({
      ...prev,
      fivetranTier: tier
    }));
  };

  const setReactorTier = (tier: ReactorTier) => {
    setInputs(prev => ({
      ...prev,
      reactorTier: tier
    }));
  };

  return (
    <Card className="shadow-md border-reactor-light-grey h-full bg-[#F3F3F3]">
      <CardHeader className="bg-white rounded-t-lg">
        <CardTitle className="text-xl font-bold text-reactor-navy">Data Pipeline Cost Calculator</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="fivetran" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="fivetran">Fivetran</TabsTrigger>
            <TabsTrigger value="reactor">Reactor</TabsTrigger>
          </TabsList>
          <TabsContent value="fivetran" className="space-y-6">
            <FivetranTierSection inputs={inputs} setFivetranTier={setFivetranTier} />
            <FivetranMarSection inputs={inputs} handleSliderChange={handleSliderChange} handleInputChange={handleInputChange} />
            <FivetranModelRunsSection inputs={inputs} handleSliderChange={handleSliderChange} handleInputChange={handleInputChange} />
            <ConnectorsSection inputs={inputs} handleSliderChange={handleSliderChange} handleInputChange={handleInputChange} />
          </TabsContent>
          <TabsContent value="reactor" className="space-y-6">
            <ReactorTierSelector inputs={inputs} setReactorTier={setReactorTier} />
            <ReactorSection inputs={inputs} handleSliderChange={handleSliderChange} handleInputChange={handleInputChange} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <GrowthRateSection inputs={inputs} handleSliderChange={handleSliderChange} handleInputChange={handleInputChange} />
        </div>
      </CardContent>
    </Card>
  );
};

export default InputSection;
