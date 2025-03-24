
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
            <XAxis dataKey="name" tick={{ fill: "#5B5B5B" }} />
            <YAxis 
              tickFormatter={(value) => `${formatCurrency(value, 0)}`}
              tick={{ fill: "#5B5B5B" }}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0' 
              }}
            />
            <Legend 
              wrapperStyle={{ color: "#5B5B5B" }}  
              formatter={(value) => <span style={{ color: "#5B5B5B" }}>{value}</span>}
            />
            <Bar 
              dataKey="Fivetran" 
              name="Fivetran" 
              fill="#4D83C1" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="Reactor" 
              name="Reactor" 
              fill="#FFCC00" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {savings > 0 && (
        <div className="text-center bg-[#FFCC00] dark:bg-[#FFCC00] p-2 rounded-md font-semibold text-reactor-brand-black dark:text-reactor-brand-black border border-[#FFCC00] shadow-md">
          Save {formatCurrency(savings)} per month ({savingsPercentage.toFixed(0)}%) with Reactor
        </div>
      )}
    </div>
  );
};
