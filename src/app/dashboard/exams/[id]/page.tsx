'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useParams } from 'next/navigation';
import { Loader2, Clock, CheckCircle, ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';

export default function TakeExamPage() {
  const params = useParams();
  const { user } = useAuth();
  const examId = params.id as string;

  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const { data: examData, error: examError } = await supabase
          .from('exams')
          .select('*')
          .eq('id', examId)
          .single();
        
        if (examError) throw examError;
        setExam(examData);

        const { data: questionsData, error: questionsError } = await supabase
          .from('exam_questions')
          .select('*')
          .eq('exam_id', examId)
          .order('created_at', { ascending: true });
        
        if (questionsError) throw questionsError;
        setQuestions(questionsData || []);
      } catch (err) {
        console.error('خطا در دریافت اطلاعات آزمون:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (examId) fetchExamData();
  }, [examId]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      if (!confirm('شما به همه سوالات پاسخ نداده‌اید. آیا از ارسال آزمون مطمئن هستید؟')) return;
    }

    setIsSubmitting(true);
    try {
      let correctCount = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.correct_option_index) {
          correctCount++;
        }
      });

      const score = Math.round((correctCount / questions.length) * 100);
      const isPassed = score >= (exam.passing_score || 50);

      const { error } = await supabase.from('exam_attempts').insert({
        exam_id: examId,
        user_id: user?.id,
        answers: answers,
        score: score,
        is_passed: isPassed,
      });

      if (error) throw error;

      setResult({ score, isPassed, correctCount, total: questions.length });
      setIsFinished(true);
    } catch (err: any) {
      alert('خطا در ثبت نتیجه: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  if (!exam) return <div className="text-center py-20 text-red-500">آزمون یافت نشد.</div>;
  if (questions.length === 0) return <div className="text-center py-20 text-slate-500">سوالی برای این آزمون ثبت نشده است.</div>;

  if (isFinished && result) {
    return (
      <div className="max-w-2xl mx-auto p-6" dir="rtl">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${result.isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {result.isPassed ? <CheckCircle className="w-10 h-10" /> : <Award className="w-10 h-10" />}
          </div>
          <h1 className="text-2xl font-black text-slate-800 mb-2">
            {result.isPassed ? 'تبریک! شما قبول شدید.' : 'متأسفانه قبول نشدید.'}
          </h1>
          <p className="text-slate-500 mb-8">
            شما به {result.correctCount} سوال از {result.total} سوال پاسخ صحیح دادید.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl mb-8">
            <p className="text-sm text-slate-500 mb-1">نمره نهایی شما:</p>
            <p className={`text-4xl font-black ${result.isPassed ? 'text-green-600' : 'text-red-600'}`}>{result.score}٪</p>
            <p className="text-xs text-slate-400 mt-2">حداقل نمره قبولی: {exam.passing_score}٪</p>
          </div>
          <Link href="/dashboard/exams" className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
            بازگشت به لیست آزمون‌ها
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">{exam.title}</h1>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <Clock className="w-4 h-4" /> زمان: {exam.duration_minutes} دقیقه
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm">
          سوال {currentQuestionIndex + 1} از {questions.length}
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">
          {currentQuestionIndex + 1}. {currentQuestion.question_text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((opt: string, idx: number) => (
            <label
              key={idx}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                answers[currentQuestion.id] === idx
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={answers[currentQuestion.id] === idx}
                onChange={() => handleSelectOption(currentQuestion.id, idx)}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 font-medium">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          سوال قبلی
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'پایان آزمون و ثبت پاسخ‌ها'}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition flex justify-center items-center gap-2"
          >
            سوال بعدی <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}