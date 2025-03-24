
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
                offset: -10,
                fill: "#5B5B5B"
              }} 
              padding={{ left: 0, right: 0 }}
              tickMargin={10}
              tick={{ fill: "#5B5B5B" }}
            />
            <YAxis 
              tickFormatter={(value) => `${formatCurrency(value, 0)}`}
              label={{ 
                value: 'Cumulative Cost', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: "#5B5B5B" },
                offset: -5
              }} 
              tickMargin={10}
              width={80}
              tick={{ fill: "#5B5B5B" }}
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
                fontSize: '12px',
                color: "#5B5B5B"
              }}
              formatter={(value) => <span style={{ color: "#5B5B5B" }}>{value}</span>}
            />
            <Line 
              type="monotone" 
              dataKey="Fivetran" 
              stroke="#4D83C1" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#4D83C1", strokeWidth: 1 }} 
              activeDot={{ r: 6, fill: "#4D83C1" }} 
              name="Fivetran"
            />
            <Line 
              type="monotone" 
              dataKey="Reactor" 
              stroke="#FFCC00" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#FFCC00", strokeWidth: 1 }} 
              activeDot={{ r: 6, fill: "#FFCC00" }} 
              name="Reactor"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {breakEvenMonth > 0 && (
        <div className="text-center px-4 py-2 bg-[#BF372A]/15 border border-[#BF372A]/30 rounded-md text-reactor-brand-black font-medium shadow-sm">
          Reactor becomes more cost-effective in month {breakEvenMonth + 1}
        </div>
      )}
    </div>
  );
};
