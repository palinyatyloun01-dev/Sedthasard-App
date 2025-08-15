'use client';
import type { ColumnDef } from '@tanstack/react-table';
import type { Expense } from '@/lib/types';
import { format } from 'date-fns';

export const columns: ColumnDef<Expense>[] = [
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
];
