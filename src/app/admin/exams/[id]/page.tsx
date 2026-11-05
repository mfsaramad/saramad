'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Plus, Trash2 } from 'lucide-react';

export default function AdminExamQuestions() {
  const { id } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [qText, setQText] = useState('');
  const [opts, setOpts] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchQ = async () => {
    const { data, error } = await supabase.from('exam_questions').select('*').eq('exam_id', id).order('created_at');
    if (!error) setQuestions(data || []); 
    setIsLoading(false);
  };
  useEffect(() => { fetchQ(); }, [id]);

  const addQ = async () => {
    if(!qText.trim() || opts.some(o => !o.trim())) return alert('متن سوال و هر ۴ گزینه الزامی است.');
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('exam_questions').insert({ 
        exam_id: id, 
        question_text: qText, 
        options: opts, 
        correct_option: correct 
      });
      
      if (error) throw error; // هندل کردن خطای دیتابیس
      
      setQText(''); setOpts(['', '', '', '']); setCorrect(0); fetchQ();
    } catch (error: any) {
      alert('خطا در ذخیره سوال: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteQ = async (qId: string) => {
    if(!confirm('حذف شود؟')) return;
    await supabase.from('exam_questions').delete().eq('id', qId);
    fetchQ();
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex gap-4 items-center">
        <button onClick={() => router.push('/admin/exams')} className="p-2 bg-slate-100 rounded-lg"><ArrowRight className="w-5 h-5"/></button>
        <h1 className="text-2xl font-black">مدیریت سوالات آزمون</h1>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4 border">
        <input placeholder="متن سوال را اینجا بنویسید..." value={qText} onChange={e => setQText(e.target.value)} className="w-full border p-3 rounded-lg outline-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opts.map((o, i) => (
            <div key={i} className="flex items-center gap-2 border p-3 rounded-lg bg-slate-50">
              <input type="radio" name="correct-opt" checked={correct === i} onChange={() => setCorrect(i)} className="w-5 h-5" title="انتخاب به عنوان پاسخ صحیح"/>
              <input placeholder={`گزینه ${i+1}`} value={o} onChange={e => { const newOpts = [...opts]; newOpts[i] = e.target.value; setOpts(newOpts); }} className="w-full bg-transparent outline-none" />
            </div>
          ))}
        </div>
        <button disabled={isSubmitting} onClick={addQ} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <><Plus className="w-4 h-4"/> ثبت سوال</>}
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-start">
            <div>
              <span className="font-bold text-slate-800">{i+1}. {q.question_text}</span>
              <div className="text-sm text-slate-500 mt-3">پاسخ صحیح: <span className="text-green-600 font-bold">{q.options[q.correct_option]}</span></div>
            </div>
            <button onClick={() => deleteQ(q.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 className="w-5 h-5"/></button>
          </div>
        ))}
      </div>
    </div>
  );
}
