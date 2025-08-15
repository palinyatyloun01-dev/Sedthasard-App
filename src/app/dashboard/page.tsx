
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
import { addIncome, addExpense, getIncomes, getExpenses } from "@/lib/data";
import type { Income, Expense } from "@/lib/types";

export default function DashboardPage() {
    const { translations } = useLanguage();
    const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
    const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

    // These states are needed to refresh data if we add it from the dashboard.
    const [, setIncomes] = useState<Income[]>(getIncomes());
    const [, setExpenses] = useState<Expense[]>(getExpenses());

    const menuItems = [
        {
          title: translations.dashboard.studentsCard.title,
          description: translations.dashboard.studentsCard.description,
          icon: <Users className="h-8 w-8 text-primary" />,
          href: "/students"
        },
        {
          title: translations.dashboard.incomeCard.title,
          description: translations.dashboard.incomeCard.description,
          icon: <TrendingUp className="h-8 w-8 text-green-500" />,
          href: "/income"
        },
        {
          title: translations.dashboard.expensesCard.title,
          description: translations.dashboard.expensesCard.description,
          icon: <TrendingDown className="h-8 w-8 text-destructive" />,
          href: "/expenses"
        },
        {
          title: translations.dashboard.reportsCard.title,
          description: translations.dashboard.reportsCard.description,
          icon: <BarChart className="h-8 w-8 text-accent" />,
          href: "/report"
        }
    ];

    const handleSaveIncome = (incomeData: Omit<Income, 'id'>) => {
        addIncome(incomeData);
        setIncomes(getIncomes());
        setIsIncomeDialogOpen(false);
    };

    const handleSaveExpense = (expenseData: Omit<Expense, 'id'>) => {
        addExpense(expenseData);
        setExpenses(getExpenses());
        setIsExpenseDialogOpen(false);
    };

    return (
        <AppLayout>
            <div className="flex flex-col space-y-6">
                <Card className="overflow-hidden border-2 border-destructive">
                    <CardContent className="p-4 text-center">
                        <h2 className="animate-glow text-2xl font-bold tracking-tight">
                            {translations.dashboard.welcomeMessage}
                        </h2>
                    </CardContent>
                </Card>

                <div className="flex items-start gap-4">
                    <Card className="flex-1 border-2 border-accent">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-6 w-6" />
                                {translations.dashboard.searchCard.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input 
                                placeholder={translations.dashboard.searchCard.placeholder}
                                className="text-base"
                            />
                        </CardContent>
                    </Card>
                    <div className="flex flex-col gap-2">
                         <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsIncomeDialogOpen(true)}>
                            <PlusCircle />
                            {translations.dashboard.addIncomeButton}
                         </Button>
                         <Button variant="destructive" onClick={() => setIsExpenseDialogOpen(true)}>
                            <PlusCircle />
                            {translations.dashboard.addExpenseButton}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {menuItems.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <Card className="h-full transform cursor-pointer border-2 border-transparent transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                                    {item.icon}
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
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
