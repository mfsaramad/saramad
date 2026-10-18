'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BookOpen,
  Package,
  ClipboardList,
  Award,
  FileText,
  Bell,
  Settings,
  Home,
  LogOut,
  Sparkles,
  GraduationCap, // 👈 اضافه شد
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'داشبورد', href: '/admin' },
  { icon: ShoppingBag, label: 'سفارشات', href: '/admin/orders' },
  { icon: Users, label: 'کاربران', href: '/admin/users' },
  { icon: BookOpen, label: 'دوره‌ها', href: '/admin/courses' },
  { icon: GraduationCap, label: 'اساتید', href: '/admin/instructors' }, // 👈 اضافه شد
  { icon: Package, label: 'محصولات', href: '/admin/products' },
  { icon: ClipboardList, label: 'آزمون‌ها', href: '/admin/exams' },
  { icon: Award, label: 'مدارک', href: '/admin/certificates' },
  { icon: FileText, label: 'وبلاگ', href: '/admin/blog' },
  { icon: Bell, label: 'اعلانات', href: '/admin/notifications' },
  { icon: Settings, label: 'تنظیمات', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* ============ Sidebar ============ */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <div className="relative p-6 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />
                    <div className="relative flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 via-brand-500 to-purple-500 p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-2xl font-black text-brand-800 dark:text-brand-300">
                          م
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-black text-white truncate">مدیر سرآمد</div>
                        <div className="text-xs text-blue-100">مدیر کل سیستم</div>
                        <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-orange-500/30 backdrop-blur border border-orange-400/50 rounded-full text-[10px] font-bold text-white">
                          <Sparkles className="w-3 h-3" />
                          <span>دسترسی کامل</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <nav className="p-3 space-y-1">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                            isActive
                              ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          )}
                        >
                          <Icon className={cn('w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400')} />
                          <span className="flex-1">{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* دکمه‌های خروج و بازگشت */}
                  <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <Link
                      href="/"
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <Home className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      <span>بازگشت به سایت</span>
                    </Link>
                    <button
                      onClick={async () => await logout()}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>خروج از حساب</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* ============ Main Content ============ */}
            <main className="flex-1 min-w-0">
              {children}
            </main>
            
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}