'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.push('/login');
      else if (!isAdmin) router.push('/dashboard');
    }
  }, [user, isLoading, isAdmin, router]);

  if (isLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 text-brand-800 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row pt-20 lg:pt-24" dir="rtl">
      {/* سایدبار در سمت راست (با ارتفاع محاسبه شده با توجه به هدر) */}
      <div className="w-full lg:w-72 lg:h-[calc(100vh-6rem)] lg:sticky lg:top-24 flex-shrink-0 z-10">
        <AdminSidebar />
      </div>
      
      {/* محتوای اصلی */}
      <main className="flex-1 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}