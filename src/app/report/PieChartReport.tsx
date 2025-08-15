'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Expense } from '@/lib/types';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';

interface PieChartReportProps {
  expense: Expense[];
}

const PIE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];

export default function PieChartReport({ expense }: PieChartReportProps) {
    const expenseByCategory = expense.reduce((acc, item) => {
        if (!acc[item.type]) {
            acc[item.type] = 0;
        }
        acc[item.type] += item.amount;
        return acc;
    }, {} as Record<string, number>);

    const expenseChartData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));

  return (
    <Card>
        <CardHeader>
          <CardTitle>ປະເພດລາຍຈ່າຍ</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                <Pie data={expenseChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                            {`${(percent * 100).toFixed(0)}%`}
                        </text>
                    );
                }}>
                    {expenseChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} LAK`} />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
