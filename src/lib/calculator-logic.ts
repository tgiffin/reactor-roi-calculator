
import { CalculatorInputs, CalculatorResults, FivetranTier } from './calculator-types';

// Calculate Fivetran costs based on their tiered model and transformation pricing
export const calculateFivetranCost = (inputs: CalculatorInputs): number => {
  // Calculate MAR cost based on selected pricing tier
  let marCost = 0;
  const marMillion = inputs.monthlyActiveRows / 1000000;
  
  // Apply different pricing based on the selected tier
  switch(inputs.fivetranTier) {
    case 'free':
      // Free tier: Always $0 regardless of MAR value (limited to 500k in UI)
      marCost = 0;
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
  if (inputs.fivetranTier === 'free') {
    // Free tier always has 0 transformation cost (limited to 5000 in UI)
    transformationCost = 0;
  } else if (inputs.modelRuns > 5000) {
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

  // Calculate connector costs (approx $100 per connector per month)
  const connectorCost = inputs.fivetranTier === 'free' ? 0 : inputs.connectors * 100;

  return marCost + transformationCost + connectorCost;
};

// Calculate Reactor costs based on the new tiered flat-band pricing structure
export const calculateReactorCost = (inputs: CalculatorInputs): number => {
  // If total records is 0, return 0 cost
  if (inputs.totalRecords === 0) {
    return 0;
  }
  
  // New flat-band pricing model based on total records
  let reactorCost = 0;
  
  // Core Tier - Always included for all customers
  reactorCost += 2500; // $2,500 flat fee for Core tier (0-5M records)
  
  // Fusion Tier - Applied in cumulative bands
  if (inputs.totalRecords > 5000000) {
    // Band 5M-10M
    reactorCost += 2400;
    
    if (inputs.totalRecords > 10000000) {
      // Band 10M-15M
      reactorCost += 2300;
      
      if (inputs.totalRecords > 15000000) {
        // Band 15M-20M
        reactorCost += 2200;
        
        if (inputs.totalRecords > 20000000) {
          // Band 20M-25M
          reactorCost += 2100;
        }
      }
    }
  }
  
  // For SuperNova tier (over 25M), we'll return -1 as a signal to display "Contact Sales"
  if (inputs.totalRecords > 25000000) {
    return -1;
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
