'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, BookOpen, Plus, X, Search, Edit, Trash2 } from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', short_description: '' });

  const fetchData = async () => {
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    setCourses(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    await supabase.from('courses').insert({ title: formData.title, short_description: formData.short_description, is_active: true });
    setIsModalOpen(false);
    fetchData();
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm">
        <h1 className="text-2xl font-black flex items-center gap-2"><BookOpen className="w-6 h-6 text-blue-700" /> مدیریت دوره‌ها</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2"><Plus className="w-4 h-4"/> دوره جدید</button>
      </div>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-slate-50">
            <tr><th className="px-6 py-4">عنوان دوره</th><th className="px-6 py-4">عملیات</th></tr>
          </thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.id} className="border-t">
                <td className="px-6 py-4 font-bold">{c.title}</td>
                <td className="px-6 py-4">
                  <button onClick={() => window.location.href = `/admin/courses/${c.id}`} className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-lg">مدیریت محتوا</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-3xl w-full max-w-md space-y-4">
            <h3 className="font-bold">دوره جدید</h3>
            <input required placeholder="عنوان دوره" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-xl" />
            <textarea placeholder="توضیحات کوتاه" value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} className="w-full p-2 border rounded-xl" />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-xl">ثبت</button>
          </form>
        </div>
      )}
    </div>
  );
}
