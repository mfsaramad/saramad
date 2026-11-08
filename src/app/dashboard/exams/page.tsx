'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StudentExamsPage() {
  const { user } = useAuth();
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // دریافت آزمون‌های فعال
        const { data: examsData, error } = await supabase
          .from('exams')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;

        // بررسی اینکه آیا کاربر در این آزمون‌ها شرکت کرده است یا خیر
        const { data: attempts } = await supabase
          .from('exam_attempts')
          .select('exam_id, score, is_passed')
          .eq('user_id', user?.id);

        const attemptsMap = new Map(attempts?.map(a => [a.exam_id, a]) || []);
        
        const examsWithStatus = (examsData || []).map(exam => ({
          ...exam,
          attempt: attemptsMap.get(exam.id) || null
        }));

        setExams(examsWithStatus);
      } catch (err) {
        console.error('خطا در دریافت آزمون‌ها:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) fetchExams();
  }, [user]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6" dir="rtl">
      <div className="bg-gradient-to-l from-blue-900 to-teal-600 rounded-3xl p-8 text-white mb-8">
        <h1 className="text-2xl font-black mb-2 flex items-center gap-2">
          <Award className="w-8 h-8" /> آزمون‌های من
        </h1>
        <p className="text-blue-100 text-sm">در این بخش می‌توانید در آزمون‌های دوره‌های خود شرکت کنید.</p>
      </div>

      {exams.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">هنوز آزمونی برای شما تعریف نشده است</h2>
          <p className="text-slate-500">لطفاً بعداً دوباره سر بزنید.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="font-black text-lg text-slate-800 mb-2">{exam.title}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{exam.description || 'توضیحی برای این آزمون ثبت نشده است.'}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {exam.duration_minutes} دقیقه</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> نمره قبولی: {exam.passing_score}٪</span>
              </div>

              <div className="mt-auto">
                {exam.attempt ? (
                  <div className={`p-3 rounded-xl text-center font-bold text-sm ${exam.attempt.is_passed ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {exam.attempt.is_passed ? '✅ شما در این آزمون قبول شده‌اید' : '❌ شما در این آزمون قبول نشده‌اید'} (نمره: {exam.attempt.score}٪)
                  </div>
                ) : (
                  <Link href={`/dashboard/exams/${exam.id}`} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
                    شرکت در آزمون <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
