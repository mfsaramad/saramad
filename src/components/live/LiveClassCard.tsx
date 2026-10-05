'use client';

import Link from 'next/link';
import {
  Calendar,
  Clock,
  Users,
  Radio,
  PlayCircle,
  ArrowLeft,
} from 'lucide-react';
import type { LiveClass } from '@/lib/data';
import { toPersianNumber, formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

interface LiveClassCardProps {
  liveClass: LiveClass;
}

export default function LiveClassCard({ liveClass }: LiveClassCardProps) {
  const percentage = Math.round(
    (liveClass.registered / liveClass.capacity) * 100
  );
  const isAlmostFull = percentage > 80;

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      gradient: 'from-teal-500 to-teal-700',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      gradient: 'from-orange-500 to-orange-700',
    },
  };

  const colors = colorMap[liveClass.color];

  return (
    <Link
      href={`/live/${liveClass.slug}`}
      className="group block h-full bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
    >
      {/* بخش بالا */}
      <div className="relative p-7 pb-5">
        {/* افکت زنده */}
        {liveClass.isLive && (
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        )}

        {/* برچسب‌ها */}
        <div className="flex items-start justify-between mb-5 relative">
          <div
            className={cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-2xl',
              colors.bg
            )}
          >
            {liveClass.icon}
          </div>

          {liveClass.isLive ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full text-xs font-black text-white shadow-lg shadow-red-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              در حال پخش
            </div>
          ) : liveClass.isFree ? (
            <div className="px-3 py-1 bg-teal-500 rounded-full text-xs font-black text-white shadow-lg shadow-teal-500/30">
              🎁 رایگان
            </div>
          ) : null}
        </div>

        {/* روز و تاریخ */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4 relative">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-bold">{liveClass.day}</span>
          <span>|</span>
          <span>{liveClass.date}</span>
        </div>

        {/* عنوان */}
        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-4 min-h-[3.5rem] relative group-hover:text-brand-800 dark:group-hover:text-brand-300 transition line-clamp-2">
          {liveClass.title}
        </h3>

        {/* استاد */}
        <div className="flex items-center gap-2 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800 relative">
          <div
            className={cn(
              'w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-black',
              colors.gradient
            )}
          >
            {liveClass.instructor.charAt(0)}
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {liveClass.instructor}
          </span>
        </div>

        {/* اطلاعات */}
        <div className="space-y-2.5 mb-5 text-sm text-slate-600 dark:text-slate-400 relative">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-700 dark:text-brand-300" />
            <span>{liveClass.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-700 dark:text-brand-300" />
            <span>
              {toPersianNumber(liveClass.registered)} از{' '}
              {toPersianNumber(liveClass.capacity)} نفر
            </span>
          </div>
        </div>

        {/* نوار ظرفیت */}
        <div className="mb-2 relative">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 dark:text-slate-400">ظرفیت</span>
            <span
              className={cn(
                'font-bold',
                isAlmostFull
                  ? 'text-orange-600 dark:text-orange-400'
                  : 'text-teal-600 dark:text-teal-400'
              )}
            >
              {toPersianNumber(percentage)}٪
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                isAlmostFull
                  ? 'bg-gradient-to-l from-orange-500 to-orange-600'
                  : 'bg-gradient-to-l from-teal-400 to-teal-500'
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* دکمه */}
      <div className="px-7 pb-7 relative">
        <div
          className={cn(
            'flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all group-hover:gap-3',
            liveClass.isLive
              ? 'bg-red-500 text-white'
              : liveClass.isFree
              ? 'bg-teal-500 text-white'
              : cn('bg-gradient-to-l text-white', colors.gradient)
          )}
        >
          {liveClass.isLive ? (
            <>
              <Radio className="w-4 h-4" />
              ورود به کلاس زنده
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4" />
              {liveClass.isFree ? 'ثبت‌نام رایگان' : 'ثبت‌نام در کلاس'}
            </>
          )}
          <ArrowLeft className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}