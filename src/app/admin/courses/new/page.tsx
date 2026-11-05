'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NewCoursePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    price: 0,
    course_type: 'online' // 👈 مقدار پیش‌فرض
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const baseSlug = formData.title.trim().replace(/\s+/g, '-');
    const randomSuffix = Math.floor(Math.random() * 10000);
    const slug = `${baseSlug || 'course'}-${randomSuffix}`;

    const courseData = {
      ...formData,
      slug: slug,
    };

    const { data, error } = await supabase.from('courses').insert([courseData]).select().single();

    setIsSaving(false);
    
    if (error) {
      alert('خطا در ذخیره: ' + error.message);
    } else if (data) {
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
        
        {/* 👈 فیلد نوع دوره */}
        <div>
          <label className="block text-sm font-bold mb-1">نوع برگزاری دوره *</label>
          <select 
            value={formData.course_type} 
            onChange={e => setFormData({...formData, course_type: e.target.value})} 
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold"
          >
            <option value="online">آنلاین</option>
            <option value="in-person">حضوری</option>
            <option value="hybrid">ترکیبی (حضوری + آنلاین)</option>
          </select>
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