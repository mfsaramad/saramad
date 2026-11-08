'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewExamPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration_minutes: 60,
    passing_score: 50,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.from('exams').insert({
        title: formData.title,
        description: formData.description,
        duration_minutes: formData.duration_minutes,
        passing_score: formData.passing_score,
        // instructor_id را فعلاً حذف کردیم تا با خطای کلید خارجی مواجه نشویم
      });
      if (error) throw error;
      router.push('/admin/exams');
    } catch (err: any) {
      alert('خطا: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/exams" className="text-slate-400 hover:text-slate-800"><ArrowRight className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-black text-slate-800">ساخت آزمون جدید</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">عنوان آزمون *</label>
          <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" placeholder="مثلاً: آزمون پایان دوره نازک دوزی" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">توضیحات (اختیاری)</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" rows={3} placeholder="توضیح کوتاه درباره آزمون..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">مدت زمان (دقیقه) *</label>
            <input required type="number" value={formData.duration_minutes} onChange={e => setFormData({...formData, duration_minutes: Number(e.target.value)})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">نمره قبولی (درصد) *</label>
            <input required type="number" value={formData.passing_score} onChange={e => setFormData({...formData, passing_score: Number(e.target.value)})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          </div>
        </div>
        <button disabled={isLoading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition flex justify-center items-center gap-2 disabled:opacity-50">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> ذخیره و ادامه (افزودن سوالات)</>}
        </button>
      </form>
    </div>
  );
}