import type { Student, Income, Expense } from './types';

let students: Student[] = [
    { id: 1, order: 1, name: 'ຮອ ກັນລະຍາ ວົງພັກດີ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 2, order: 2, name: 'ຮອ ສົມຫວັງ ປິງສະນີໃຈ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 3, order: 3, name: 'ຮທ ເຕັມ ຄຸນມີທອງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 4, order: 4, name: 'ຮອ ຈັນສະໝອນ ທຳມະຂັນຕິ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 5, order: 5, name: 'ຮອ ສັນທະພົງ ນໍ່ລາດ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 6, order: 6, name: 'ຮທ ນາງ ແກ້ວດວງໃຈ ສັນຍາລັກ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 7, order: 7, name: 'ຮອ ນາງ ກັນລະຍາ ອິນຍຸທາ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 8, order: 8, name: 'ຮທ ພຸດທະນູ ລືຊາ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 9, order: 9, name: 'ຮອ ນາງ ມະໄລວັນ ໄຊຍະວົງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 10, order: 10, name: 'ຮຕ ຕ໋ອງ ສີລິວັນ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 11, order: 11, name: 'ຮຕ ໄທນຸລັກ ປາຖະໜາ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 12, order: 12, name: 'ຮທ ບຸນສົມ ທຳມະວົງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 13, order: 13, name: 'ຮອ ສຸກຈັກກີ ສີດາວົງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 14, order: 14, name: 'ຮອ ບຸນໂຍງ ແສງອາເດດ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 15, order: 15, name: 'ຮຕ ບຸນຕິ ແກ້ວດວງສີ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 16, order: 16, name: 'ຮຕ ພຸດດອນ ອິນມະນີ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 17, order: 17, name: 'ຮຕ ແກ້ວສົມ ປານີຈິດ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 18, order: 18, name: 'ຮອ ທອງໄຫຼ ສີລິປັນຍາ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 19, order: 19, name: 'ຮທ ແສງອາລຸນ ວົງພະຈັນ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 20, order: 20, name: 'ຮທ ສຸກສະຫວັນ ພັນທະວົງສີ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 21, order: 21, name: 'ຮທ ເດດ ສີດາວັນ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 22, order: 22, name: 'ຮທ ທອງສີ ຈັນປະສົງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 23, order: 23, name: 'ຮອ ນາງ ໄຊສະໝອນ ອິນທະລັງສີ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 24, order: 24, name: 'ຮອ ບຸນສະໜອງ ໄຊຍະແສງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 25, order: 25, name: 'ຮທ ບຸນຕາ ແພງຄໍາຕັນ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 26, order: 26, name: 'ພັຕ ສົມບັດ ວິໄລວົງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 27, order: 27, name: 'ຮອ ເປ່ມ ໄຊຍະວົງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 28, order: 28, name: 'ຮອ ຄຳພູນ ພົມມະໄລລຸນ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 29, order: 29, name: 'ຮອ ວິໄລສັກ ບຸດຕະວົງ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 30, order: 30, name: 'ຮທ ຄໍາເຫຼັກ ພົມມະຈັນ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
    { id: 31, order: 31, name: 'ຮຕ ສຸກທະວີ ສີຫານາດ', class: '', studentId: '', dob: '', partyPosition: '', statePosition: '', revolutionDate: '', youthDate: '', reservePartyDate: '', fullPartyDate: '', origin: '', department: '', status: 'ໂສດ', phone: '', photoUrl: `https://placehold.co/100x100.png`, notes: '' },
];


let incomes: Income[] = [];

let expenses: Expense[] = [];

export const getStudents = (): Student[] => students;

export const getStudentById = (id: number): Student | undefined => students.find(s => s.id === id);

export const addStudent = (student: Omit<Student, 'id' | 'order'>): Student => {
    const newStudent: Student = {
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        order: students.length > 0 ? Math.max(...students.map(s => s.order)) + 1 : 1,
        ...student,
        photoUrl: student.photoUrl || `https://placehold.co/100x100.png`,
    };
    students.push(newStudent);
    return newStudent;
};

export const updateStudent = (id: number, updatedData: Partial<Omit<Student, 'id' | 'order'>>): Student | null => {
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
