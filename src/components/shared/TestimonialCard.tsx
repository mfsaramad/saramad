import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types';
import { cn } from '@/lib/utils';
import StarRating from './StarRating';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl p-7 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative',
        className
      )}
    >
      <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
        <Quote className="w-5 h-5 text-brand-800" />
      </div>

      <div className="mb-5">
        <StarRating rating={testimonial.rating} size="md" showNumber={false} />
      </div>

      <p className="text-slate-700 leading-relaxed mb-6 text-sm">
        «{testimonial.comment}»
      </p>

      <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white font-black">
          {testimonial.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="font-bold text-slate-800 text-sm">
            {testimonial.name}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            دانشجوی {testimonial.course}
          </div>
        </div>
      </div>
    </div>
  );
}