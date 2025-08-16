
export interface Student {
    id: string;
    order: number;
    class: string;
    name: string;
    studentId: string;
    dob: string;
    partyPosition: string;
    statePosition: string;
    revolutionDate: string;
    youthDate: string;
    reservePartyDate: string;
    fullPartyDate: string;
    origin: string;
    department: string;
    status: 'ໂສດ' | 'ມີຄອບຄົວ';
    phone: string;
    photoUrl?: string;
    notes?: string;
}
  
export interface Income {
    id: string;
    studentId?: string; // Now a string to match Firestore document ID
    source: 'ເກັບເງິນຄັງປະຈຳເດືອນ' | 'ຂະບວນການກິດຈະກຳ' | string;
    amount: number;
    date: string; // ISO String
    paymentMethod: 'ເງິນສົດ' | 'ໂອນຜ່ານທະນາຄານ';
    status?: 'ຈ່າຍແລ້ວ' | 'ຍັງບໍ່ຈ່າຍ' | 'ຄ້າງຈ່າຍ'; // For student-specific income
    description?: string;
}

export interface Expense {
    id: string;
    type: 'ຄ່າເອກະສານ' | 'ຄ່ານ້ຳ' | 'ຄ່າຊອງຂາວ' | 'ຄ່າສອບເສັງຂຽນ' | 'ຄ່າສອບເສັງປາກເປົ່າ' | 'ອື່ນໆ';
    description?: string;
    amount: number;
    date: string; // ISO String
}
