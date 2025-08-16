
import {
    collection,
    query,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    getDoc,
    where,
    writeBatch,
    deleteDoc,
    orderBy,
} from 'firebase/firestore';
import type { Student, Income, Expense } from './types';
import { db } from './firebase';

const studentsCollection = collection(db, 'students');
const incomesCollection = collection(db, 'incomes');
const expensesCollection = collection(db, 'expenses');

// Since we are using Firestore, all data fetching is async.
// We will change the data fetching model from synchronous to asynchronous.

export const getStudents = async (): Promise<Student[]> => {
    const snapshot = await getDocs(query(studentsCollection, orderBy("order")));
    const students: Student[] = [];
    snapshot.forEach(doc => {
        students.push({ id: doc.id, ...doc.data() } as Student);
    });
    return students;
};

export const getStudentById = async (id: string): Promise<Student | undefined> => {
    const docRef = doc(db, 'students', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Student;
    }
    return undefined;
};

export const addStudent = async (student: Omit<Student, 'id' | 'order'>): Promise<Student> => {
    const q = query(studentsCollection, orderBy("order", "desc"));
    const querySnapshot = await getDocs(q);
    const maxOrder = querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data().order : 0;

    const newStudentData = {
        ...student,
        order: maxOrder + 1,
        photoUrl: student.photoUrl || `https://placehold.co/100x100.png`,
    };
    const docRef = await addDoc(studentsCollection, newStudentData);
    return { id: docRef.id, ...newStudentData, order: newStudentData.order };
};

export const updateStudent = async (id: string, updatedData: Partial<Omit<Student, 'id'>>): Promise<Student | null> => {
    const docRef = doc(db, 'students', id);
    await updateDoc(docRef, updatedData);
    const updatedDoc = await getDoc(docRef);
    if (updatedDoc.exists()) {
        return { id: updatedDoc.id, ...updatedDoc.data() } as Student
    }
    return null;
};

export const deleteStudent = async (id: string): Promise<void> => {
    const docRef = doc(db, 'students', id);
    await deleteDoc(docRef);
}

export const getIncomes = async (): Promise<Income[]> => {
    const snapshot = await getDocs(query(incomesCollection, orderBy("date", "desc")));
    const incomes: Income[] = [];
    snapshot.forEach(doc => {
        incomes.push({ id: doc.id, ...doc.data() } as Income);
    });
    return incomes;
};

export const addIncome = async (income: Omit<Income, 'id'>): Promise<Income> => {
    const docRef = await addDoc(incomesCollection, income);
    return { id: docRef.id, ...income };
};

export const getExpenses = async (): Promise<Expense[]> => {
    const snapshot = await getDocs(query(expensesCollection, orderBy("date", "desc")));
    const expenses: Expense[] = [];
    snapshot.forEach(doc => {
        expenses.push({ id: doc.id, ...doc.data() } as Expense);
    });
    return expenses;
};

export const addExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
    const docRef = await addDoc(expensesCollection, expense);
    return { id: docRef.id, ...expense };
};
