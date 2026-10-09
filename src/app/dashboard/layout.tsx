import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { UserGuard } from '@/components/auth/UserGuard';

export const metadata: Metadata = {
  title: 'پنل کاربری',
  description: 'پنل کاربری آموزشگاه سرآمد - مدیریت دوره‌ها، آزمون‌ها و مدارک',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <UserGuard>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 lg:pt-28 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Content */}
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </UserGuard>
  );
}