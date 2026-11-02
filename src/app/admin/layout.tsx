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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row">
      {/* محتوای اصلی */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto order-2 lg:order-1">
        {children}
      </main>
      
      {/* سایدبار داینامیک */}
      <div className="order-1 lg:order-2">
        <AdminSidebar />
      </div>
    </div>
  );
}