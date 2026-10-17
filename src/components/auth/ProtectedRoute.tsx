'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (isLoading) return; // هنوز در حال بارگذاری session

    // اگر لاگین نیست → برو به login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // اگر admin می‌خوایم و کاربر admin نیست → برو به dashboard
    if (requireAdmin && !isAdmin) {
      router.push('/dashboard');
      return;
    }
  }, [isLoading, isAuthenticated, isAdmin, requireAdmin, router]);

  // در حال بارگذاری
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-bold">در حال بررسی دسترسی...</p>
        </div>
      </div>
    );
  }

  // اگر لاگین نیست یا admin نیست → هیچی نشون نده (چون در حال ریدایرکت هستیم)
  if (!isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}