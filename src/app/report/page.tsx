
'use client';
import { useEffect, useState } from 'react';
import {
  startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear,
} from 'date-fns';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getIncomes, getExpenses } from '@/lib/data';
import type { Income, Expense } from '@/lib/types';
import FinancialSummary from './FinancialSummary';
import BarChartReport from './BarChartReport';
import PieChartReport from './PieChartReport';


type TimePeriod = 'day' | 'week' | 'month' | 'year';

export default function ReportPage() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredIncomes, setFilteredIncomes] = useState<Income[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');

  useEffect(() => {
    setIncomes(getIncomes());
    setExpenses(getExpenses());
  }, []);

  useEffect(() => {
    const selectedDate = date || new Date();
    let start, end;
    switch (timePeriod) {
      case 'day':
        start = startOfDay(selectedDate);
        end = endOfDay(selectedDate);
        break;
      case 'week':
        start = startOfWeek(selectedDate);
        end = endOfWeek(selectedDate);
        break;
      case 'month':
        start = startOfMonth(selectedDate);
        end = endOfMonth(selectedDate);
        break;
      case 'year':
        start = startOfYear(selectedDate);
        end = endOfYear(selectedDate);
        break;
    }
    setFilteredIncomes(incomes.filter(i => new Date(i.date) >= start && new Date(i.date) <= end));
    setFilteredExpenses(expenses.filter(e => new Date(e.date) >= start && new Date(e.date) <= end));
  }, [date, timePeriod, incomes, expenses]);

  const totalIncome = filteredIncomes.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = filteredExpenses.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <AppLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">ລາຍງານສະຫຼຸບ</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className='border-2'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ລາຍຮັບລວມ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{totalIncome.toLocaleString()} LAK</div>
            </CardContent>
          </Card>
          <Card className='border-2'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ລາຍຈ່າຍລວມ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{totalExpense.toLocaleString()} LAK</div>
            </CardContent>
          </Card>
          <Card className='border-2'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ຍອດເຫຼືອ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {balance.toLocaleString()} LAK
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
             <FinancialSummary incomes={filteredIncomes} expenses={filteredExpenses} timePeriod={timePeriod} />
            <Card className="border-2 border-destructive">
                <CardHeader>
                    <CardTitle>ພາບລວມການເງິນ</CardTitle>
                    <CardDescription>ເລືອກຮູບແບບການສະແດງຜົນ</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="bar-chart">
                        <TabsList>
                            <TabsTrigger value="bar-chart">ລາຍງານແບບແທ່ງ</TabsTrigger>
                            <TabsTrigger value="pie-chart">ລາຍງານແບບວົງມົນ</TabsTrigger>
                        </TabsList>
                        <TabsContent value="bar-chart">
                           <BarChartReport income={filteredIncomes} expense={filteredExpenses} />
                        </TabsContent>
                        <TabsContent value="pie-chart">
                           <PieChartReport expense={filteredExpenses} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="border-2 border-destructive">
              <CardHeader>
                <CardTitle>ເລືອກຊ່ວງເວລາ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select value={timePeriod} onValueChange={(v) => setTimePeriod(v as TimePeriod)}>
                    <SelectTrigger>
                      <SelectValue placeholder="ເລືອກຊ່ວງເວລາ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">ມື້</SelectItem>
                      <SelectItem value="week">ອາທິດ</SelectItem>
                      <SelectItem value="month">ເດືອນ</SelectItem>
                      <SelectItem value="year">ປີ</SelectItem>
                    </SelectContent>
                  </Select>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-2"
                    initialFocus
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
