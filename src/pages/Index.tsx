import React, { useState, useEffect } from 'react';
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
        <div className="text-center mb-10">
          <div className="mb-2 inline-block bg-gradient-to-r from-reactor-navy to-reactor-fivetran bg-clip-text text-transparent">
            <h1 className="text-4xl font-bold tracking-tight mb-2 font-inter">
              ROI Calculator
            </h1>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-reactor-brand-black mb-2 font-inter">
            <span className="text-reactor-reactor-blue">Reactor</span> vs. <span className="text-reactor-fivetran">Fivetran</span> Comparison
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-reactor-text-grey font-inter">
            See how much you could save by switching from Fivetran's MAR-based pricing to Reactor's flat fee model.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection inputs={inputs} setInputs={setInputs} />
          <ResultsSection results={results} />
        </div>

        <div className="mt-16 px-4 py-6 bg-white rounded-lg shadow-md border border-reactor-light-grey/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-medium mb-6 text-reactor-navy font-inter">Why Choose Reactor?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gradient-to-br from-white to-reactor-background-grey rounded-lg shadow-sm border border-reactor-light-grey/50">
                <h3 className="text-lg font-bold mb-3 text-reactor-reactor-blue font-inter">Predictable Pricing</h3>
                <p className="text-reactor-text-grey font-inter">
                  Flat monthly fee regardless of how many records you process, making budgeting simple.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-white to-reactor-background-grey rounded-lg shadow-sm border border-reactor-light-grey/50">
                <h3 className="text-lg font-bold mb-3 text-reactor-reactor-blue font-inter">Unlimited Transformations</h3>
                <p className="text-reactor-text-grey font-inter">
                  Run as many transformations as you need without paying extra, unlike Fivetran's per-model pricing.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-white to-reactor-background-grey rounded-lg shadow-sm border border-reactor-light-grey/50">
                <h3 className="text-lg font-bold mb-3 text-reactor-reactor-blue font-inter">All Connectors Included</h3>
                <p className="text-reactor-text-grey font-inter">
                  Access to all standard data connectors with your subscription at no additional cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
