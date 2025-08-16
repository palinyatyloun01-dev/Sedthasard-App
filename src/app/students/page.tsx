
'use client';
import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import type { Student } from '@/lib/types';
import { getStudents, addStudent as apiAddStudent, updateStudent as apiUpdateStudent, deleteStudent as apiDeleteStudent } from '@/lib/data';
import { DataTable } from './data-table';
import { columns } from './columns';
import { StudentDialog } from './student-dialog';
import { StudentDetailDialog } from './student-detail-dialog';
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

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const router = useRouter();

    const fetchStudents = async () => {
        const studentData = await getStudents();
        setStudents(studentData);
    };

    useEffect(() => {
        fetchStudents();
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

    const handleViewStudent = (student: Student) => {
        setSelectedStudent(student);
        setIsDetailDialogOpen(true);
    };

    const handleDeleteRequest = (student: Student) => {
        setSelectedStudent(student);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedStudent) {
            await apiDeleteStudent(selectedStudent.id);
            await fetchStudents();
        }
        setIsDeleteDialogOpen(false);
        setSelectedStudent(null);
    }

    const handleSaveStudent = async (studentData: Omit<Student, 'id' | 'order'>, id?: string) => {
        if (id) {
            await apiUpdateStudent(id, studentData);
        } else {
            await apiAddStudent(studentData);
        }
        await fetchStudents(); // Refresh data
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
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="space-y-1">
                            <h1 className="text-xl md:text-2xl font-bold">ຂໍ້ມູນນັກສຶກສາ ({students.length} ຄົນ)</h1>
                            <p className="text-sm text-muted-foreground">ລາຍຊື່ນັກສຶກສາທັງໝົດ</p>
                        </div>
                    </div>
                    <Button onClick={handleAddStudent} size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        ເພີ່ມນັກສຶກສາ
                    </Button>
                </div>
                <Card className="border-2 border-primary">
                    <CardContent className="p-2 md:p-4">
                        <DataTable 
                            columns={columns({ 
                                onEdit: handleEditStudent, 
                                onDelete: handleDeleteRequest,
                                onView: handleViewStudent
                            })} 
                            data={students} 
                            filterColumn='name' 
                            filterPlaceholder='ຄົ້ນຫາຊື່ນັກສຶກສາ...' 
                        />
                    </CardContent>
                </Card>
            </div>
            <StudentDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveStudent}
                student={selectedStudent}
            />
            {selectedStudent && (
                <StudentDetailDialog
                    isOpen={isDetailDialogOpen}
                    onOpenChange={setIsDetailDialogOpen}
                    student={selectedStudent}
                />
            )}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>ທ່ານແນ່ໃຈບໍ່?</AlertDialogTitle>
                    <AlertDialogDescription>
                        ການກະທຳນີ້ບໍ່ສາມາດຍົກເລີກໄດ້. ນີ້ຈະເປັນການລຶບຂໍ້ມູນຂອງນັກສຶກສາຄົນນີ້ຖາວອນ.
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
