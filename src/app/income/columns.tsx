
'use client';
import type { ColumnDef } from '@tanstack/react-table';
import type { Income, Student } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { getStudentById } from '@/lib/data';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface ColumnsProps {
    onEdit: (income: Income) => void;
    onDelete: (income: Income) => void;
}

const StudentName = ({ studentId }: { studentId?: string }) => {
    const [studentName, setStudentName] = useState('ກຳລັງໂຫຼດ...');
    
    useEffect(() => {
        const fetchStudent = async () => {
            if (studentId) {
                const student = await getStudentById(studentId);
                setStudentName(student ? student.name : "ບໍ່ພົບຂໍ້ມູນ");
            } else {
                 setStudentName("ທົ່ວໄປ");
            }
        };
        fetchStudent();
    }, [studentId]);

    return <span>{studentName}</span>;
}


export const columns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<Income>[] => [
    {
        accessorKey: "date",
        header: "ວັນທີ",
        cell: ({ row }) => format(new Date(row.getValue("date")), 'dd/MM/yyyy'),
    },
    {
        accessorKey: "source",
        header: "ແຫຼ່ງທີ່ມາ",
    },
    {
        accessorKey: "description",
        header: "ລາຍລະອຽດ",
        cell: ({ row }) => row.original.description || '-',
    },
    {
        accessorKey: "amount",
        header: "ຈຳນວນເງິນ (LAK)",
        cell: ({ row }) => <div className="text-right font-medium text-green-400">{row.original.amount.toLocaleString()}</div>,
    },
    {
        accessorKey: 'studentId',
        header: 'ນັກສຶກສາ',
        cell: ({ row }) => <StudentName studentId={row.original.studentId} />,
    },
    {
        accessorKey: 'status',
        header: 'ສະຖານະການຈ່າຍ',
        cell: ({ row }) => {
            const status = row.original.status;
            if (!status) return null;
            const variant = status === 'ຈ່າຍແລ້ວ' ? 'secondary' : status === 'ຄ້າງຈ່າຍ' ? 'default' : 'destructive';
            return <Badge variant={variant}>{status}</Badge>;
        },
    },
    {
        accessorKey: 'paymentMethod',
        header: 'ວິທີຊຳລະ',
    },
     {
        id: "actions",
        cell: ({ row }) => {
            const income = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">ເປີດເມນູ</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>ການກະທຳ</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(income)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>ແກ້ໄຂ</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(income)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>ລຶບ</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
