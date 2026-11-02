'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, Users, UserCog, Shield, ShoppingBag, 
  GraduationCap, BookOpen, FileText, Bell, Award, LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, hasPermission, logout } = useAuth();

  // تعریف منوها به همراه دسترسی مورد نیاز برای دیدن هر منو
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

  // فیلتر کردن منوها بر اساس دسترسی کاربر
  const visibleMenus = menuItems.filter(item => hasPermission(item.permission));

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 flex flex-col h-full rounded-l-3xl">
      
      {/* پروفایل کاربر در بالای سایدبار */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center text-brand-800 dark:text-brand-300 text-2xl font-black mb-3">
          {user?.name ? user.name[0] : 'م'}
        </div>
        <h3 className="font-bold text-slate-800 dark:text-slate-100">{user?.name || 'مدیر سیستم'}</h3>
        <p className="text-xs text-slate-500 mt-1">{user?.role === 'admin' ? 'مدیر کل' : 'کارمند'}</p>
      </div>

      {/* منوها */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
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
                  ? "bg-brand-800 text-white shadow-md" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* دکمه خروج */}
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