
import React, { useState, useEffect } from 'react';
import InputSection from '@/components/calculator/InputSection';
import ResultsSection from '@/components/calculator/ResultsSection';
import { CalculatorInputs } from '@/lib/calculator-types';
import { calculateResults } from '@/lib/calculator-logic';

const Index = () => {
  // Default initial values
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyActiveRows: 1000000, // 1 million rows
    totalRecords: 1000000, // 1 million records
    modelRuns: 10000, // 10,000 model runs
    connectors: 5, // 5 connectors
    growthRate: 10, // 10% annual growth
  });

  // Calculate results whenever inputs change
  const results = calculateResults(inputs);

  return (
    <div className="min-h-screen bg-reactor-background-grey py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-reactor-brand-black mb-2 font-inter">
            <span className="text-reactor-reactor-blue">Reactor</span> vs. <span className="text-reactor-fivetran">Fivetran</span> ROI Calculator
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-reactor-text-grey font-inter">
            See how much you could save by switching from Fivetran's MAR-based pricing to Reactor's flat fee model.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection inputs={inputs} setInputs={setInputs} />
          <ResultsSection results={results} />
        </div>

        <div className="mt-16 px-4 py-6 bg-white rounded-lg shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-medium mb-4 text-reactor-brand-black font-inter">Why Choose Reactor?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-reactor-reactor-blue font-inter">Predictable Pricing</h3>
                <p className="text-reactor-text-grey font-inter">
                  Flat monthly fee regardless of how many records you process, making budgeting simple.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-reactor-reactor-blue font-inter">Unlimited Transformations</h3>
                <p className="text-reactor-text-grey font-inter">
                  Run as many transformations as you need without paying extra, unlike Fivetran's per-model pricing.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-reactor-reactor-blue font-inter">All Connectors Included</h3>
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
