
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

    useEffect(() => {
        setExpenses(getExpenses());
        setIsMounted(true);
    }, []);
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const handleSaveExpense = (expenseData: Omit<Expense, 'id'>) => {
        apiAddExpense(expenseData);
        setExpenses(getExpenses());
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
                <div className="flex items-start justify-between gap-4">
                     <div className="flex-1">
                        <DataTable columns={columns} data={expenses} />
                    </div>
                    <div className='flex flex-col items-end gap-2'>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            ເພີ່ມລາຍຈ່າຍ
                        </Button>
                        <Card className="min-w-48 text-right border-2">
                           <CardHeader className="p-2 pb-0">
                                <CardDescription>ລາຍຈ່າຍລວມ</CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                                <CardTitle className="text-2xl text-destructive">
                                    {totalExpenses.toLocaleString()} LAK
                                </CardTitle>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <ExpenseDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveExpense}
            />
        </AppLayout>
    );
}
