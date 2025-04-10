
import React, { useState, useEffect } from 'react';
import InputSection from '@/components/calculator/InputSection';
import ResultsSection from '@/components/calculator/ResultsSection';
import { CalculatorInputs } from '@/lib/calculator-types';
import { calculateResults, findAppropriateReactorTier } from '@/lib/calculator-logic';

const Index = () => {
  // Updated initial values to start at 0
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyActiveRows: 0,
    totalRecords: 0,
    modelRuns: 0,
    growthRate: 0,
    fivetranTier: 'standard',
    connectors: 0,
    reactorTier: '5M', // Default to the 5M tier
  });

  // Auto-select appropriate Reactor tier when totalRecords changes
  useEffect(() => {
    // Only auto-select if the user hasn't explicitly chosen a tier manually
    if (inputs.totalRecords > 0) {
      setInputs(prev => ({
        ...prev,
        reactorTier: findAppropriateReactorTier(prev.totalRecords)
      }));
    }
  }, [inputs.totalRecords]);

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
