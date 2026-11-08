'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Plus, Clock, CheckCircle2, Edit, Trash2, Award } from 'lucide-react';
import Link from 'next/link';

export default function AdminExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExams = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('exams')
        .select(`*, course:courses(title)`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setExams(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchExams(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این آزمون مطمئن هستید؟ (تمام سوالات نیز حذف می‌شوند)')) return;
    await supabase.from('exams').delete().eq('id', id);
    fetchExams();
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6" dir="rtl">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Award className="w-7 h-7 text-blue-600" /> مدیریت آزمون‌ها
          </h1>
          <p className="text-sm text-slate-500 mt-1">در این بخش می‌توانید آزمون بسازید و سوالات را مدیریت کنید.</p>
        </div>
        <Link href="/admin/exams/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition shadow-md hover:shadow-lg">
          <Plus className="w-5 h-5" /> ساخت آزمون جدید
        </Link>
      </div>

      {exams.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">هنوز آزمونی ساخته نشده است</h2>
          <p className="text-slate-500 mb-6">برای شروع، اولین آزمون خود را بسازید.</p>
          <Link href="/admin/exams/new" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
            <Plus className="w-5 h-5" /> ساخت آزمون
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <h3 className="font-black text-lg text-slate-800 mb-2">{exam.title}</h3>
              <p className="text-sm text-slate-500 mb-4">دوره: {exam.course?.title || 'عمومی'}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-5">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {exam.duration_minutes} دقیقه</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> قبولی: {exam.passing_score}٪</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/exams/${exam.id}`} className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 py-2.5 rounded-xl text-sm font-bold transition">
                  <Edit className="w-4 h-4" /> مدیریت سوالات
                </Link>
                <button onClick={() => handleDelete(exam.id)} className="flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-xl text-sm font-bold transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}