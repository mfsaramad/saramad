import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Calendar, Award } from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';
import {
  formatPriceShort,
  formatCountShort,
  toPersianNumber,
  getModeLabel,
  getModeIcon,
  getModeColor,
} from '@/lib/format';
import Badge from './Badge';
import StarRating from './StarRating';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export default function CourseCard({
  course,
  variant = 'default',
  className,
}: CourseCardProps) {
  const modeColor = getModeColor(course.mode);
  const lowestPrice = Math.min(
    ...Object.values(course.price).filter((p): p is number => p !== undefined)
  );

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        'group block bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-brand-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300',
        className
      )}
    >
      {/* تصویر */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 to-teal-100">
        {/* Placeholder تصویر */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-40">🎓</span>
        </div>

        {/* تصویر واقعی */}
        {course.image && (
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* برچسب‌های روی تصویر */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Badge variant={modeColor} className="shadow-lg backdrop-blur-sm">
            <span>{getModeIcon(course.mode)}</span>
            {getModeLabel(course.mode)}
          </Badge>
          {course.remainingCapacity <= 5 && (
            <Badge variant="accent" className="shadow-lg backdrop-blur-sm">
              🔥 فقط {toPersianNumber(course.remainingCapacity)} نفر
            </Badge>
          )}
        </div>

        {/* امتیاز */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 shadow-lg">
          <StarRating rating={course.rating} size="sm" />
        </div>

        {/* مدرک */}
        {course.certificate && (
          <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-lg">
            <Award className="w-5 h-5 text-orange-500" />
          </div>
        )}
      </div>

      {/* محتوا */}
      <div className="p-6">
        {/* دسته‌بندی */}
        {course.tags[0] && (
          <div className="text-xs font-bold text-brand-700 mb-2">
            {course.tags[0]}
          </div>
        )}

        {/* عنوان */}
        <h3 className="text-lg font-black text-slate-800 leading-snug mb-3 line-clamp-2 group-hover:text-brand-800 transition">
          {course.title}
        </h3>

        {/* توضیح کوتاه */}
        {variant !== 'compact' && (
          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
            {course.shortDescription}
          </p>
        )}

        {/* استاد */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
            {course.instructor.name.charAt(0)}
          </div>
          <span className="text-sm text-slate-600">{course.instructor.name}</span>
        </div>

        {/* اطلاعات */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-700" />
            <span>{toPersianNumber(course.duration)} ساعت</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-brand-700" />
            <span>{toPersianNumber(course.sessions)} جلسه</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-brand-700" />
            <span>{formatCountShort(course.studentsCount)}</span>
          </div>
        </div>

        {/* قیمت */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] text-slate-500 mb-0.5">شروع از</div>
            <div className="text-xl font-black text-brand-800">
              {formatPriceShort(lowestPrice)}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-50 group-hover:bg-brand-800 flex items-center justify-center transition">
            <svg
              className="w-4 h-4 text-brand-800 group-hover:text-white transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}