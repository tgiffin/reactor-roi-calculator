import { CalculatorInputs, CalculatorResults, FivetranTier, ReactorTier } from './calculator-types';

// Calculate Fivetran costs based on their tiered model and transformation pricing
export const calculateFivetranCost = (inputs: CalculatorInputs): number => {
  // Calculate MAR cost based on selected pricing tier
  let marCost = 0;
  
  // Apply different pricing based on the selected tier
  switch(inputs.fivetranTier) {
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

// Structure to hold Reactor tier information
interface ReactorTierInfo {
  maxRows: number;
  costPerMillion: number;
  monthlyCommitment: number;
}

// New Reactor tier pricing information - simplified to flat rate only
const REACTOR_TIER_PRICING: Record<ReactorTier, ReactorTierInfo> = {
  'flatRate': { maxRows: 30000000, costPerMillion: 400, monthlyCommitment: 2000 }
};

// Calculate Reactor costs based on the new flat rate pricing
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
  
  // Flat rate pricing: $400 per million with $2000 minimum
  const MINIMUM_MONTHLY_COST = 2000;
  const COST_PER_MILLION = 400;
  
  // Calculate cost based on actual usage at $400 per million
  const millionsRoundedUp = Math.ceil(inputs.totalRecords / 1000000);
  const calculatedCost = millionsRoundedUp * COST_PER_MILLION;
  
  // Apply minimum monthly cost of $2000
  let totalCost = Math.max(calculatedCost, MINIMUM_MONTHLY_COST);
  
  // For rows over 75M, return a signal for "Contact Sales"
  if (inputs.totalRecords > 75000000) {
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

// Calculate full results
export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  const fivetranMonthlyCost = calculateFivetranCost(inputs);
  const reactorCostDetails = calculateReactorCost(inputs);
  const reactorMonthlyCost = reactorCostDetails.totalCost;
  const monthlySavings = Math.max(0, fivetranMonthlyCost - reactorMonthlyCost);
  const annualSavings = monthlySavings * 12;
  
  return {
    fivetranMonthlyCost,
    reactorMonthlyCost,
    reactorCommittedCost: reactorCostDetails.committedCost,
    reactorOverageCost: reactorCostDetails.overageCost,
    monthlySavings,
    annualSavings,
    monthlyRows: inputs.totalRecords // Adding the missing monthlyRows property
  };
};
