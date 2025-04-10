import { CalculatorInputs, CalculatorResults, FivetranTier, ReactorTier } from './calculator-types';

// Calculate Fivetran costs based on their tiered model and transformation pricing
export const calculateFivetranCost = (inputs: CalculatorInputs): number => {
  // Calculate MAR cost based on selected pricing tier
  let marCost = 0;
  
  // Apply different pricing based on the selected tier
  switch(inputs.fivetranTier) {
    case 'free':
      // Free tier: Always $0 regardless of MAR value (limited to 500k in UI)
      marCost = 0;
      break;
    
    case 'standard': {
      // Standard tier: $500 per million rows (rounded up to nearest million)
      const millionsRoundedUp = Math.ceil(inputs.monthlyActiveRows / 1000000);
      marCost = millionsRoundedUp * 500;
      break;
    }
    
    case 'enterprise': {
      // Enterprise tier: $667 per million rows (rounded up to nearest million)
      const millionsRoundedUp = Math.ceil(inputs.monthlyActiveRows / 1000000);
      marCost = millionsRoundedUp * 667;
      break;
    }
    
    case 'businessCritical': {
      // Business Critical tier: $1067 per million rows (rounded up to nearest million)
      const millionsRoundedUp = Math.ceil(inputs.monthlyActiveRows / 1000000);
      marCost = millionsRoundedUp * 1067;
      break;
    }
    
    default: {
      // Default to standard tier with correct rounding
      const millionsRoundedUp = Math.ceil(inputs.monthlyActiveRows / 1000000);
      marCost = millionsRoundedUp * 500;
    }
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

// Structure to hold Reactor tier information
interface ReactorTierInfo {
  maxRows: number;
  costPerMillion: number;
  monthlyCommitment: number;
}

// New Reactor tier pricing information
const REACTOR_TIER_PRICING: Record<ReactorTier, ReactorTierInfo> = {
  '5M': { maxRows: 5000000, costPerMillion: 500, monthlyCommitment: 2500 },
  '10M': { maxRows: 10000000, costPerMillion: 480, monthlyCommitment: 4800 },
  '15M': { maxRows: 15000000, costPerMillion: 460, monthlyCommitment: 6900 },
  '20M': { maxRows: 20000000, costPerMillion: 440, monthlyCommitment: 8800 },
  '25M': { maxRows: 25000000, costPerMillion: 420, monthlyCommitment: 10500 }
};

// Helper function to find the appropriate tier based on row count
export const findAppropriateReactorTier = (rowCount: number): ReactorTier => {
  if (rowCount <= 0) return '5M';
  if (rowCount <= 5000000) return '5M';
  if (rowCount <= 10000000) return '10M';
  if (rowCount <= 15000000) return '15M';
  if (rowCount <= 20000000) return '20M';
  return '25M';
};

// Calculate Reactor costs based on the new tiered commitment model with overages
export const calculateReactorCost = (
  inputs: CalculatorInputs
): { totalCost: number; committedCost: number; overageCost: number } => {
  // If total records is 0, return 0 cost
  if (inputs.totalRecords === 0) {
    return { 
      totalCost: 0, 
      committedCost: 0, 
      overageCost: 0 
    };
  }
  
  // Flat rate pricing: $400 per million with $2500 minimum
  const MINIMUM_MONTHLY_COST = 2500;
  const COST_PER_MILLION = 400;
  
  // Calculate cost based on actual usage at $400 per million
  const millionsRoundedUp = Math.ceil(inputs.totalRecords / 1000000);
  const calculatedCost = millionsRoundedUp * COST_PER_MILLION;
  
  // Apply minimum monthly cost of $2500
  let totalCost = Math.max(calculatedCost, MINIMUM_MONTHLY_COST);
  
  // For rows over 30M, return a signal for "Contact Sales"
  if (inputs.totalRecords > 30000000) {
    return { 
      totalCost: -1, 
      committedCost: MINIMUM_MONTHLY_COST, 
      overageCost: 0 
    };
  }
  
  // Calculate committed cost and overage cost
  const committedCost = MINIMUM_MONTHLY_COST;
  const overageCost = Math.max(0, totalCost - committedCost);
  
  return {
    totalCost,
    committedCost,
    overageCost
  };
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
    
    // Calculate new reactor cost with projected growth
    const projectedRecords = inputs.totalRecords * Math.pow(1 + monthlyGrowthRate, i + 1);
    const projectedReactorCost = calculateReactorCost({
      ...inputs,
      totalRecords: projectedRecords,
      monthlyActiveRows: inputs.monthlyActiveRows * Math.pow(1 + monthlyGrowthRate, i + 1),
      modelRuns: inputs.modelRuns * Math.pow(1 + monthlyGrowthRate, i + 1),
    });
    
    currentReactorCost = projectedReactorCost.totalCost;
  }
  
  return { fivetranCosts, reactorCosts };
};

// Calculate full results
export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  const fivetranMonthlyCost = calculateFivetranCost(inputs);
  const reactorCostDetails = calculateReactorCost(inputs);
  const reactorMonthlyCost = reactorCostDetails.totalCost;
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
    reactorCommittedCost: reactorCostDetails.committedCost,
    reactorOverageCost: reactorCostDetails.overageCost,
    monthlySavings,
    annualSavings,
    yearlyFivetranCosts: fivetranCosts,
    yearlyReactorCosts: reactorCosts,
  };
};
