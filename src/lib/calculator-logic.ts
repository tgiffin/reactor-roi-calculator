
import { CalculatorInputs, CalculatorResults } from './calculator-types';

// Calculate Fivetran costs based on their MAR model and transformation pricing
export const calculateFivetranCost = (inputs: CalculatorInputs): number => {
  // Calculate MAR cost based on pricing tiers
  let marCost = 0;
  const marMillion = inputs.monthlyActiveRows / 1000000;
  
  // Recalculate the tier costs properly with fixed values to ensure accuracy
  if (marMillion <= 5) {
    // Tier 1: $550 per million MAR up to 5M
    marCost = marMillion * 550;
  } else if (marMillion <= 15) {
    // Tier 1: First 5M at $550/M = $2,750
    // Tier 2: Remaining at $450/M
    marCost = 2750 + ((marMillion - 5) * 450);
  } else if (marMillion <= 20) {
    // Tier 1: First 5M at $550/M = $2,750
    // Tier 2: Next 10M at $450/M = $4,500
    // Tier 3: Remaining at $350/M
    marCost = 2750 + 4500 + ((marMillion - 15) * 350);
  } else if (marMillion <= 30) {
    // Tier 1: First 5M at $550/M = $2,750
    // Tier 2: Next 10M at $450/M = $4,500
    // Tier 3: Next 5M at $350/M = $1,750
    // Tier 4: Remaining at $325/M
    marCost = 2750 + 4500 + 1750 + ((marMillion - 20) * 325);
  } else {
    // For volumes over 30M
    // Tier 1: First 5M at $550/M = $2,750
    // Tier 2: Next 10M at $450/M = $4,500
    // Tier 3: Next 5M at $350/M = $1,750
    // Tier 4: Next 10M at $325/M = $3,250
    // Beyond 30M: $325/M
    marCost = 2750 + 4500 + 1750 + 3250 + ((marMillion - 30) * 325);
  }

  // Calculate transformation cost
  let transformationCost = 0;
  if (inputs.modelRuns > 5000) {
    if (inputs.modelRuns <= 30000) {
      // $0.01 per run for 5,000-30,000
      transformationCost = (inputs.modelRuns - 5000) * 0.01;
    } else if (inputs.modelRuns <= 100000) {
      // First 25,000 runs after free tier at $0.01 each
      // Runs between 30,000-100,000 at $0.007 each
      transformationCost = (25000 * 0.01) + ((inputs.modelRuns - 30000) * 0.007);
    } else {
      // First 25,000 runs after free tier at $0.01 each
      // Next 70,000 runs at $0.007 each
      // Remaining runs at $0.002 each
      transformationCost = (25000 * 0.01) + (70000 * 0.007) + ((inputs.modelRuns - 100000) * 0.002);
    }
  }

  return marCost + transformationCost;
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
