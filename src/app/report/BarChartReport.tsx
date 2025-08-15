'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Income, Expense } from '@/lib/types';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';

interface BarChartReportProps {
  income: Income[];
  expense: Expense[];
}

export default function BarChartReport({ income, expense }: BarChartReportProps) {
    const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
    const totalExpense = expense.reduce((acc, item) => acc + item.amount, 0);

    const summaryData = [
        { name: 'ລາຍຮັບ', value: totalIncome, fill: '#22c55e' },
        { name: 'ລາຍຈ່າຍ', value: totalExpense, fill: '#ef4444' },
    ];

  return (
    <Card>
        <CardHeader>
          <CardTitle>ສະຫຼຸບລາຍຮັບ-ລາຍຈ່າຍ</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width={80} tickFormatter={(value) => `${value.toLocaleString()}`} />
                <Tooltip formatter={(value: number) => `${value.toLocaleString()} LAK`} />
                <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
