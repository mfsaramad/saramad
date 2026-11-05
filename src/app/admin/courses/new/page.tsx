'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NewCoursePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', price: 0 });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // ساخت دوره جدید در دیتابیس
    const { data, error } = await supabase.from('courses').insert([formData]).select().single();
    
    setIsSaving(false);
    if (error) {
      alert('خطا در ذخیره: ' + error.message);
    } else if (data) {
      // هدایت به صفحه ویرایش با استفاده از Query Param (رفع خطای 404)
      router.push(`/admin/courses/edit?id=${data.id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto" dir="rtl">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/admin/courses" className="text-slate-500 hover:text-blue-600"><ArrowRight className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-black text-slate-800">ساخت دوره جدید</h1>
      </div>
      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">عنوان دوره *</label>
          <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" required />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">توضیحات</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">قیمت (تومان) *</label>
          <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" required />
        </div>
        <button type="submit" disabled={isSaving} className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 disabled:opacity-50">
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} ذخیره و ادامه
        </button>
      </form>
    </div>
  );
}