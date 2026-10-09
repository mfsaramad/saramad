'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Award,
  User,
  Settings,
  LogOut,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toPersianNumber } from '@/lib/format';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  {
    href: '/dashboard',
    label: 'داشبورد',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/dashboard/courses',
    label: 'دوره‌های من',
    icon: BookOpen,
    badge: '۳',
  },
  {
    href: '/dashboard/exams',
    label: 'آزمون‌های من',
    icon: ClipboardList,
    badge: '۵',
  },
  {
    href: '/dashboard/certificates',
    label: 'مدارک من',
    icon: Award,
    badge: '۲',
  },
  {
    href: '/dashboard/profile',
    label: 'پروفایل',
    icon: User,
  },
  {
    href: '/dashboard/settings',
    label: 'تنظیمات',
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="lg:sticky lg:top-24 space-y-4">
        {/* User Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
            {/* الگوی نقطه‌ای */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* حباب تزئینی */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />

            <div className="relative flex items-center gap-3">
              {/* آواتار با حاشیه رنگی */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 via-brand-500 to-orange-500 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-2xl font-black text-brand-800 dark:text-brand-300">
                    {user?.name?.charAt(0) || '؟'}
                  </div>
                </div>
                {/* نقطه آنلاین */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-4 border-white dark:border-slate-900" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-black text-white truncate">
                  {user?.name || 'کاربر مهمان'}
                </div>
                <div className="text-xs text-blue-100">
                  {user?.role === 'admin' ? 'مدیر سیستم' : 'دانشجوی سرآمد'}
                </div>
                <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-white/20 backdrop-blur border border-white/30 rounded-full text-[10px] font-bold text-white">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>سطح طلایی</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    active
                      ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110',
                      active
                        ? 'text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    )}
                  />
                  <span className="flex-1">{item.label}</span>

                  {item.badge && (
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-black',
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300'
                      )}
                    >
                      {toPersianNumber(item.badge)}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>خروج از حساب</span>
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-300" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-800 dark:text-slate-100">
                پیشرفت شما
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                این ماه
              </div>
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-600 dark:text-slate-400">
                  دوره‌ها
                </span>
                <span className="font-bold text-brand-800 dark:text-brand-300">
                  {toPersianNumber(65)}٪
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-600 dark:text-slate-400">
                  آزمون‌ها
                </span>
                <span className="font-bold text-teal-600 dark:text-teal-300">
                  {toPersianNumber(80)}٪
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-teal-400 to-teal-600 rounded-full transition-all duration-500"
                  style={{ width: '80%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-orange-300" />
            </div>

            <h4 className="font-black text-lg mb-2">دوره‌های جدید</h4>
            <p className="text-sm text-blue-100 mb-4 leading-relaxed">
              دوره‌های تازه سرآمد را ببین و مسیر یادگیری‌ات را ادامه بده
            </p>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-brand-800 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all hover:gap-3"
            >
              <GraduationCap className="w-4 h-4" />
              مشاهده دوره‌ها
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}