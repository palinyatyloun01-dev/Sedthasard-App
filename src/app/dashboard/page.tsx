
'use client';
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Users, TrendingUp, TrendingDown, BarChart, Search, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { IncomeDialog } from "../income/income-dialog";
import { ExpenseDialog } from "../expenses/expense-dialog";
import { addIncome, addExpense } from "@/lib/data";
import type { Income, Expense } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { translations } = useLanguage();
    const router = useRouter();
    const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
    const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const menuItems = [
        {
          title: translations.dashboard.studentsCard.title,
          description: translations.dashboard.studentsCard.description,
          icon: <Users className="h-6 w-6 text-primary" />,
          href: "/students"
        },
        {
          title: translations.dashboard.incomeCard.title,
          description: translations.dashboard.incomeCard.description,
          icon: <TrendingUp className="h-6 w-6 text-green-500" />,
          href: "/income"
        },
        {
          title: translations.dashboard.expensesCard.title,
          description: translations.dashboard.expensesCard.description,
          icon: <TrendingDown className="h-6 w-6 text-destructive" />,
          href: "/expenses"
        },
        {
          title: translations.dashboard.reportsCard.title,
          description: translations.dashboard.reportsCard.description,
          icon: <BarChart className="h-6 w-6 text-accent" />,
          href: "/report"
        }
    ];

    const handleSaveIncome = async (incomeData: Omit<Income, 'id'>) => {
        await addIncome(incomeData);
        setIsIncomeDialogOpen(false);
        router.refresh();
    };

    const handleSaveExpense = async (expenseData: Omit<Expense, 'id'>) => {
        await addExpense(expenseData);
        setIsExpenseDialogOpen(false);
        router.refresh();
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <AppLayout>
            <div className="flex flex-col space-y-4">
                <Card className="overflow-hidden border-2 border-destructive">
                    <CardContent className="p-4 text-center">
                        <h2 className="animate-glow text-lg md:text-xl font-bold tracking-tight">
                            {translations.dashboard.welcomeMessage}
                        </h2>
                    </CardContent>
                </Card>

                <div className="flex flex-col md:flex-row items-stretch gap-4">
                    <Card className="flex-1 border-2 border-accent">
                        <CardHeader className="p-4">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Search className="h-5 w-5" />
                                {translations.dashboard.searchCard.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <Input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder={translations.dashboard.searchCard.placeholder}
                                className="text-sm"
                            />
                        </CardContent>
                    </Card>
                    <div className="flex flex-col md:flex-col gap-2">
                         <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => setIsIncomeDialogOpen(true)}>
                            <PlusCircle />
                            {translations.dashboard.addIncomeButton}
                         </Button>
                         <Button size="sm" variant="destructive" onClick={() => setIsExpenseDialogOpen(true)}>
                            <PlusCircle />
                            {translations.dashboard.addExpenseButton}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                    {menuItems.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <Card className="h-full transform cursor-pointer border-2 border-transparent transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1">
                                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                    {item.icon}
                                </CardHeader>
                                <CardContent className="p-3">
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
             <IncomeDialog 
                isOpen={isIncomeDialogOpen}
                onOpenChange={setIsIncomeDialogOpen}
                onSave={handleSaveIncome}
            />
            <ExpenseDialog
                isOpen={isExpenseDialogOpen}
                onOpenChange={setIsExpenseDialogOpen}
                onSave={handleSaveExpense}
            />
        </AppLayout>
    );
}
