
'use client';
import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Expense } from '@/lib/types';
import { getExpenses, addExpense as apiAddExpense } from '@/lib/data';
import { DataTable } from '../students/data-table';
import { columns } from './columns';
import { ExpenseDialog } from './expense-dialog';

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchExpenses = async () => {
        const expensesData = await getExpenses();
        setExpenses(expensesData);
    };

    useEffect(() => {
        fetchExpenses();
        setIsMounted(true);
    }, []);
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const handleSaveExpense = async (expenseData: Omit<Expense, 'id'>) => {
        await apiAddExpense(expenseData);
        await fetchExpenses();
        setIsDialogOpen(false);
    };

    if (!isMounted) {
        return (
            <AppLayout>
                <div className="flex h-full items-center justify-center">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                </div>
            </AppLayout>
        );
    }
    
    return (
        <AppLayout>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h1 className="text-xl md:text-2xl font-bold">ລາຍຈ່າຍ</h1>
                    <div className='flex items-center gap-2'>
                        <Card className="flex-1 text-right border-2">
                           <CardHeader className="p-2 pb-0">
                                <CardDescription>ລາຍຈ່າຍລວມ</CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                                <CardTitle className="text-lg md:text-xl text-destructive">
                                    {totalExpenses.toLocaleString()} LAK
                                </CardTitle>
                            </CardContent>
                        </Card>
                         <Button onClick={() => setIsDialogOpen(true)} size="sm" className="h-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            ເພີ່ມ
                        </Button>
                    </div>
                </div>
                 <DataTable columns={columns} data={expenses} filterColumn='type' filterPlaceholder='ຄົ້ນຫາປະເພດລາຍຈ່າຍ...' />
            </div>
            <ExpenseDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveExpense}
            />
        </AppLayout>
    );
}
