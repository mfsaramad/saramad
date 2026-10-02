import Link from 'next/link';
import { PlayCircle, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { Course } from '@/types';
import { toPersianNumber, getModeIcon, getModeLabel } from '@/lib/format';

interface MyCourseCardProps {
  course: Course;
  progress: number;
  status: 'active' | 'completed';
}

export default function MyCourseCard({
  course,
  progress,
  status,
}: MyCourseCardProps) {
  const isCompleted = status === 'completed';

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
      {/* Header */}
      <div className="relative p-5 bg-gradient-to-br from-brand-50 to-teal-50 dark:from-slate-800 dark:to-slate-800">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm text-2xl flex-shrink-0">
            🎓
          </div>

          {isCompleted ? (
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-black flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              تمام‌شده
            </span>
          ) : (
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 rounded-full text-xs font-black">
              در حال یادگیری
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
          <span>{getModeIcon(course.mode)}</span>
          <span>{getModeLabel(course.mode)}</span>
        </div>

        <h3 className="font-black text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 min-h-[3rem] group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
          {course.title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              پیشرفت
            </span>
            <span
              className={`font-black ${
                isCompleted
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-brand-800 dark:text-brand-300'
              }`}
            >
              {toPersianNumber(progress)}٪
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isCompleted
                  ? 'bg-gradient-to-l from-teal-500 to-teal-600'
                  : 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488]'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{toPersianNumber(course.duration)} ساعت</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span>{toPersianNumber(course.sessions)} جلسه</span>
        </div>

        {/* Button */}
        <Link
          href={`/courses/${course.slug}`}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all ${
            isCompleted
              ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-950/50'
              : 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white hover:shadow-lg'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              مرور دوره
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4" />
              ادامه یادگیری
            </>
          )}
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}