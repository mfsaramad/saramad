import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminGuard } from '@/components/admin/AdminGuard';

export const metadata: Metadata = {
  title: 'پنل مدیریت | آموزشگاه سرآمد',
  description: 'مدیریت دوره‌ها، کاربران و سفارشات',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="flex">
          <aside className="hidden lg:block w-64 shrink-0 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 min-h-screen">
            <AdminSidebar />
          </aside>

          <div className="flex-1 min-w-0">
            <AdminHeader />
            <main className="p-4 sm:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}