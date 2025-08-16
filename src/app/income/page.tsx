
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

    const fetchIncomes = async () => {
        const incomeData = await getIncomes();
        setIncomes(incomeData);
    };

    useEffect(() => {
        fetchIncomes();
        setIsMounted(true);
    }, []);
    
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    const handleSaveIncome = async (incomeData: Omit<Income, 'id'>) => {
        await apiAddIncome(incomeData);
        await fetchIncomes();
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
                    <h1 className="text-xl md:text-2xl font-bold">ລາຍຮັບ</h1>
                    <div className='flex items-center gap-2'>
                        <Card className="flex-1 text-right border-2">
                           <CardHeader className="p-2 pb-0">
                                <CardDescription>ລາຍຮັບລວມ</CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                                <CardTitle className="text-lg md:text-xl text-green-400">
                                    {totalIncome.toLocaleString()} LAK
                                </CardTitle>
                            </CardContent>
                        </Card>
                         <Button onClick={() => setIsDialogOpen(true)} size="sm" className="h-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            ເພີ່ມ
                        </Button>
                    </div>
                </div>
                <DataTable columns={columns} data={incomes} filterColumn='source' filterPlaceholder='ຄົ້ນຫາແຫຼ່ງທີ່ມາ...' />
            </div>
            <IncomeDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveIncome}
            />
        </AppLayout>
    );
}
