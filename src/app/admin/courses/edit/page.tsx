'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function EditCourseForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', price: 0 });

  useEffect(() => {
    if (!id) { router.push('/admin/courses'); return; }
    const fetchCourse = async () => {
      const { data } = await supabase.from('courses').select('*').eq('id', id).single();
      if (data) setFormData({ title: data.title || '', description: data.description || '', price: data.price || 0 });
      setIsLoading(false);
    };
    fetchCourse();
  }, [id, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await supabase.from('courses').update(formData).eq('id', id);
    setIsSaving(false);
    router.push('/admin/courses');
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="max-w-2xl mx-auto" dir="rtl">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/admin/courses" className="text-slate-500 hover:text-blue-600"><ArrowRight className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-black text-slate-800">ویرایش دوره</h1>
      </div>
      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">عنوان دوره</label>
          <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" required />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">توضیحات</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">قیمت (تومان)</label>
          <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" required />
        </div>
        <button type="submit" disabled={isSaving} className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 disabled:opacity-50">
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} ذخیره تغییرات
        </button>
      </form>
    </div>
  );
}

export default function EditCoursePage() {
  return <Suspense fallback={<div className="text-center py-20">در حال بارگذاری...</div>}><EditCourseForm /></Suspense>;
}