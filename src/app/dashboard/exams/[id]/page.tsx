'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function StudentTakeExam() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    supabase.from('exam_questions').select('*').eq('exam_id', id).then(({data}) => {
      setQuestions(data || []); setIsLoading(false);
    });
  }, [id]);

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach(q => { if(answers[q.id] === q.correct_option) correctCount++; });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    
    if(user) await supabase.from('user_exam_results').insert({ user_id: user.id, exam_id: id, score: finalScore });
    setSubmitted(true);
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;

  if (submitted) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]" dir="rtl">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4"/>
      <h2 className="text-2xl font-black">آزمون به پایان رسید!</h2>
      <p className="text-lg mt-2">نمره شما: <span className="font-bold text-blue-600">{score}</span> از ۱۰۰</p>
      <button onClick={() => router.push('/dashboard')} className="mt-6 bg-slate-800 text-white px-6 py-2 rounded-xl">بازگشت به داشبورد</button>
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6" dir="rtl">
      <h1 className="text-2xl font-black">پاسخ به سوالات</h1>
      {questions.map((q, i) => (
        <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold mb-4">{i+1}. {q.question_text}</h3>
          <div className="space-y-2">
            {q.options.map((opt: string, optIdx: number) => (
              <label key={optIdx} className="flex items-center gap-3 p-3 rounded-xl border hover:bg-slate-50 cursor-pointer">
                <input type="radio" name={`q-${q.id}`} onChange={() => setAnswers({...answers, [q.id]: optIdx})} className="w-4 h-4"/>
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl disabled:opacity-50">ثبت و مشاهده نتیجه</button>
    </div>
  );
}
