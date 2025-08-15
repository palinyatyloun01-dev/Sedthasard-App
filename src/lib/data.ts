import type { Student, Income, Expense } from './types';

let students: Student[] = [];

let incomes: Income[] = [];

let expenses: Expense[] = [];

export const getStudents = (): Student[] => students;

export const getStudentById = (id: number): Student | undefined => students.find(s => s.id === id);

export const addStudent = (student: Omit<Student, 'id' | 'order'>): Student => {
    const newStudent: Student = {
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        order: students.length > 0 ? Math.max(...students.map(s => s.order)) + 1 : 1,
        ...student
    };
    students.push(newStudent);
    return newStudent;
};

export const updateStudent = (id: number, updatedData: Partial<Omit<Student, 'id'>>): Student | null => {
    const studentIndex = students.findIndex(s => s.id === id);
    if (studentIndex > -1) {
        students[studentIndex] = { ...students[studentIndex], ...updatedData };
        return students[studentIndex];
    }
    return null;
};

export const getIncomes = (): Income[] => incomes;

export const addIncome = (income: Omit<Income, 'id'>): Income => {
    const newIncome: Income = {
        id: incomes.length > 0 ? Math.max(...incomes.map(i => i.id)) + 1 : 1,
        ...income
    };
    incomes.push(newIncome);
    return newIncome;
};

export const getExpenses = (): Expense[] => expenses;

export const addExpense = (expense: Omit<Expense, 'id'>): Expense => {
    const newExpense: Expense = {
        id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
        ...expense
    };
    expenses.push(newExpense);
    return newExpense;
};
