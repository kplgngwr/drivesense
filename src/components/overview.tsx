'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';

const data = [
  { name: 'Rajesh Kumar', total: 80 },
  { name: 'Ramu Singh', total: 60 },
  { name: 'Amit Patel', total: 30 },
  { name: 'Vikram Yadav', total: 70 },
  { name: 'Suresh', total: 50 },
  { name: 'Rakesh', total: 90 }
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="horizontal">
        <XAxis
          type="category"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dataKey="name"
        />
        <YAxis
          type="number"
          dataKey="total"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar dataKey="total" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.total < 50 ? 'slate' : 'black'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
