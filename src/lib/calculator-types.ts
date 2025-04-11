
export type FivetranTier = 'standard' | 'enterprise' | 'businessCritical';
export type ReactorTier = 'flatRate';

export interface CalculatorInputs {
  monthlyActiveRows: number;
  totalRecords: number;
  modelRuns: number;
  growthRate: number;
  fivetranTier: FivetranTier;
  reactorTier: ReactorTier;
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
