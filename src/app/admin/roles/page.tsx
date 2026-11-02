'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Plus, Shield } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [rolePermissions, setRolePermissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleTitle, setNewRoleTitle] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: rolesData } = await supabase.from('roles').select('*').order('id');
      const { data: permsData } = await supabase.from('permissions').select('*').order('id');
      const { data: rolePermsData } = await supabase.from('role_permissions').select('*');

      setRoles(rolesData || []);
      setPermissions(permsData || []);
      setRolePermissions(rolePermsData || []);
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName || !newRoleTitle) return alert('نام و عنوان نقش را وارد کنید.');

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('roles').insert({
        name: newRoleName.toLowerCase().replace(/\s+/g, '_'),
        title: newRoleTitle,
      });
      if (error) throw error;
      setNewRoleName('');
      setNewRoleTitle('');
      alert('نقش جدید با موفقیت ساخته شد.');
      fetchData();
    } catch (error: any) {
      alert('خطا در ساخت نقش: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePermission = async (roleId: number, permissionId: number, isChecked: boolean) => {
    try {
      if (isChecked) {
        const { error } = await supabase.from('role_permissions').insert({ role_id: roleId, permission_id: permissionId });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('role_permissions').delete().match({ role_id: roleId, permission_id: permissionId });
        if (error) throw error;
      }
      fetchData();
    } catch (error: any) {
      alert('خطا در تغییر دسترسی: ' + error.message);
    }
  };

  const hasPermission = (roleId: number, permissionId: number) => {
    return rolePermissions.some((rp) => rp.role_id === roleId && rp.permission_id === permissionId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-brand-800 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <FadeIn>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Shield className="w-6 h-6 text-brand-800" />
              مدیریت نقش‌ها و دسترسی‌ها
            </h1>
            <p className="text-sm text-slate-500 mt-1">تعریف نقش‌های جدید و مشخص کردن سطح دسترسی آن‌ها</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" /> ساخت نقش جدید
          </h2>
          <form onSubmit={handleAddRole} className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="نام انگلیسی (مثلاً: accountant)" 
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              dir="ltr"
            />
            <input 
              type="text" 
              placeholder="عنوان فارسی (مثلاً: حسابدار)" 
              value={newRoleTitle}
              onChange={(e) => setNewRoleTitle(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-brand-800 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-brand-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              افزودن نقش
            </button>
          </form>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role, index) => (
          <FadeIn key={role.id} delay={0.2 + index * 0.05}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm h-full">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">{role.title}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1" dir="ltr">{role.name}</p>
                </div>
                {role.name === 'admin' && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-lg font-bold">دسترسی کامل</span>
                )}
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">دسترسی‌های این نقش:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {permissions.map(perm => (
                    <label key={perm.id} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={hasPermission(role.id, perm.id)}
                        onChange={(e) => togglePermission(role.id, perm.id, e.target.checked)}
                        disabled={role.name === 'admin'}
                        className="w-4 h-4 text-brand-800 rounded border-slate-300 focus:ring-brand-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{perm.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}