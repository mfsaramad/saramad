'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Plus, Shield, X, BookOpen, Award, ShoppingBag, CheckSquare, List } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [rolePermissions, setRolePermissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // استیت‌های فرم ساخت نقش
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // استیت‌های Modal دسترسی به منابع
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [roleResources, setRoleResources] = useState<any[]>([]);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'courses' | 'exams' | 'products'>('courses');

  // لیست منابع موجود
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [allExams, setAllExams] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: rolesData } = await supabase.from('roles').select('*').order('id');
      const { data: permsData } = await supabase.from('permissions').select('*').order('id');
      const { data: rolePermsData } = await supabase.from('role_permissions').select('*');
      
      const { data: coursesData } = await supabase.from('courses').select('id, title');
      const { data: examsData } = await supabase.from('exams').select('id, title');
      const { data: productsData } = await supabase.from('products').select('id, title');

      setRoles(rolesData || []);
      setPermissions(permsData || []);
      setRolePermissions(rolePermsData || []);
      setAllCourses(coursesData || []);
      setAllExams(examsData || []);
      setAllProducts(productsData || []);
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
      alert('نقش جدید ساخته شد.');
      fetchData();
    } catch (error: any) {
      alert('خطا: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // تغییر دسترسی عمومی (تیک‌های مربوط به منوها)
  const togglePermission = async (roleId: number, permissionId: number, isChecked: boolean) => {
    if (roleId === 1) return alert('دسترسی‌های نقش سوپر ادمین قابل تغییر نیست.');
    try {
      if (isChecked) {
        await supabase.from('role_permissions').insert({ role_id: roleId, permission_id: permissionId });
      } else {
        await supabase.from('role_permissions').delete().match({ role_id: roleId, permission_id: permissionId });
      }
      fetchData();
    } catch (error: any) { alert('خطا: ' + error.message); }
  };

  // باز کردن Modal دسترسی به منابع خاص
  const openResourceModal = async (role: any) => {
    setSelectedRole(role);
    setActiveTab('courses');
    setIsModalLoading(true);
    try {
      const { data } = await supabase.from('role_resource_access').select('resource_type, resource_id').eq('role_id', role.id);
      setRoleResources(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalLoading(false);
    }
  };

  // تغییر دسترسی به منابع خاص
  const toggleResourceAccess = async (type: 'course' | 'exam' | 'product', id: string, isChecked: boolean) => {
    if (!selectedRole) return;
    try {
      if (isChecked) {
        await supabase.from('role_resource_access').insert({ role_id: selectedRole.id, resource_type: type, resource_id: id });
        setRoleResources([...roleResources, { resource_type: type, resource_id: id }]);
      } else {
        await supabase.from('role_resource_access').delete().match({ role_id: selectedRole.id, resource_type: type, resource_id: id });
        setRoleResources(roleResources.filter(r => !(r.resource_type === type && r.resource_id === id)));
      }
    } catch (error: any) { alert('خطا: ' + error.message); }
  };

  const hasPermission = (roleId: number, permissionId: number) => rolePermissions.some((rp) => rp.role_id === roleId && rp.permission_id === permissionId);
  const hasResourceAccess = (type: string, id: string) => roleResources.some(r => r.resource_type === type && r.resource_id === id);

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <FadeIn>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-700" /> مدیریت نقش‌ها و دسترسی‌ها
            </h1>
            <p className="text-sm text-slate-500 mt-1">تعریف نقش‌های جدید و مشخص کردن سطح دسترسی عمومی و جزئی</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Plus className="w-5 h-5" /> ساخت نقش جدید</h2>
          <form onSubmit={handleAddRole} className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="نام انگلیسی (مثلاً: accountant)" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-blue-500" dir="ltr" />
            <input type="text" placeholder="عنوان فارسی (مثلاً: حسابدار)" value={newRoleTitle} onChange={(e) => setNewRoleTitle(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" disabled={isSubmitting} className="bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-800 flex items-center justify-center gap-2 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} افزودن
            </button>
          </form>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role, index) => (
          <FadeIn key={role.id} delay={0.2 + index * 0.05}>
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-800">{role.title}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1" dir="ltr">{role.name}</p>
                </div>
                {role.name === 'admin' ? (
                  <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-lg font-bold border border-red-100">دسترسی کامل</span>
                ) : (
                  <button onClick={() => openResourceModal(role)} className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                    <List className="w-3.5 h-3.5" /> دسترسی‌های جزئی
                  </button>
                )}
              </div>
              
              <div className="space-y-3 flex-1">
                <p className="text-sm font-bold text-slate-600 mb-2">دسترسی‌های منوها (عمومی):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {permissions.map(perm => (
                    <label key={perm.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input type="checkbox" checked={hasPermission(role.id, perm.id)} onChange={(e) => togglePermission(role.id, perm.id, e.target.checked)} disabled={role.name === 'admin'} className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-500" />
                      <span className="text-xs text-slate-700">{perm.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Modal دسترسی‌های جزئی نقش */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <div>
                <h3 className="text-lg font-black text-slate-800">دسترسی‌های جزئی: {selectedRole.title}</h3>
                <p className="text-xs text-slate-500 mt-1">این دسترسی‌ها به تمام کاربرانی که این نقش را دارند داده می‌شود.</p>
              </div>
              <button onClick={() => setSelectedRole(null)} className="p-2 text-slate-400 hover:text-red-500 bg-white rounded-full shadow-sm"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex border-b border-slate-100 px-6 pt-4 gap-6 overflow-x-auto">
              <button onClick={() => setActiveTab('courses')} className={`pb-3 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'courses' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'}`}>دوره‌های خاص</button>
              <button onClick={() => setActiveTab('exams')} className={`pb-3 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'exams' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'}`}>آزمون‌های خاص</button>
              <button onClick={() => setActiveTab('products')} className={`pb-3 font-bold text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === 'products' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'}`}>محصولات خاص</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {isModalLoading ? (
                <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
              ) : (
                <>
                  {activeTab === 'courses' && allCourses.map(c => (
                    <label key={c.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100">
                      <input type="checkbox" checked={hasResourceAccess('course', c.id)} onChange={(e) => toggleResourceAccess('course', c.id, e.target.checked)} className="w-5 h-5 text-blue-700 rounded border-slate-300 focus:ring-blue-500" />
                      <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-600" /><span className="text-sm font-bold text-slate-700">{c.title}</span></div>
                    </label>
                  ))}
                  
                  {activeTab === 'exams' && allExams.map(e => (
                    <label key={e.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100">
                      <input type="checkbox" checked={hasResourceAccess('exam', e.id)} onChange={(ev) => toggleResourceAccess('exam', e.id, ev.target.checked)} className="w-5 h-5 text-blue-700 rounded border-slate-300 focus:ring-blue-500" />
                      <div className="flex items-center gap-2"><Award className="w-4 h-4 text-teal-600" /><span className="text-sm font-bold text-slate-700">{e.title}</span></div>
                    </label>
                  ))}

                  {activeTab === 'products' && allProducts.map(p => (
                    <label key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100">
                      <input type="checkbox" checked={hasResourceAccess('product', p.id)} onChange={(e) => toggleResourceAccess('product', p.id, e.target.checked)} className="w-5 h-5 text-blue-700 rounded border-slate-300 focus:ring-blue-500" />
                      <div className="flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-orange-600" /><span className="text-sm font-bold text-slate-700">{p.title}</span></div>
                    </label>
                  ))}

                  {activeTab === 'courses' && allCourses.length === 0 && <p className="text-center text-slate-500 text-sm">دوره‌ای یافت نشد.</p>}
                  {activeTab === 'exams' && allExams.length === 0 && <p className="text-center text-slate-500 text-sm">آزمونی یافت نشد.</p>}
                  {activeTab === 'products' && allProducts.length === 0 && <p className="text-center text-slate-500 text-sm">محصولی یافت نشد.</p>}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}