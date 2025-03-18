
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
      <div className="h-72"> {/* Increased height for better spacing */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis 
              dataKey="month" 
              label={{ 
                value: 'Month', 
                position: 'insideBottomRight', 
                offset: -10 
              }} 
              padding={{ left: 0, right: 0 }}
              tickMargin={10}
            />
            <YAxis 
              tickFormatter={(value) => `${formatCurrency(value, 0)}`}
              label={{ 
                value: 'Cumulative Cost', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' },
                offset: -5
              }} 
              tickMargin={10}
              width={80}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(value) => `Month ${value}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                padding: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{
                paddingTop: '10px',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="Fivetran" 
              stroke="#7A49FF" 
              strokeWidth={2} 
              dot={{ r: 3 }} 
              activeDot={{ r: 5 }} 
              name="Fivetran"
            />
            <Line 
              type="monotone" 
              dataKey="Reactor" 
              stroke="#0B5FFF" 
              strokeWidth={2} 
              dot={{ r: 3 }} 
              activeDot={{ r: 5 }} 
              name="Reactor"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {breakEvenMonth > 0 && (
        <div className="text-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-md text-indigo-600 dark:text-indigo-400 font-medium">
          Reactor becomes more cost-effective in month {breakEvenMonth + 1}
        </div>
      )}
    </div>
  );
};
