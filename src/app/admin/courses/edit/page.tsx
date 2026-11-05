'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ArrowRight, Save } from 'lucide-react';
import Link from 'next/link';

function EditCourseForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '', short_description: '', mode: 'online', level: 'beginner', price_online: '', price_in_person: '', tags: ''
  });

  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
      if (data) {
        setFormData({
          title: data.title || '',
          short_description: data.short_description || '',
          mode: data.mode || 'online',
          level: data.level || 'beginner',
          price_online: data.price?.online || '',
          price_in_person: data.price?.['in-person'] || '',
          tags: data.tags?.join(', ') || ''
        });
      }
      setIsLoading(false);
    };
    fetchCourse();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t !== '');
      const priceObj: any = {};
      if (formData.price_online) priceObj.online = Number(formData.price_online);
      if (formData.price_in_person) priceObj['in-person'] = Number(formData.price_in_person);

      const { error } = await supabase.from('courses').update({
        title: formData.title,
        short_description: formData.short_description,
        mode: formData.mode,
        level: formData.level,
        price: Object.keys(priceObj).length > 0 ? priceObj : { online: 0 },
        tags: tagsArray
      }).eq('id', id);

      if (error) throw error;
      alert('تغییرات با موفقیت ذخیره شد!');
      router.push('/admin/courses');
    } catch (error: any) {
      alert('خطا در ذخیره: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6" dir="rtl">
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <Link href="/admin/courses" className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition"><ArrowRight className="w-5 h-5 text-slate-700" /></Link>
        <h1 className="text-xl font-black text-slate-800">ویرایش دوره</h1>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">عنوان دوره *</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">توضیحات کوتاه</label>
            <textarea value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none h-24 resize-none"></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">نوع دوره</label>
            <select value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none">
              <option value="online">آنلاین</option>
              <option value="in-person">حضوری</option>
              <option value="hybrid">ترکیبی</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">سطح دوره</label>
            <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none">
              <option value="beginner">مقدماتی</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">پیشرفته</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">قیمت آنلاین (تومان)</label>
            <input type="number" value={formData.price_online} onChange={e => setFormData({...formData, price_online: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">قیمت حضوری (تومان)</label>
            <input type="number" value={formData.price_in_person} onChange={e => setFormData({...formData, price_in_person: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">تگ‌ها (با ویرگول جدا کنید)</label>
            <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none" />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button disabled={isSubmitting} type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl flex justify-center items-center gap-2 disabled:opacity-50">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> ذخیره تغییرات</>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditCoursePage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>}>
      <EditCourseForm />
    </Suspense>
  );
}
