import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  size = 'sm',
  showNumber = true,
  className,
}: StarRatingProps) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizes[size],
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-slate-200 text-slate-200'
            )}
          />
        ))}
      </div>
      {showNumber && (
        <span className={cn('font-bold text-slate-700', textSizes[size])}>
          {rating.toLocaleString('fa-IR', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </span>
      )}
    </div>
  );
}