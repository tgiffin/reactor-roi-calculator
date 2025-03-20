
export type FivetranTier = 'free' | 'standard' | 'enterprise' | 'businessCritical';

export interface CalculatorInputs {
  monthlyActiveRows: number;
  totalRecords: number;
  modelRuns: number;
  growthRate: number;
  fivetranTier: FivetranTier;
}

export interface CalculatorResults {
  fivetranMonthlyCost: number;
  reactorMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  yearlyFivetranCosts: number[];
  yearlyReactorCosts: number[];
}
