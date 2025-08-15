
'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Income } from '@/lib/types';
import { getIncomes, addIncome as apiAddIncome } from '@/lib/data';
import { DataTable } from '../students/data-table'; // Reusing the data-table component
import { columns } from './columns';
import { IncomeDialog } from './income-dialog';

export default function IncomePage() {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        setIncomes(getIncomes());
        setIsMounted(true);
    }, []);
    
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    const handleSaveIncome = (incomeData: Omit<Income, 'id'>) => {
        apiAddIncome(incomeData);
        setIncomes(getIncomes());
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
                        <DataTable columns={columns} data={incomes} />
                    </div>
                    <div className='flex flex-col items-end gap-2'>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            ເພີ່ມລາຍຮັບ
                        </Button>
                        <Card className="min-w-48 text-right border-2">
                           <CardHeader className="p-2 pb-0">
                                <CardDescription>ລາຍຮັບລວມ</CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                                <CardTitle className="text-2xl text-green-400">
                                    {totalIncome.toLocaleString()} LAK
                                </CardTitle>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <IncomeDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveIncome}
            />
        </AppLayout>
    );
}
