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
} from 'lucide-react';

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
  },
  {
    href: '/dashboard/exams',
    label: 'آزمون‌های من',
    icon: ClipboardList,
  },
  {
    href: '/dashboard/certificates',
    label: 'مدارک من',
    icon: Award,
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

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden lg:sticky lg:top-24">
        {/* User Info */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-brand-50 to-teal-50 dark:from-slate-800 dark:to-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center text-white text-2xl font-black shadow-lg">
              ک
            </div>
            <div className="min-w-0">
              <div className="font-black text-slate-800 dark:text-slate-100 truncate">
                کاربر مهمان
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                دانشجوی سرآمد
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    active ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition">
            <LogOut className="w-5 h-5" />
            <span>خروج از حساب</span>
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-4 bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <GraduationCap className="w-6 h-6" />
          <h4 className="font-black">دوره‌های جدید</h4>
        </div>
        <p className="text-sm text-blue-100 mb-4 leading-relaxed">
          دوره‌های تازه سرآمد را ببین و مهارت جدید یاد بگیر
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-brand-800 rounded-xl font-bold text-sm hover:bg-blue-50 transition"
        >
          مشاهده دوره‌ها
        </Link>
      </div>
    </aside>
  );
}