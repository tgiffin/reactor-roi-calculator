
import React from 'react';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatter';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface CostChartProps {
  fivetranCost: number;
  reactorCost: number;
}

export const CostChart: React.FC<CostChartProps> = ({ fivetranCost, reactorCost }) => {
  const data = [
    {
      name: 'Monthly Cost',
      Fivetran: fivetranCost,
      Reactor: reactorCost,
    },
  ];

  const savings = fivetranCost - reactorCost;
  const savingsPercentage = fivetranCost > 0 ? (savings / fivetranCost) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `${formatCurrency(value, 0)}`}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0' 
              }}
            />
            <Legend />
            <Bar 
              dataKey="Fivetran" 
              name="Fivetran" 
              fill="#FFCC00" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="Reactor" 
              name="Reactor" 
              fill="#2462AA" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {savings > 0 && (
        <div className="text-center bg-reactor-soundcommerce-yellow/20 dark:bg-reactor-soundcommerce-yellow/30 p-2 rounded-md font-semibold text-reactor-brand-black dark:text-white border border-reactor-soundcommerce-yellow shadow-md">
          Save {formatCurrency(savings)} per month ({savingsPercentage.toFixed(0)}%) with Reactor
        </div>
      )}
    </div>
  );
};
