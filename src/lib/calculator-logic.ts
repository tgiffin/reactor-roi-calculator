
import { CalculatorInputs, CalculatorResults, ReactorTier } from './calculator-types';

// Structure to hold Reactor tier information
interface ReactorTierInfo {
  maxRows: number;
  costPerMillion: number;
  monthlyCommitment: number;
}

// Reactor tier pricing information - simplified to flat rate only
const REACTOR_TIER_PRICING: Record<ReactorTier, ReactorTierInfo> = {
  'flatRate': { maxRows: 30000000, costPerMillion: 400, monthlyCommitment: 2000 }
};

// Calculate Reactor costs based on the flat rate pricing
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

// Calculate full results - simplified to use direct Fivetran cost input
export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  const fivetranMonthlyCost = inputs.fivetranMonthlyCost;
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
    monthlyRows: inputs.totalRecords
  };
};
