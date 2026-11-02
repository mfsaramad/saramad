'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, UserCog, Search, Users, Settings, X, BookOpen } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]); // لیست همه دوره‌ها
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  // استیت‌های Modal
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [userPerms, setUserPerms] = useState<any[]>([]);
  const [userCourseAccess, setUserCourseAccess] = useState<any[]>([]); // دسترسی به دوره‌های خاص
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'courses'>('general');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: rolesData } = await supabase.from('roles').select('*');
      const { data: permsData } = await supabase.from('permissions').select('*');
      const { data: coursesData } = await supabase.from('courses').select('id, title').order('title');
      const { data: usersData, error } = await supabase.from('admin_users_view').select('*').order('email');

      if (error) throw error;
      
      setRoles(rolesData || []);
      setPermissions(permsData || []);
      setAllCourses(coursesData || []);
      setUsers(usersData || []);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeRole = async (userId: string, newRoleId: number) => {
    if (userId === currentUser?.id) return alert('شما نمی‌توانید نقش خودتان را تغییر دهید!');
    setUpdatingId(userId);
    try {
      const existingUser = users.find(u => u.id === userId);
      if (existingUser && existingUser.role_id) {
        await supabase.from('user_roles').update({ role_id: newRoleId }).eq('user_id', userId);
      } else {
        await supabase.from('user_roles').insert({ user_id: userId, role_id: newRoleId });
      }
      setUsers(users.map(u => u.id === userId ? { ...u, role_id: newRoleId, role_name: roles.find(r => r.id === newRoleId)?.name, role_title: roles.find(r => r.id === newRoleId)?.title } : u));
    } catch (error: any) {
      alert('خطا در تغییر نقش: ' + error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const openModal = async (user: any) => {
    setSelectedUser(user);
    setActiveTab('general');
    setIsModalLoading(true);
    try {
      // دریافت دسترسی‌های عمومی
      const { data: permsData } = await supabase.from('user_permissions').select('permission_id').eq('user_id', user.id);
      setUserPerms(permsData?.map((d: any) => d.permission_id) || []);

      // دریافت دسترسی به دوره‌های خاص
      const { data: coursesData } = await supabase.from('user_course_access').select('course_id').eq('user_id', user.id);
      setUserCourseAccess(coursesData?.map((d: any) => d.course_id) || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const toggleUserPerm = async (permissionId: number, isChecked: boolean) => {
    if (!selectedUser) return;
    try {
      if (isChecked) {
        await supabase.from('user_permissions').insert({ user_id: selectedUser.id, permission_id: permissionId });
        setUserPerms([...userPerms, permissionId]);
      } else {
        await supabase.from('user_permissions').delete().match({ user_id: selectedUser.id, permission_id: permissionId });
        setUserPerms(userPerms.filter(id => id !== permissionId));
      }
    } catch (error: any) {
      alert('خطا در تغییر: ' + error.message);
    }
  };

  const toggleCourseAccess = async (courseId: string, isChecked: boolean) => {
    if (!selectedUser) return;
    try {
      if (isChecked) {
        await supabase.from('user_course_access').insert({ user_id: selectedUser.id, course_id: courseId });
        setUserCourseAccess([...userCourseAccess, courseId]);
      } else {
        await supabase.from('user_course_access').delete().match({ user_id: selectedUser.id, course_id: courseId });
        setUserCourseAccess(userCourseAccess.filter(id => id !== courseId));
      }
    } catch (error: any) {
      alert('خطا در تغییر: ' + error.message);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-10 h-10 text-brand-800 animate-spin" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <FadeIn>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <UserCog className="w-6 h-6 text-brand-800 dark:text-brand-300" />
              مدیریت کاربران
            </h1>
            <p className="text-sm text-slate-500 mt-1">تغییر دسترسی‌های گروهی و فردی</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="جستجو..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <table className="w-full text-right">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">کاربر</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">نقش</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">تنظیمات دسترسی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold">{u.name ? u.name[0] : 'U'}</div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{u.name || 'بدون نام'}</div>
                        <div className="text-xs text-slate-500" dir="ltr">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select value={u.role_id || ''} onChange={(e) => changeRole(u.id, Number(e.target.value))} disabled={u.id === currentUser?.id} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                      {roles.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => openModal(u)} className="px-4 py-2 bg-brand-50 text-brand-800 text-sm font-bold rounded-xl hover:bg-brand-100 transition-colors flex items-center gap-2">
                      <Settings className="w-4 h-4" /> مدیریت دسترسی
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>

      {/* Modal پیشرفته */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">مدیریت دسترسی: {selectedUser.name || selectedUser.email}</h3>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-2 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 rounded-full shadow-sm"><X className="w-5 h-5" /></button>
            </div>

            {/* تب‌ها */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-4 gap-6">
              <button onClick={() => setActiveTab('general')} className={`pb-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'general' ? 'border-brand-600 text-brand-700 dark:text-brand-400' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>دسترسی‌های عمومی (نقش‌ها)</button>
              <button onClick={() => setActiveTab('courses')} className={`pb-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'courses' ? 'border-brand-600 text-brand-700 dark:text-brand-400' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>دسترسی به دوره‌های خاص</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {isModalLoading ? (
                <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-brand-500 animate-spin" /></div>
              ) : (
                <>
                  {activeTab === 'general' && (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-500 mb-4">این دسترسی‌ها به صورت **فردی** به کاربر داده می‌شوند.</p>
                      {permissions.map(perm => (
                        <label key={perm.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                          <input type="checkbox" checked={userPerms.includes(perm.id)} onChange={(e) => toggleUserPerm(perm.id, e.target.checked)} className="w-5 h-5 text-brand-800 rounded border-slate-300 focus:ring-brand-500" />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{perm.title}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {activeTab === 'courses' && (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-500 mb-4">اگر این کاربر استاد است، با تیک زدن هر دوره، او به آن دوره خاص دسترسی پیدا می‌کند.</p>
                      {allCourses.map(course => (
                        <label key={course.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                          <input type="checkbox" checked={userCourseAccess.includes(course.id)} onChange={(e) => toggleCourseAccess(course.id, e.target.checked)} className="w-5 h-5 text-brand-800 rounded border-slate-300 focus:ring-brand-500" />
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-brand-600" />
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{course.title}</span>
                          </div>
                        </label>
                      ))}
                      {allCourses.length === 0 && <p className="text-sm text-slate-500 text-center py-4">هیچ دوره‌ای در سیستم ثبت نشده است.</p>}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}