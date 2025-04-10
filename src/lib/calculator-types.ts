
export type FivetranTier = 'free' | 'standard' | 'enterprise' | 'businessCritical';
export type ReactorTier = '5M' | '10M' | '15M' | '20M' | '25M';

export interface CalculatorInputs {
  monthlyActiveRows: number;
  totalRecords: number;
  modelRuns: number;
  growthRate: number;
  fivetranTier: FivetranTier;
  connectors: number;
  reactorTier: ReactorTier; // Added reactor tier selection
}

export interface CalculatorResults {
  fivetranMonthlyCost: number;
  reactorMonthlyCost: number;
  reactorCommittedCost: number; // Base cost for selected tier
  reactorOverageCost: number;   // Additional cost for usage above tier
  monthlySavings: number;
  annualSavings: number;
  yearlyFivetranCosts: number[];
  yearlyReactorCosts: number[];
}
