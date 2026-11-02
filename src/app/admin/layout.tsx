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
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/dashboard');
      }
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row" dir="rtl">
      
      {/* سایدبار در سمت راست (اولین المان در DOM) */}
      <div className="w-full lg:w-72 lg:h-screen lg:sticky lg:top-0 flex-shrink-0 z-10">
        <AdminSidebar />
      </div>
      
      {/* محتوای اصلی در سمت چپ (دومین المان در DOM) */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto h-screen">
        {children}
      </main>
      
    </div>
  );
}