'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

const expenseSchema = z.object({
  type: z.enum(['ຄ່າເອກະສານ', 'ຄ່ານ້ຳ', 'ຄ່າຊອງຂາວ', 'ຄ່າສອບເສັງຂຽນ', 'ຄ່າສອບເສັງປາກເປົ່າ', 'ອື່ນໆ']),
  amount: z.coerce.number().min(1, "ຈຳນວນເງິນຕ້ອງຫຼາຍກວ່າ 0"),
  date: z.string().min(1, "ກະລຸນາເລືອກວັນທີ"),
  description: z.string().optional(),
}).refine(data => data.type !== 'ອື່ນໆ' || (data.type === 'ອື່ນໆ' && data.description && data.description.length > 0), {
    message: "ກະລຸນາໃສ່ລາຍລະອຽດສຳລັບປະເພດ 'ອື່ນໆ'",
    path: ["description"],
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: Omit<ExpenseFormData, 'id'>) => void;
}

const expenseTypes = ['ຄ່າເອກະສານ', 'ຄ່ານ້ຳ', 'ຄ່າຊອງຂາວ', 'ຄ່າສອບເສັງຂຽນ', 'ຄ່າສອບເສັງປາກເປົ່າ', 'ອື່ນໆ'];

export function ExpenseDialog({ isOpen, onOpenChange, onSave }: ExpenseDialogProps) {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: { date: new Date().toISOString().split('T')[0], description: '' },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({ date: new Date().toISOString().split('T')[0], description: '' });
    }
  }, [isOpen, form]);

  const type = form.watch('type');

  const onSubmit = (data: ExpenseFormData) => {
    onSave(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ເພີ່ມລາຍຈ່າຍໃໝ່</DialogTitle>
          <DialogDescription>ກະລຸນາຕື່ມຂໍ້ມູນລາຍຈ່າຍໃຫ້ຄົບຖ້ວນ.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ປະເພດລາຍຈ່າຍ</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="ເລືອກປະເພດລາຍຈ່າຍ" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {expenseTypes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === 'ອື່ນໆ' && (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ລາຍລະອຽດ</FormLabel>
                    <FormControl><Textarea placeholder="ລາຍລະອຽດຂອງລາຍຈ່າຍ..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
