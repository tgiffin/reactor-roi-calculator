
export type FivetranTier = 'free' | 'standard' | 'enterprise' | 'businessCritical';
export type ReactorTier = 'flatRate'; // Changed to a single tier with flat rate pricing

export interface CalculatorInputs {
  monthlyActiveRows: number;
  totalRecords: number;
  modelRuns: number;
  growthRate: number;
  fivetranTier: FivetranTier;
  connectors: number;
  reactorTier: ReactorTier; // Now just uses the single flat rate tier
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
