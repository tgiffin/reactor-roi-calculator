
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-2">
            Reactor vs. Fivetran ROI Calculator
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            See how much you could save by switching from Fivetran's MAR-based pricing to Reactor's flat fee model.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection inputs={inputs} setInputs={setInputs} />
          <ResultsSection results={results} />
        </div>

        <div className="mt-16 px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose Reactor?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Predictable Pricing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Flat monthly fee regardless of how many records you process, making budgeting simple.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Unlimited Transformations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Run as many transformations as you need without paying extra, unlike Fivetran's per-model pricing.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">All Connectors Included</h3>
                <p className="text-gray-600 dark:text-gray-400">
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
