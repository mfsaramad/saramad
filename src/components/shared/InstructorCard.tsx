import Link from 'next/link';
import { BookOpen, Users } from 'lucide-react';
import type { Instructor } from '@/types';
import { cn } from '@/lib/utils';
import { toPersianNumber } from '@/lib/format';
import StarRating from './StarRating';

interface InstructorCardProps {
  instructor: Instructor;
  className?: string;
}

export default function InstructorCard({
  instructor,
  className,
}: InstructorCardProps) {
  return (
    <Link
      href={`/instructors/${instructor.id}`}
      className={cn(
        'group block bg-white rounded-3xl p-6 border border-slate-100 hover:border-brand-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center',
        className
      )}
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-700 via-brand-800 to-teal-500 p-1 group-hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
            <span className="text-4xl font-black text-brand-800">
              {instructor.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-brand-800 transition">
        {instructor.name}
      </h3>

      <p className="text-sm text-slate-500 mb-3 line-clamp-1">
        {instructor.title}
      </p>

      <div className="flex justify-center mb-4">
        <StarRating rating={instructor.rating} size="sm" />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-brand-800 font-black text-lg">
            <BookOpen className="w-4 h-4" />
            {toPersianNumber(instructor.coursesCount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">دوره</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-brand-800 font-black text-lg">
            <Users className="w-4 h-4" />
            {toPersianNumber(instructor.studentsCount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">دانشجو</div>
        </div>
      </div>
    </Link>
  );
}