
'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Student } from '@/lib/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface StudentDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  student: Student | null;
}

const DetailItem = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className="text-xs font-semibold text-muted-foreground">{label}</p>
    <p className="text-sm text-foreground">{value || '-'}</p>
  </div>
);

const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
        return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
        return dateString;
    }
}

export function StudentDetailDialog({ isOpen, onOpenChange, student }: StudentDetailDialogProps) {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ລາຍລະອຽດຂໍ້ມູນນັກສຶກສາ</DialogTitle>
          <DialogDescription>
            ຂໍ້ມູນທັງໝົດຂອງ {student.name}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-6">
            <div className="space-y-6">
                <div className="flex flex-col items-center gap-4 py-4">
                  <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={student.photoUrl || undefined} alt={student.name} />
                    <AvatarFallback className="text-3xl">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{student.name}</h2>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <DetailItem label="ຊັ້ນ" value={student.class} />
                    <DetailItem label="ລະຫັດບັດນັກສຶກສາ" value={student.studentId} />
                    <DetailItem label="ເບີໂທລະສັບ" value={student.phone} />
                    <DetailItem label="ສະຖານະ" value={student.status} />
                    <DetailItem label="ວັນເດືອນປີເກີດ" value={formatDate(student.dob)} />
                    <DetailItem label="ຖິ່ນກຳເນີດ" value={student.origin} />
                    <DetailItem label="ມາຈາກກົມກອງ" value={student.department} />
                    <DetailItem label="ຕຳແໜ່ງພັກ" value={student.partyPosition} />
                    <DetailItem label="ຕຳແໜ່ງລັດ" value={student.statePosition} />
                    <DetailItem label="ວັນເດືອນປີເຂົ້າການປະຕິວັດ" value={formatDate(student.revolutionDate)} />
                    <DetailItem label="ວັນເດືອນປີເຂົ້າຊາວໜຸ່ມ" value={formatDate(student.youthDate)} />
                    <DetailItem label="ວັນເດືອນປີເຂົ້າພັກສຳຮອງ" value={formatDate(student.reservePartyDate)} />
                    <DetailItem label="ວັນເດືອນປີເຂົ້າພັກສົມບູນ" value={formatDate(student.fullPartyDate)} />
                    <div className="col-span-2">
                        <DetailItem label="ໝາຍເຫດ" value={student.notes} />
                    </div>
                </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>ປິດ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
