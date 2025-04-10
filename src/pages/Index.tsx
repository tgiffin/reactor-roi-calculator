
import React, { useState, useEffect } from 'react';
import InputSection from '@/components/calculator/InputSection';
import ResultsSection from '@/components/calculator/ResultsSection';
import { CalculatorInputs } from '@/lib/calculator-types';
import { calculateResults } from '@/lib/calculator-logic';

const Index = () => {
  // Updated initial values to start at 0
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyActiveRows: 0,
    totalRecords: 0,
    modelRuns: 0,
    growthRate: 0,
    fivetranTier: 'standard',
    connectors: 0,
    reactorTier: 'flatRate', // Updated to use flat rate tier
  });

  // Auto-adjust for Free tier Fivetran limits only
  useEffect(() => {
    if (inputs.fivetranTier === 'free') {
      setInputs(prev => ({
        ...prev,
        monthlyActiveRows: Math.min(prev.monthlyActiveRows, 500000),
        modelRuns: Math.min(prev.modelRuns, 5000),
      }));
    }
  }, [inputs.fivetranTier]);

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
