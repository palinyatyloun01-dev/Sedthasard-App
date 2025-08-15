'use client';
import type { ColumnDef } from '@tanstack/react-table';
import type { Income } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { getStudentById } from '@/lib/data';
import { format } from 'date-fns';

export const columns: ColumnDef<Income>[] = [
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
        cell: ({ row }) => {
            const studentId = row.original.studentId;
            if (!studentId) return "ທົ່ວໄປ";
            const student = getStudentById(studentId);
            return student ? student.name : "ບໍ່ພົບຂໍ້ມູນ";
        },
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
    }
];
