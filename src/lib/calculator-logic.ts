
import { CalculatorInputs, CalculatorResults, FivetranTier } from './calculator-types';

// Calculate Fivetran costs based on their tiered model and transformation pricing
export const calculateFivetranCost = (inputs: CalculatorInputs): number => {
  // Calculate MAR cost based on selected pricing tier
  let marCost = 0;
  const marMillion = inputs.monthlyActiveRows / 1000000;
  
  // Apply different pricing based on the selected tier
  switch(inputs.fivetranTier) {
    case 'free':
      // Free tier: 500k MARs/month
      if (inputs.monthlyActiveRows <= 500000) {
        marCost = 0;
      } else {
        // Exceeding free tier, defaulting to standard pricing
        marCost = (marMillion - 0.5) * 500;
      }
      break;
    
    case 'standard':
      // Standard tier: $500 per million rows
      marCost = marMillion * 500;
      break;
    
    case 'enterprise':
      // Enterprise tier: $667 per million rows
      marCost = marMillion * 667;
      break;
    
    case 'businessCritical':
      // Business Critical tier: $1067 per million rows
      marCost = marMillion * 1067;
      break;
    
    default:
      // Default to standard tier
      marCost = marMillion * 500;
  }

  // Calculate transformation cost (MMR pricing)
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
