
'use client';
import { summarizeFinancialData } from '@/ai/flows/financial-summary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { Expense, Income } from '@/lib/types';
import { Bot } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FinancialSummaryProps {
    incomes: Income[];
    expenses: Expense[];
    timePeriod: 'day' | 'week' | 'month' | 'year';
}

export default function FinancialSummary({ incomes, expenses, timePeriod }: FinancialSummaryProps) {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const generateSummary = async () => {
            if (incomes.length === 0 && expenses.length === 0) {
                setSummary('ບໍ່ມີຂໍ້ມູນການເງິນໃນຊ່ວງເວລານີ້.');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const result = await summarizeFinancialData({
                    income: incomes.map(i => ({ amount: i.amount, time: i.date, source: i.source })),
                    expenses: expenses.map(e => ({ amount: e.amount, time: e.date, type: e.type })),
                    timePeriod,
                });
                setSummary(result.summary);
            } catch (error) {
                console.error("Error generating summary:", error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'ບໍ່ສາມາດສ້າງສະຫຼຸບໄດ້.'
                });
                setSummary('ເກີດຂໍ້ຜິດພາດໃນການສ້າງສະຫຼຸບ.');
            } finally {
                setIsLoading(false);
            }
        };

        generateSummary();
    }, [incomes, expenses, timePeriod, toast]);

    return (
        <Card className="border-2 border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot className="h-6 w-6" />
                    ສະຫຼຸບໂດຍ AI
                </CardTitle>
                <CardDescription>
                    ສະຫຼຸບພາບລວມການເງິນສຳລັບຊ່ວງເວລາທີ່ເລືອກ.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">{summary}</p>
                )}
            </CardContent>
        </Card>
    );
}
