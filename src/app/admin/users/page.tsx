'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, UserCog, Search, Users, ShieldCheck } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: rolesData } = await supabase.from('roles').select('*');
      setRoles(rolesData || []);

      const { data: usersData, error } = await supabase
        .from('admin_users_view')
        .select('*')
        .order('email', { ascending: true });

      if (error) throw error;
      setUsers(usersData || []);

    } catch (error: any) {
      console.error('Error fetching users:', error);
      alert('خطا در دریافت لیست کاربران: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeRole = async (userId: string, newRoleId: number) => {
    if (userId === currentUser?.id) {
      alert('شما نمی‌توانید نقش خودتان را تغییر دهید!');
      return;
    }

    setUpdatingId(userId);
    try {
      const existingUser = users.find(u => u.id === userId);
      
      if (existingUser && existingUser.role_id) {
        const { error } = await supabase
          .from('user_roles')
          .update({ role_id: newRoleId })
          .eq('user_id', userId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role_id: newRoleId });
        if (error) throw error;
      }
      
      setUsers(users.map(u => {
        if (u.id === userId) {
          const newRole = roles.find(r => r.id === newRoleId);
          return { ...u, role_id: newRoleId, role_name: newRole?.name, role_title: newRole?.title };
        }
        return u;
      }));
      
    } catch (error: any) {
      console.error('Error updating role:', error);
      alert('خطا در تغییر نقش: ' + error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-800 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-bold">در حال دریافت لیست کاربران...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <FadeIn>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <UserCog className="w-6 h-6 text-brand-800 dark:text-brand-300" />
                مدیریت کاربران و نقش‌ها
              </h1>
              <p className="text-sm text-slate-500 mt-1">تغییر سطح دسترسی کاربران سرآمد</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="جستجوی ایمیل، نام یا نقش..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">کاربر</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">ایمیل</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">نقش فعلی</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">تغییر نقش</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map((u, index) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold">
                          {u.name ? u.name[0] : 'U'}
                        </div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {u.name || 'بدون نام'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500" dir="ltr">
                      {u.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        u.role_name === 'admin' ? 'bg-red-100 text-red-700' :
                        u.role_name === 'manager' ? 'bg-purple-100 text-purple-700' :
                        u.role_name === 'instructor' ? 'bg-orange-100 text-orange-700' :
                        u.role_name === 'staff' ? 'bg-teal-100 text-teal-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {u.role_title || 'بدون نقش (دانشجو)'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={u.role_id || ''}
                          onChange={(e) => changeRole(u.id, Number(e.target.value))}
                          disabled={u.id === currentUser?.id || updatingId === u.id}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50 cursor-pointer"
                        >
                          <option value="" disabled>انتخاب نقش...</option>
                          {roles.map(r => (
                            <option key={r.id} value={r.id}>{r.title}</option>
                          ))}
                        </select>
                        {updatingId === u.id && <Loader2 className="w-4 h-4 animate-spin text-brand-500" />}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      کاربری با این مشخصات یافت نشد.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <div className="bg-blue-50 text-blue-800 p-5 rounded-2xl flex items-start gap-3 border border-blue-200">
          <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div className="text-sm space-y-1">
            <p className="font-bold">نکته امنیتی:</p>
            <p>شما به عنوان <strong>مدیر کل سیستم (Super Admin)</strong> فقط می‌توانید نقش کاربران دیگر را تغییر دهید. تغییر نقش خودتان به دلایل امنیتی غیرفعال است.</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}