
export type ReactorTier = 'flatRate';

export interface CalculatorInputs {
  fivetranMonthlyCost: number;  // New direct input field for Fivetran cost
  totalRecords: number;         // Keep this for Reactor calculations
  reactorTier: ReactorTier;     // Keep the Reactor tier selection
}

export interface CalculatorResults {
  fivetranMonthlyCost: number;
  reactorMonthlyCost: number;
  reactorCommittedCost: number; // Base cost for selected tier
  reactorOverageCost: number;   // Additional cost for usage above tier
  monthlySavings: number;
  annualSavings: number;
  monthlyRows: number;          // Added this field to track the total monthly rows
}
