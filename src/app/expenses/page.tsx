
'use client';
import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import type { Expense } from '@/lib/types';
import { getExpenses, addExpense as apiAddExpense, updateExpense as apiUpdateExpense, deleteExpense as apiDeleteExpense } from '@/lib/data';
import { DataTable } from '../students/data-table';
import { columns } from './columns';
import { ExpenseDialog } from './expense-dialog';
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

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const router = useRouter();

    const fetchExpenses = async () => {
        const expensesData = await getExpenses();
        setExpenses(expensesData);
    };

    useEffect(() => {
        fetchExpenses();
        setIsMounted(true);
    }, []);
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const handleAdd = () => {
        setSelectedExpense(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (expense: Expense) => {
        setSelectedExpense(expense);
        setIsDialogOpen(true);
    };

    const handleDeleteRequest = (expense: Expense) => {
        setSelectedExpense(expense);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedExpense) {
            await apiDeleteExpense(selectedExpense.id);
            await fetchExpenses();
        }
        setIsDeleteDialogOpen(false);
        setSelectedExpense(null);
    }

    const handleSaveExpense = async (expenseData: Omit<Expense, 'id'>, id?: string) => {
         if (id) {
            await apiUpdateExpense(id, expenseData);
        } else {
            await apiAddExpense(expenseData);
        }
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
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl md:text-2xl font-bold">ລາຍຈ່າຍ</h1>
                    </div>
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
                         <Button onClick={handleAdd} size="sm" className="h-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            ເພີ່ມ
                        </Button>
                    </div>
                </div>
                 <DataTable columns={columns({ onEdit: handleEdit, onDelete: handleDeleteRequest })} data={expenses} filterColumn='type' filterPlaceholder='ຄົ້ນຫາປະເພດລາຍຈ່າຍ...' />
            </div>
            <ExpenseDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveExpense}
                expense={selectedExpense}
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
