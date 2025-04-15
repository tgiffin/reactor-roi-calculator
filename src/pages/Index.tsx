
import React, { useState } from 'react';
import InputSection from '@/components/calculator/InputSection';
import ResultsSection from '@/components/calculator/ResultsSection';
import { CalculatorInputs } from '@/lib/calculator-types';
import { calculateResults } from '@/lib/calculator-logic';

const Index = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyActiveRows: 5000000,
    totalRecords: 5000000,
    modelRuns: 0,
    fivetranTier: 'standard', // Default to standard tier
    reactorTier: 'flatRate',
  });

  const results = calculateResults(inputs);

  const handleScheduleCall = () => {
    window.open("https://reactordata.com/get-reactor/", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-reactor-background-grey py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection inputs={inputs} setInputs={setInputs} />
          <ResultsSection 
            results={results} 
            onScheduleCall={handleScheduleCall} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
