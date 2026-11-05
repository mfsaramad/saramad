'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Plus, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AdminExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ title: '', course_id: '' });

  const fetchData = async () => {
    try {
      const { data: e, error } = await supabase.from('exams').select('*, courses(title)').order('created_at', { ascending: false });
      if (error) throw error;
      const { data: c } = await supabase.from('courses').select('id, title');
      setExams(e || []); setCourses(c || []); 
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('لطفاً نام آزمون را وارد کنید');
    
    setIsSubmitting(true);
    try {
      const courseIdToSave = form.course_id === '' ? null : form.course_id;
      const { error } = await supabase.from('exams').insert({ title: form.title, course_id: courseIdToSave, duration: 0 });
      if (error) throw error;
      setForm({ title: '', course_id: '' }); fetchData();
    } catch (error: any) { 
      alert('خطا در ساخت آزمون: ' + error.message); 
    } finally { setIsSubmitting(false); }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-2xl font-black">مدیریت آزمون‌ها</h1>
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <form onSubmit={handleCreate} className="flex gap-4 flex-wrap items-center">
          <input placeholder="نام آزمون (مثلاً: آزمون تعیین سطح)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="border p-2 rounded-lg flex-1 outline-none" />
          <select value={form.course_id} onChange={e => setForm({...form, course_id: e.target.value})} className="border p-2 rounded-lg outline-none">
            <option value="">❌ بدون دوره (آزمون مستقل)</option>
            {courses.map(c => <option key={c.id} value={c.id}>✅ {c.title}</option>)}
          </select>
          <button disabled={isSubmitting} type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <><Plus className="w-4 h-4"/> ساخت</>}
          </button>
        </form>
      </div>
      <div className="grid gap-4">
        {exams.map(exam => (
          <div key={exam.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800">{exam.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{exam.courses?.title ? `متصل به: ${exam.courses.title}` : 'آزمون مستقل'}</p>
            </div>
            <Link href={`/admin/exams/${exam.id}`} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
              <FileText className="w-4 h-4"/> سوالات
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
