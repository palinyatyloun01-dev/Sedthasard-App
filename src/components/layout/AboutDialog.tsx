
'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useLanguage } from '@/context/language-context';
import { Info, User, Phone, Mail } from 'lucide-react';

interface AboutDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AboutDialog({ isOpen, onOpenChange }: AboutDialogProps) {
  const { translations } = useLanguage();
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-6 w-6" />
            {translations.about.title}
          </DialogTitle>
          <DialogDescription>
            {translations.about.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <h3 className="font-semibold">{translations.about.developerInfo}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <span>{translations.about.name} (Boy)</span>
                </div>
                 <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4" />
                    <span>020 5453 9859 (WhatsApp)</span>
                </div>
                 <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4" />
                    <span>somvang.pingsanijai14@gmail.com</span>
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>{translations.about.close}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
