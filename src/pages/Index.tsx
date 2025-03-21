
import React, { useState } from 'react';
import InputSection from '@/components/calculator/InputSection';
import ResultsSection from '@/components/calculator/ResultsSection';
import { CalculatorInputs } from '@/lib/calculator-types';
import { calculateResults } from '@/lib/calculator-logic';

const Index = () => {
  // Updated default initial values to match real customer scenarios
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyActiveRows: 18000000, // 18 million rows - based on client data
    totalRecords: 18000000, // 18 million records
    modelRuns: 15000, // 15,000 model runs
    growthRate: 15, // 15% annual growth
    fivetranTier: 'standard', // Default to standard tier
  });

  // Calculate results whenever inputs change
  const results = calculateResults(inputs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-reactor-background-grey py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection inputs={inputs} setInputs={setInputs} />
          <ResultsSection results={results} />
        </div>
      </div>
    </div>
  );
};

export default Index;
