'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, LogOut, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'instructor' && user.role !== 'admin') {
        router.push('/dashboard'); // دانشجوها حق ورود ندارند
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-50"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      {/* هدر پنل استاد */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-slate-800">پنل استاد</h1>
              <p className="text-xs text-slate-500">{user.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-700 transition-colors">بازگشت به سایت</Link>
            <div className="w-px h-6 bg-slate-200" />
            <button onClick={logout} className="text-red-500 hover:text-red-700 flex items-center gap-2 text-sm font-bold transition-colors">
              <LogOut className="w-4 h-4" /> خروج
            </button>
          </div>
        </div>
      </header>

      {/* محتوای اصلی */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}