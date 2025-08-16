
'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import type { Income } from '@/lib/types';
import { getIncomes, addIncome as apiAddIncome, updateIncome as apiUpdateIncome, deleteIncome as apiDeleteIncome } from '@/lib/data';
import { DataTable } from '../students/data-table'; // Reusing the data-table component
import { columns } from './columns';
import { IncomeDialog } from './income-dialog';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function IncomePage() {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
    const router = useRouter();

    const fetchIncomes = async () => {
        const incomeData = await getIncomes();
        setIncomes(incomeData);
    };

    useEffect(() => {
        fetchIncomes();
        setIsMounted(true);
    }, []);
    
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    const handleAdd = () => {
        setSelectedIncome(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (income: Income) => {
        setSelectedIncome(income);
        setIsDialogOpen(true);
    };

    const handleDeleteRequest = (income: Income) => {
        setSelectedIncome(income);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedIncome) {
            await apiDeleteIncome(selectedIncome.id);
            await fetchIncomes();
        }
        setIsDeleteDialogOpen(false);
        setSelectedIncome(null);
    }

    const handleSaveIncome = async (incomeData: Omit<Income, 'id'>, id?: string) => {
        if (id) {
            await apiUpdateIncome(id, incomeData);
        } else {
            await apiAddIncome(incomeData);
        }
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
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl md:text-2xl font-bold">ລາຍຮັບ</h1>
                    </div>
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
                         <Button onClick={handleAdd} size="sm" className="h-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            ເພີ່ມ
                        </Button>
                    </div>
                </div>
                <DataTable columns={columns({ onEdit: handleEdit, onDelete: handleDeleteRequest })} data={incomes} filterColumn='source' filterPlaceholder='ຄົ້ນຫາແຫຼ່ງທີ່ມາ...' />
            </div>
            <IncomeDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveIncome}
                income={selectedIncome}
            />
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>ທ່ານແນ່ໃຈບໍ່?</AlertDialogTitle>
                    <AlertDialogDescription>
                        ການກະທຳນີ້ບໍ່ສາມາດຍົກເລີກໄດ້. ນີ້ຈະເປັນການລຶບຂໍ້ມູນລາຍການນີ້ຖາວອນ.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>ຍົກເລີກ</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">ລຶບ</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
