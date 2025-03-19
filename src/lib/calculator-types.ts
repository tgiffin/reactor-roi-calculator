
export interface CalculatorInputs {
  monthlyActiveRows: number;
  totalRecords: number;
  modelRuns: number;
  growthRate: number;
}

export interface CalculatorResults {
  fivetranMonthlyCost: number;
  reactorMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  yearlyFivetranCosts: number[];
  yearlyReactorCosts: number[];
}
