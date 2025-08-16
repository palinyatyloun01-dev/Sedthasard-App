
'use client';
import type { ColumnDef } from '@tanstack/react-table';
import type { Expense } from '@/lib/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface ColumnsProps {
    onEdit: (expense: Expense) => void;
    onDelete: (expense: Expense) => void;
}

export const columns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<Expense>[] => [
    {
        accessorKey: "date",
        header: "ວັນທີ",
        cell: ({ row }) => format(new Date(row.getValue("date")), 'dd/MM/yyyy'),
    },
    {
        accessorKey: "type",
        header: "ປະເພດລາຍຈ່າຍ",
    },
    {
        accessorKey: "description",
        header: "ລາຍລະອຽດ",
        cell: ({ row }) => row.original.description || '-',
    },
    {
        accessorKey: "amount",
        header: "ຈຳນວນເງິນ (LAK)",
        cell: ({ row }) => <div className="text-right font-medium text-destructive">{row.original.amount.toLocaleString()}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const expense = row.original;
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
                        <DropdownMenuItem onClick={() => onEdit(expense)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>ແກ້ໄຂ</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(expense)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>ລຶບ</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
