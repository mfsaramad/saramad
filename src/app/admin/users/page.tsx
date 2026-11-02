'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, UserCog, Search, Settings, X, BookOpen, Award, ShoppingBag } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  // استیت‌های Modal و منابع
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [userPerms, setUserPerms] = useState<any[]>([]);
  const [userResources, setUserResources] = useState<any[]>([]); // لیست دسترسی به منابع
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'courses' | 'exams' | 'products'>('general');

  // لیست تمام منابع موجود در سیستم
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [allExams, setAllExams] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: rolesData } = await supabase.from('roles').select('*');
      const { data: permsData } = await supabase.from('permissions').select('*');
      const { data: usersData } = await supabase.from('admin_users_view').select('*').order('email');
      
      const { data: coursesData } = await supabase.from('courses').select('id, title');
      const { data: examsData } = await supabase.from('exams').select('id, title');
      const { data: productsData } = await supabase.from('products').select('id, title');

      setRoles(rolesData || []);
      setPermissions(permsData || []);
      setUsers(usersData || []);
      setAllCourses(coursesData || []);
      setAllExams(examsData || []);
      setAllProducts(productsData || []);
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
      const { data: permsData } = await supabase.from('user_permissions').select('permission_id').eq('user_id', user.id);
      setUserPerms(permsData?.map((d: any) => d.permission_id) || []);

      const { data: resData } = await supabase.from('user_resource_access').select('resource_type, resource_id').eq('user_id', user.id);
      setUserResources(resData || []);
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
    } catch (error: any) { alert('خطا: ' + error.message); }
  };

  const toggleResourceAccess = async (type: 'course' | 'exam' | 'product', id: string, isChecked: boolean) => {
    if (!selectedUser) return;
    try {
      if (isChecked) {
        await supabase.from('user_resource_access').insert({ user_id: selectedUser.id, resource_type: type, resource_id: id });
        setUserResources([...userResources, { resource_type: type, resource_id: id }]);
      } else {
        await supabase.from('user_resource_access').delete().match({ user_id: selectedUser.id, resource_type: type, resource_id: id });
        setUserResources(userResources.filter(r => !(r.resource_type === type && r.resource_id === id)));
      }
    } catch (error: any) { alert('خطا: ' + error.message); }
  };

  const hasResourceAccess = (type: string, id: string) => userResources.some(r => r.resource_type === type && r.resource_id === id);

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <FadeIn>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <UserCog className="w-6 h-6 text-blue-700" /> مدیریت کاربران
            </h1>
            <p className="text-sm text-slate-500 mt-1">تغییر دسترسی‌های گروهی و فردی</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="جستجو..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-right">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">کاربر</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">نقش</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-600">تنظیمات دسترسی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">{u.name ? u.name[0] : 'U'}</div>
                      <div>
                        <div className="font-bold text-slate-800">{u.name || 'بدون نام'}</div>
                        <div className="text-xs text-slate-500" dir="ltr">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select value={u.role_id || ''} onChange={(e) => changeRole(u.id, Number(e.target.value))} disabled={u.id === currentUser?.id} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm">
                      {roles.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => openModal(u)} className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2">
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
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <div>
                <h3 className="text-lg font-black text-slate-800">مدیریت دسترسی: {selectedUser.name || selectedUser.email}</h3>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-2 text-slate-400 hover:text-red-500 bg-white rounded-full shadow-sm"><X className="w-5 h-5" /></button>
            </div>

            {/* تب‌ها */}
            <div className="flex border-b border-slate-100 px-6 pt-4 gap-6 overflow-x-auto">
              <button onClick={() => setActiveTab('general')} className={`pb-3 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'general' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'}`}>دسترسی‌های عمومی</button>
              <button onClick={() => setActiveTab('courses')} className={`pb-3 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'courses' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'}`}>دوره‌های خاص</button>
              <button onClick={() => setActiveTab('exams')} className={`pb-3 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'exams' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'}`}>آزمون‌های خاص</button>
              <button onClick={() => setActiveTab('products')} className={`pb-3 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'products' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'}`}>محصولات خاص</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {isModalLoading ? (
                <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
              ) : (
                <>
                  {activeTab === 'general' && (
                    <div className="space-y-3">
                      {permissions.map(perm => (
                        <label key={perm.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
                          <input type="checkbox" checked={userPerms.includes(perm.id)} onChange={(e) => toggleUserPerm(perm.id, e.target.checked)} className="w-5 h-5 text-blue-700 rounded border-slate-300 focus:ring-blue-500" />
                          <span className="text-sm font-bold text-slate-700">{perm.title}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {activeTab === 'courses' && (
                    <div className="space-y-3">
                      {allCourses.map(c => (
                        <label key={c.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100">
                          <input type="checkbox" checked={hasResourceAccess('course', c.id)} onChange={(e) => toggleResourceAccess('course', c.id, e.target.checked)} className="w-5 h-5 text-blue-700 rounded border-slate-300 focus:ring-blue-500" />
                          <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-600" /><span className="text-sm font-bold text-slate-700">{c.title}</span></div>
                        </label>
                      ))}
                    </div>
                  )}

                  {activeTab === 'exams' && (
                    <div className="space-y-3">
                      {allExams.map(e => (
                        <label key={e.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100">
                          <input type="checkbox" checked={hasResourceAccess('exam', e.id)} onChange={(ev) => toggleResourceAccess('exam', e.id, ev.target.checked)} className="w-5 h-5 text-blue-700 rounded border-slate-300 focus:ring-blue-500" />
                          <div className="flex items-center gap-2"><Award className="w-4 h-4 text-teal-600" /><span className="text-sm font-bold text-slate-700">{e.title}</span></div>
                        </label>
                      ))}
                    </div>
                  )}

                  {activeTab === 'products' && (
                    <div className="space-y-3">
                      {allProducts.map(p => (
                        <label key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100">
                          <input type="checkbox" checked={hasResourceAccess('product', p.id)} onChange={(e) => toggleResourceAccess('product', p.id, e.target.checked)} className="w-5 h-5 text-blue-700 rounded border-slate-300 focus:ring-blue-500" />
                          <div className="flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-orange-600" /><span className="text-sm font-bold text-slate-700">{p.title}</span></div>
                        </label>
                      ))}
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