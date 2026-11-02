'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Users, Shield, ShoppingBag, GraduationCap, BookOpen, FileText, Bell, Award, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, hasPermission, logout } = useAuth();

  const menuItems = [
    { name: 'داشبورد', href: '/admin', icon: LayoutDashboard, permission: 'view_admin_panel' },
    { name: 'سفارشات', href: '/admin/orders', icon: ShoppingBag, permission: 'manage_orders' },
    { name: 'کاربران', href: '/admin/users', icon: Users, permission: 'manage_users' },
    { name: 'نقش‌ها و دسترسی‌ها', href: '/admin/roles', icon: Shield, permission: 'manage_roles' },
    { name: 'دوره‌ها', href: '/admin/courses', icon: BookOpen, permission: 'manage_courses' },
    { name: 'اساتید', href: '/admin/instructors', icon: GraduationCap, permission: 'manage_courses' },
    { name: 'وبلاگ', href: '/admin/blog', icon: FileText, permission: 'manage_blog' },
    { name: 'آزمون‌ها', href: '/admin/exams', icon: Award, permission: 'manage_exams' },
    { name: 'اعلانات', href: '/admin/notifications', icon: Bell, permission: 'view_admin_panel' },
  ];

  const visibleMenus = menuItems.filter(item => hasPermission(item.permission));

  return (
    <aside className="w-full h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col rounded-l-3xl shadow-sm overflow-hidden">
      
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white text-2xl font-black mb-3 shadow-md">
          {user?.name ? user.name[0] : 'م'}
        </div>
        <h3 className="font-bold text-slate-800 dark:text-slate-100">{user?.name || 'مدیر سیستم'}</h3>
        <p className="text-xs text-blue-700 dark:text-blue-400 font-bold mt-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          {user?.role === 'admin' ? 'مدیر کل' : 'کارمند'}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
        {visibleMenus.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                isActive 
                  ? "bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-blue-700" : "text-slate-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all font-bold text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}