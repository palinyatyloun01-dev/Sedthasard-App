
'use client';
import type { ColumnDef } from '@tanstack/react-table';
import type { Student } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ColumnsProps {
    onEdit: (student: Student) => void;
    onDelete: (student: Student) => void;
    onView: (student: Student) => void;
}

export const columns = ({ onEdit, onDelete, onView }: ColumnsProps): ColumnDef<Student>[] => [
    {
        accessorKey: "order",
        header: "ລ/ດ",
        cell: ({ row }) => <div className="text-center">{row.getValue("order")}</div>,
    },
    {
        accessorKey: "name",
        header: "ຊື່ ແລະ ນາມສະກຸນ",
        cell: ({ row }) => {
            const student = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={student.photoUrl} alt={student.name} data-ai-hint="student portrait" />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span 
                        className="font-medium cursor-pointer hover:underline"
                        onClick={() => onView(student)}
                    >
                        {student.name}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "phone",
        header: "ເບີໂທລະສັບ",
    },
    {
        accessorKey: "status",
        header: "ສະຖານະ",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const student = row.original;
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
                        <DropdownMenuItem onClick={() => onView(student)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>ເບິ່ງລາຍລະອຽດ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(student)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>ແກ້ໄຂ</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(student)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>ລຶບ</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
