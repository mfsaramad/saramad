'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Radio,
  Calendar,
  PlayCircle,
  Loader2,
  Video,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCollection } from '@/hooks/useCollection';

interface Registration {
  id: string;
  classId: string;
  classSlug: string;
  classTitle: string;
  userId: string;
  registeredAt: string;
  isFree: boolean;
}

interface LiveClass {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  instructor: string;
  isLive: boolean;
  isFree: boolean;
  icon: string;
  [key: string]: any;
}

const STORAGE_KEY = 'saramad_live_registrations';

function getRegistrations(): Registration[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function DashboardLivePage() {
  const { user } = useAuth();
  const { data: allClasses, loading: classLoading } =
    useCollection<LiveClass>('liveClasses');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      const regs = getRegistrations().filter((r) => r.userId === user.id);
      setRegistrations(regs);
    }
  }, [user]);

  const myClasses = registrations
    .map((reg) => {
      const cls = allClasses.find((c) => c.id === reg.classId);
      return cls ? { ...cls, registeredAt: reg.registeredAt } : null;
    })
    .filter(Boolean) as (LiveClass & { registeredAt: string })[];

  if (!mounted || classLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          کلاس‌های آنلاین من
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {myClasses.length > 0
            ? `${myClasses.length.toLocaleString('fa-IR')} کلاس رزرو شده`
            : 'هنوز کلاسی رزرو نکرده‌اید'}
        </p>
      </div>

      {myClasses.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <Video className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            هنوز کلاسی رزرو نکرده‌اید
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            کلاس‌های آنلاین رایگان و پول‌دار را از بخش آموزش آنلاین رزرو کنید
          </p>
          <Link
            href="/live"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            <Radio className="w-4 h-4" />
            مشاهده کلاس‌ها
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition"
            >
              <div
                className={`h-32 flex items-center justify-center text-5xl ${
                  cls.isLive
                    ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20'
                    : 'bg-gradient-to-br from-blue-50 to-teal-100 dark:from-blue-900/20 dark:to-teal-800/20'
                }`}
              >
                {cls.icon || '🎥'}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {cls.isLive && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      در حال پخش
                    </span>
                  )}
                  {cls.isFree && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-bold">
                      رایگان
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {cls.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {cls.date}
                  </div>
                  <span>•</span>
                  <div>{cls.time}</div>
                </div>

                {cls.isLive ? (
                  <Link
                    href={`/live/${cls.slug}/room`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition"
                  >
                    <PlayCircle className="w-4 h-4" />
                    ورود به کلاس
                  </Link>
                ) : (
                  <Link
                    href={`/live/${cls.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold transition"
                  >
                    <PlayCircle className="w-4 h-4" />
                    جزئیات کلاس
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}