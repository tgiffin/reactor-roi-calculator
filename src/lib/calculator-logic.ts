
import { CalculatorInputs, CalculatorResults } from './calculator-types';

// Calculate Fivetran costs based on their MAR model and transformation pricing
export const calculateFivetranCost = (inputs: CalculatorInputs): number => {
  // Calculate MAR cost - simplified model
  // These are simplified pricing tiers, real pricing would require more details
  let marCost = 0;
  const marMillion = inputs.monthlyActiveRows / 1000000;
  
  if (marMillion <= 1) {
    marCost = marMillion * 1250; // $1,250 per million MAR
  } else if (marMillion <= 10) {
    marCost = 1250 + (marMillion - 1) * 1000; // $1,000 per million MAR after first million
  } else {
    marCost = 1250 + 9000 + (marMillion - 10) * 750; // $750 per million MAR after 10 million
  }

  // Calculate transformation cost
  let transformationCost = 0;
  if (inputs.modelRuns > 5000) {
    // Free tier: 0-5,000 runs
    if (inputs.modelRuns <= 30000) {
      // $0.01 per run for 5,000-30,000
      transformationCost = (inputs.modelRuns - 5000) * 0.01;
    } else if (inputs.modelRuns <= 100000) {
      // $0.01 per run for 5,000-30,000
      // $0.007 per run for 30,000-100,000
      transformationCost = (30000 - 5000) * 0.01 + (inputs.modelRuns - 30000) * 0.007;
    } else {
      // $0.01 per run for 5,000-30,000
      // $0.007 per run for 30,000-100,000
      // $0.002 per run for 100,000+
      transformationCost = (30000 - 5000) * 0.01 + (100000 - 30000) * 0.007 + (inputs.modelRuns - 100000) * 0.002;
    }
  }

  // Add base connector costs (simplified)
  const connectorCost = inputs.connectors * 100; // Simplified: $100 per connector

  return marCost + transformationCost + connectorCost;
};

// Calculate Reactor costs based on flat fee model
export const calculateReactorCost = (inputs: CalculatorInputs): number => {
  // Simplified flat fee pricing model based on total records
  let reactorCost = 0;
  const recordsMillions = inputs.totalRecords / 1000000;
  
  if (recordsMillions <= 1) {
    reactorCost = 950; // $950 flat fee up to 1M records
  } else if (recordsMillions <= 5) {
    reactorCost = 1900; // $1,900 flat fee up to 5M records
  } else if (recordsMillions <= 10) {
    reactorCost = 3800; // $3,800 flat fee up to 10M records
  } else {
    reactorCost = 3800 + Math.ceil((recordsMillions - 10) / 5) * 1000; // $1,000 for each additional 5M records
  }
  
  // No additional costs for transformations or connectors in Reactor's model
  
  return reactorCost;
};

// Calculate projected costs over time with growth rate
export const calculateYearlyCosts = (
  inputs: CalculatorInputs,
  initialFivetranCost: number,
  initialReactorCost: number
): { fivetranCosts: number[], reactorCosts: number[] } => {
  const monthlyGrowthRate = Math.pow(1 + inputs.growthRate / 100, 1/12) - 1;
  const months = 12;
  
  let fivetranCosts: number[] = [];
  let reactorCosts: number[] = [];
  
  let currentFivetranCost = initialFivetranCost;
  let currentReactorCost = initialReactorCost;
  
  for (let i = 0; i < months; i++) {
    fivetranCosts.push(currentFivetranCost);
    reactorCosts.push(currentReactorCost);
    
    // Apply growth for next month
    currentFivetranCost = currentFivetranCost * (1 + monthlyGrowthRate);
    currentReactorCost = calculateReactorCost({
      ...inputs,
      totalRecords: inputs.totalRecords * Math.pow(1 + monthlyGrowthRate, i + 1),
      monthlyActiveRows: inputs.monthlyActiveRows * Math.pow(1 + monthlyGrowthRate, i + 1),
      modelRuns: inputs.modelRuns * Math.pow(1 + monthlyGrowthRate, i + 1),
    });
  }
  
  return { fivetranCosts, reactorCosts };
};

// Calculate full results
export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  const fivetranMonthlyCost = calculateFivetranCost(inputs);
  const reactorMonthlyCost = calculateReactorCost(inputs);
  const monthlySavings = Math.max(0, fivetranMonthlyCost - reactorMonthlyCost);
  
  // Calculate projected costs over 12 months
  const { fivetranCosts, reactorCosts } = calculateYearlyCosts(
    inputs,
    fivetranMonthlyCost,
    reactorMonthlyCost
  );
  
  // Calculate annual savings
  const annualSavings = fivetranCosts.reduce((sum, cost) => sum + cost, 0) - 
                        reactorCosts.reduce((sum, cost) => sum + cost, 0);
  
  return {
    fivetranMonthlyCost,
    reactorMonthlyCost,
    monthlySavings,
    annualSavings,
    yearlyFivetranCosts: fivetranCosts,
    yearlyReactorCosts: reactorCosts,
  };
};
