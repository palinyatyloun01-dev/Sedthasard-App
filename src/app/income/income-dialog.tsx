'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStudents } from '@/lib/data';
import { useEffect, useState } from 'react';
import type { Student } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';

const incomeSchema = z.object({
  source: z.string().min(1, "ກະລຸນາເລືອກແຫຼ່ງທີ່ມາ"),
  amount: z.coerce.number().min(1, "ຈຳນວນເງິນຕ້ອງຫຼາຍກວ່າ 0"),
  date: z.string().min(1, "ກະລຸນາເລືອກວັນທີ"),
  paymentMethod: z.enum(['ເງິນສົດ', 'ໂອນຜ່ານທະນາຄານ']),
  studentId: z.coerce.number().optional(),
  status: z.enum(['ຈ່າຍແລ້ວ', 'ຍັງບໍ່ຈ່າຍ', 'ຄ້າງຈ່າຍ']).optional(),
  description: z.string().optional(),
});

type IncomeFormData = z.infer<typeof incomeSchema>;

interface IncomeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: Omit<IncomeFormData, 'id'>) => void;
}

const incomeSources = ['ເກັບເງິນຄັງປະຈຳເດືອນ', 'ຂະບວນການກິດຈະກຳ'];

export function IncomeDialog({ isOpen, onOpenChange, onSave }: IncomeDialogProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const form = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: { date: new Date().toISOString().split('T')[0], description: '' },
  });

  useEffect(() => {
    // We get the students every time the dialog opens to ensure fresh data.
    if (isOpen) {
        setStudents(getStudents());
        form.reset({ 
            date: new Date().toISOString().split('T')[0], 
            description: '',
            source: undefined,
            amount: 0,
            paymentMethod: undefined,
            studentId: undefined,
            status: undefined
        });
    }
  }, [isOpen, form]);

  const source = form.watch('source');

  const onSubmit = (data: IncomeFormData) => {
    onSave(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ເພີ່ມລາຍຮັບໃໝ່</DialogTitle>
          <DialogDescription>ກະລຸນາຕື່ມຂໍ້ມູນລາຍຮັບໃຫ້ຄົບຖ້ວນ.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ແຫຼ່ງທີ່ມາ</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="ເລືອກແຫຼ່ງທີ່ມາຂອງລາຍຮັບ" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incomeSources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             {source === 'ເກັບເງິນຄັງປະຈຳເດືອນ' && (
               <>
                <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>ນັກສຶກສາ</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} >
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="ເລືອກນັກສຶກສາ" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {students.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>ສະຖານະການຈ່າຍ</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="ເລືອກສະຖານະ" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="ຈ່າຍແລ້ວ">ຈ່າຍແລ້ວ</SelectItem>
                                <SelectItem value="ຍັງບໍ່ຈ່າຍ">ຍັງບໍ່ຈ່າຍ</SelectItem>
                                <SelectItem value="ຄ້າງຈ່າຍ">ຄ້າງຈ່າຍ</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
               </> 
             )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ຈຳນວນເງິນ (LAK)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ວັນທີ, ເດືອນ, ປີ</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ວິທີຊຳລະ</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger><SelectValue placeholder="ເລືອກວິທີຊຳລະ" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="ເງິນສົດ">ເງິນສົດ</SelectItem>
                        <SelectItem value="ໂອນຜ່ານທະນາຄານ">ໂອນຜ່ານທະນາຄານ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ລາຍລະອຽດ</FormLabel>
                  <FormControl><Textarea placeholder="ລາຍລະອຽດຂອງລາຍຮັບ..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>ຍົກເລີກ</Button>
              <Button type="submit">ບັນທຶກ</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
