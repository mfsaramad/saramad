'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ShoppingBag,
  FileText,
  GraduationCap,
  Settings,
  Home,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/admin/courses', label: 'دوره‌ها', icon: BookOpen },
  { href: '/admin/users', label: 'کاربران', icon: Users },
  { href: '/admin/orders', label: 'سفارشات', icon: ShoppingBag },
  { href: '/admin/instructors', label: 'اساتید', icon: GraduationCap },
  { href: '/admin/blog', label: 'مقالات', icon: FileText },
  { href: '/admin/settings', label: 'تنظیمات', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            S
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white text-sm">
              پنل مدیریت
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">سرآمد</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Home className="w-4 h-4" />
          <span>بازگشت به سایت</span>
        </Link>
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>خروج</span>
        </button>
      </div>
    </div>
  );
}