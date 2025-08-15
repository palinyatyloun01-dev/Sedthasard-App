'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Student } from '@/lib/types';
import { useEffect } from 'react';

const studentSchema = z.object({
  name: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ ແລະ ນາມສະກຸນ" }),
  class: z.string(),
  studentId: z.string().min(1, { message: "ກະລຸນາໃສ່ເລກລະຫັດບັດ" }),
  dob: z.string().min(1, { message: "ກະລຸນາໃສ່ວັນເດືອນປີເກີດ" }),
  partyPosition: z.string(),
  statePosition: z.string(),
  revolutionDate: z.string().min(1, "Required"),
  youthDate: z.string().min(1, "Required"),
  reservePartyDate: z.string().min(1, "Required"),
  fullPartyDate: z.string().min(1, "Required"),
  origin: z.string().min(1, "Required"),
  department: z.string().min(1, "Required"),
  status: z.enum(['ໂສດ', 'ມີຄອບຄົວ']),
  phone: z.string().min(1, "Required"),
  photoUrl: z.string().url().optional().or(z.literal('')),
  notes: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: Omit<Student, 'id' | 'order'>, id?: number) => void;
  student: Student | null;
}

export function StudentDialog({ isOpen, onOpenChange, onSave, student }: StudentDialogProps) {
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '',
      class: '',
      studentId: '',
      dob: '',
      partyPosition: '',
      statePosition: '',
      revolutionDate: '',
      youthDate: '',
      reservePartyDate: '',
      fullPartyDate: '',
      origin: '',
      department: '',
      status: 'ໂສດ',
      phone: '',
      photoUrl: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (student) {
      form.reset(student);
    } else {
      form.reset({
        name: '',
        class: '',
        studentId: '',
        dob: '',
        partyPosition: '',
        statePosition: '',
        revolutionDate: '',
        youthDate: '',
        reservePartyDate: '',
        fullPartyDate: '',
        origin: '',
        department: '',
        status: 'ໂສດ',
        phone: '',
        photoUrl: '',
        notes: '',
      });
    }
  }, [student, form, isOpen]);

  const onSubmit = (data: StudentFormData) => {
    onSave(data, student?.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{student ? 'ແກ້ໄຂຂໍ້ມູນນັກສຶກສາ' : 'ເພີ່ມນັກສຶກສາໃໝ່'}</DialogTitle>
          <DialogDescription>
            {student ? 'ແກ້ໄຂລາຍລະອຽດຂໍ້ມູນຂອງນັກສຶກສາ.' : 'ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[60vh] pr-6">
              <div className="space-y-4">
              {[
                { name: "name", label: "ຊື່ ແລະ ນາມສະກຸນ" },
                { name: "class", label: "ຊັ້ນ" },
                { name: "studentId", label: "ເລກລະຫັດບັດນັກສຶກສາ" },
                { name: "dob", label: "ວັນເດືອນປີເກີດ", type: "date" },
                { name: "partyPosition", label: "ຕຳແໜ່ງພັກ" },
                { name: "statePosition", label: "ຕຳແໜ່ງລັດ" },
                { name: "revolutionDate", label: "ວັນເດືອນປີເຂົ້າການປະຕິວັດ", type: "date" },
                { name: "youthDate", label: "ວັນເດືອນປີເຂົ້າຊາວໜຸ່ມ", type: "date" },
                { name: "reservePartyDate", label: "ວັນເດືອນປີເຂົ້າພັກສຳຮອງ", type: "date" },
                { name: "fullPartyDate", label: "ວັນເດືອນປີເຂົ້າພັກສົມບູນ", type: "date" },
                { name: "origin", label: "ຖິ່ນກຳເນີດ" },
                { name: "department", label: "ມາຈາກກົມກອງ" },
                { name: "phone", label: "ເບີໂທລະສັບ" },
                { name: "photoUrl", label: "URL ຮູບພາບ" },
                { name: "notes", label: "ໝາຍເຫດ" },
              ].map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof StudentFormData}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input type={field.type || 'text'} {...formField} value={formField.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
               <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ສະຖານະ</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="ເລືອກສະຖານະ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ໂສດ">ໂສດ</SelectItem>
                          <SelectItem value="ມີຄອບຄົວ">ມີຄອບຄົວ</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
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
