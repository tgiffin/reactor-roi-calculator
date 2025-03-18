
import React from 'react';
import { formatCurrency } from '@/lib/formatter';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface BreakEvenChartProps {
  fivetranCosts: number[];
  reactorCosts: number[];
}

export const BreakEvenChart: React.FC<BreakEvenChartProps> = ({ fivetranCosts, reactorCosts }) => {
  // Prepare data for the chart
  const data = fivetranCosts.map((fivetranCost, index) => {
    return {
      month: index + 1,
      Fivetran: fivetranCost,
      Reactor: reactorCosts[index],
    };
  });

  // Calculate break-even month
  const breakEvenMonth = fivetranCosts.findIndex((fivetranCost, index) => 
    fivetranCosts.slice(0, index + 1).reduce((sum, cost) => sum + cost, 0) >
    reactorCosts.slice(0, index + 1).reduce((sum, cost) => sum + cost, 0)
  );

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis 
              dataKey="month" 
              label={{ 
                value: 'Month', 
                position: 'insideBottom', 
                offset: -10 
              }} 
            />
            <YAxis 
              tickFormatter={(value) => `${formatCurrency(value, 0)}`}
              label={{ 
                value: 'Cumulative Cost', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' } 
              }} 
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(value) => `Month ${value}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0' 
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Fivetran" 
              stroke="#7A49FF" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="Reactor" 
              stroke="#0B5FFF" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {breakEvenMonth > 0 && (
        <div className="text-center text-indigo-600 dark:text-indigo-400 font-medium">
          Reactor becomes more cost-effective in month {breakEvenMonth + 1}
        </div>
      )}
    </div>
  );
};
