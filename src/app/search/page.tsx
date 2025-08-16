
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { getStudents, getIncomes, getExpenses } from '@/lib/data';
import type { Student, Income, Expense } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DataTable } from '../students/data-table';
import { columns as studentColumns } from '../students/columns';
import { columns as incomeColumns } from '../income/columns';
import { columns as expenseColumns } from '../expenses/columns';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { translations } = useLanguage();
    const query = searchParams.get('q') || '';

    const [students, setStudents] = useState<Student[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!query) {
                setLoading(false);
                return;
            };

            setLoading(true);

            const [allStudents, allIncomes, allExpenses] = await Promise.all([
                getStudents(),
                getIncomes(),
                getExpenses(),
            ]);

            const lowerCaseQuery = query.toLowerCase();

            const filteredStudents = allStudents.filter(s =>
                s.name.toLowerCase().includes(lowerCaseQuery) ||
                s.phone.toLowerCase().includes(lowerCaseQuery) ||
                s.studentId.toLowerCase().includes(lowerCaseQuery)
            );

            const filteredIncomes = allIncomes.filter(i =>
                i.source.toLowerCase().includes(lowerCaseQuery) ||
                (i.description && i.description.toLowerCase().includes(lowerCaseQuery))
            );

            const filteredExpenses = allExpenses.filter(e =>
                e.type.toLowerCase().includes(lowerCaseQuery) ||
                (e.description && e.description.toLowerCase().includes(lowerCaseQuery))
            );

            setStudents(filteredStudents);
            setIncomes(filteredIncomes);
            setExpenses(filteredExpenses);
            setLoading(false);
        };

        fetchData();
    }, [query]);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
        );
    }
    
    const totalResults = students.length + incomes.length + expenses.length;

    return (
        <AppLayout>
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-xl md:text-2xl font-bold">{translations.search.title}</h1>
                        <p className="text-sm text-muted-foreground">
                            {totalResults > 0 
                                ? translations.search.resultsFound.replace('{count}', totalResults.toString()).replace('{query}', query)
                                : translations.search.noResults.replace('{query}', query)
                            }
                        </p>
                    </div>
                </div>

                {students.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{translations.mainNav.students} ({students.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={studentColumns({ onEdit: () => {}, onDelete: () => {}, onView: (student) => router.push(`/students`) })} data={students} filterColumn="name" filterPlaceholder="ຄົ້ນຫາຊື່ນັກສຶກສາ..." />
                        </CardContent>
                    </Card>
                )}

                {incomes.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{translations.mainNav.income} ({incomes.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={incomeColumns} data={incomes} filterColumn="source" filterPlaceholder="ຄົ້ນຫາແຫຼ່ງທີ່ມາ..." />
                        </CardContent>
                    </Card>
                )}

                {expenses.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{translations.mainNav.expenses} ({expenses.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={expenseColumns} data={expenses} filterColumn="type" filterPlaceholder="ຄົ້ນຫາປະເພດລາຍຈ່າຍ..." />
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
