'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlayCircle, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface LiveClassInfo {
  id: string;
  slug: string;
  title: string;
  isFree: boolean;
  isLive: boolean;
  price: number;
}

const STORAGE_KEY = 'saramad_live_registrations';

interface Registration {
  id: string;
  classId: string;
  classSlug: string;
  classTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  registeredAt: string;
  isFree: boolean;
}

function getRegistrations(): Registration[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRegistrations(regs: Registration[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(regs));
}

interface Props {
  liveClass: LiveClassInfo;
}

export default function ReserveButton({ liveClass }: Props) {
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      const regs = getRegistrations();
      const found = regs.some(
        (r) => r.classId === liveClass.id && r.userId === user.id
      );
      setIsRegistered(found);
    }
  }, [user, liveClass.id]);

  const handleReserve = () => {
    if (!user) {
      window.location.href = `/login?redirect=/live/${liveClass.slug}`;
      return;
    }

    if (isRegistered) return;

    setLoading(true);

    const regs = getRegistrations();

    const newReg: Registration = {
      id: `reg-${Date.now()}`,
      classId: liveClass.id,
      classSlug: liveClass.slug,
      classTitle: liveClass.title,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      registeredAt: new Date().toISOString(),
      isFree: liveClass.isFree,
    };

    regs.push(newReg);
    saveRegistrations(regs);

    setTimeout(() => {
      setIsRegistered(true);
      setLoading(false);
    }, 400);
  };

  if (!mounted) {
    return (
      <div className="w-full h-14 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse mb-3" />
    );
  }

  // کلاس در حال پخش
  if (liveClass.isLive) {
    if (isRegistered) {
      return (
        <Link
          href={`/live/${liveClass.slug}/room`}
          className="w-full flex items-center justify-center gap-2 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black shadow-lg shadow-red-500/30 hover:shadow-xl transition-all hover:scale-[1.02] mb-3"
        >
          <PlayCircle className="w-5 h-5" />
          ورود به کلاس زنده
        </Link>
      );
    }

    return (
      <button
        onClick={handleReserve}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black shadow-lg shadow-red-500/30 hover:shadow-xl transition-all hover:scale-[1.02] mb-3 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            در حال ثبت...
          </>
        ) : (
          <>
            <PlayCircle className="w-5 h-5" />
            ثبت‌نام و ورود به کلاس
          </>
        )}
      </button>
    );
  }

  // کلاس رزرو شده
  if (isRegistered) {
    return (
      <Link
        href="/dashboard/live"
        className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-teal-500 to-teal-700 text-white rounded-xl font-black shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] mb-3"
      >
        <Check className="w-5 h-5" />
        ثبت‌نام شد — مشاهده در پنل کاربری
      </Link>
    );
  }

  // کلاس رایگان
  if (liveClass.isFree) {
    return (
      <button
        onClick={handleReserve}
        disabled={loading}
        className={cn(
          'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] mb-3',
          'bg-gradient-to-l from-teal-500 to-teal-700',
          loading && 'opacity-70 cursor-wait'
        )}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            در حال ثبت...
          </>
        ) : (
          <>
            <PlayCircle className="w-5 h-5" />
            ثبت‌نام رایگان
          </>
        )}
      </button>
    );
  }

  // کلاس پول‌دار
  return (
    <button
      onClick={handleReserve}
      disabled={loading}
      className={cn(
        'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] mb-3',
        'bg-gradient-to-l from-blue-600 to-blue-800',
        loading && 'opacity-70 cursor-wait'
      )}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          در حال ثبت...
        </>
      ) : (
        <>
          <PlayCircle className="w-5 h-5" />
          ثبت‌نام در کلاس
        </>
      )}
    </button>
  );
}