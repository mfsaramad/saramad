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
    <aside className="w-full h-full bg-slate-900 border-l border-slate-800 flex flex-col rounded-l-3xl shadow-xl overflow-hidden text-slate-300">
      
      <div className="p-6 border-b border-slate-800 flex flex-col items-center bg-slate-950/50">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center text-white text-2xl font-black mb-3 shadow-lg">
          {user?.name ? user.name[0] : 'م'}
        </div>
        <h3 className="font-bold text-white">{user?.name || 'مدیر سیستم'}</h3>
        <p className="text-xs text-brand-300 font-bold mt-1 bg-brand-900/50 px-3 py-1 rounded-full border border-brand-800">
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
                  ? "bg-brand-600 text-white shadow-md" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all font-bold text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}