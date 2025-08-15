
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/language-context';

interface FeedbackDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (feedback: string) => void;
}

export function FeedbackDialog({ isOpen, onOpenChange, onSubmit }: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState('');
  const { translations } = useLanguage();

  const handleSubmit = () => {
    if (feedback.trim()) {
      onSubmit(feedback);
      setFeedback('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.feedback.title}</DialogTitle>
          <DialogDescription>
            {translations.feedback.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="feedback-text" className="text-right">
              {translations.feedback.label}
            </Label>
            <Textarea
              id="feedback-text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="col-span-3"
              placeholder={translations.feedback.placeholder}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>{translations.feedback.cancel}</Button>
          <Button type="submit" onClick={handleSubmit} disabled={!feedback.trim()}>{translations.feedback.submit}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
