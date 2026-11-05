'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Award } from 'lucide-react';
import Link from 'next/link';

export default function StudentExamsList() {
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.from('exams').select('*, courses(title)').then(({data}) => {
      setExams(data || []); setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-black">آزمون‌های من</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {exams.map(exam => (
          <div key={exam.id} className="bg-white p-6 rounded-2xl shadow-sm border flex justify-between items-center">
            <div><h3 className="font-bold flex items-center gap-2"><Award className="text-teal-600"/> {exam.title}</h3><p className="text-sm text-slate-500 mt-1">{exam.courses?.title}</p></div>
            <Link href={`/dashboard/exams/${exam.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">شروع آزمون</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
