
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';

interface RatingDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (rating: number, comment: string) => void;
}

const ratingEmojis: { [key: number]: string } = {
    1: '😠',
    2: '😟',
    3: '😐',
    4: '😊',
    5: '🤩',
};

export function RatingDialog({ isOpen, onOpenChange, onSubmit }: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const { translations } = useLanguage();

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      setRating(0);
      setComment('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.rating.title}</DialogTitle>
          <DialogDescription>
            {translations.rating.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="flex justify-center items-center gap-4">
                <div className="flex">
                    {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button
                        key={ratingValue}
                        type="button"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        >
                        <Star
                            className={cn(
                            'h-8 w-8 cursor-pointer transition-colors',
                            ratingValue <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                            )}
                        />
                        </button>
                    );
                    })}
                </div>
                <div className="text-4xl w-12 h-12 flex items-center justify-center">
                   {rating > 0 && ratingEmojis[rating]}
                </div>
            </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={translations.rating.placeholder}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>{translations.rating.cancel}</Button>
          <Button type="submit" onClick={handleSubmit} disabled={rating === 0}>{translations.rating.submit}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
