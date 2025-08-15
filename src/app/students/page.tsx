'use client';
import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Student } from '@/lib/types';
import { getStudents, addStudent as apiAddStudent, updateStudent as apiUpdateStudent } from '@/lib/data';
import { DataTable } from './data-table';
import { columns } from './columns';
import { StudentDialog } from './student-dialog';

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    useEffect(() => {
        setStudents(getStudents());
        setIsMounted(true);
    }, []);

    const handleAddStudent = () => {
        setSelectedStudent(null);
        setIsDialogOpen(true);
    };

    const handleEditStudent = (student: Student) => {
        setSelectedStudent(student);
        setIsDialogOpen(true);
    };

    const handleSaveStudent = (studentData: Omit<Student, 'id' | 'order'>, id?: number) => {
        if (id) {
            apiUpdateStudent(id, studentData);
        } else {
            apiAddStudent(studentData);
        }
        setStudents(getStudents()); // Refresh data
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
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold">ຂໍ້ມູນນັກສຶກສາ ({students.length} ຄົນ)</h1>
                        <p className="text-muted-foreground">ລາຍຊື່ນັກສຶກສາທັງໝົດ</p>
                    </div>
                    <Button onClick={handleAddStudent}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        ເພີ່ມນັກສຶກສາ
                    </Button>
                </div>
                <Card className="border-destructive">
                    <CardContent className="p-4">
                        <DataTable columns={columns({ onEdit: handleEditStudent })} data={students} />
                    </CardContent>
                </Card>
            </div>
            <StudentDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveStudent}
                student={selectedStudent}
            />
        </AppLayout>
    );
}
