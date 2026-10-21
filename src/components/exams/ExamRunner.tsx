'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Award,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ExamInfo {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  icon: string;
  questions: Question[];
}

interface Props {
  exam: ExamInfo;
}

export default function ExamRunner({ exam }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(exam.questions.length).fill(-1)
  );
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // شروع تایمر
  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = exam.questions[currentIndex];
  const totalAnswered = answers.filter((a) => a !== -1).length;

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = async () => {
    if (saving) return;
    setSaving(true);
    setSaveError('');

    let correct = 0;
    let wrong = 0;

    exam.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct++;
      } else if (answers[idx] !== -1) {
        wrong++;
      }
    });

    const total = exam.questions.length;
    // 👈 جلوگیری از خطای تقسیم بر صفر
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const status: 'passed' | 'failed' = score >= 60 ? 'passed' : 'failed';

    // ذخیره در دیتابیس فقط اگر کاربر لاگین باشد
    if (user) {
      try {
        const { error } = await supabase.from('exam_results').insert([
          {
            user_id: user.id,
            exam_slug: exam.slug,
            exam_title: exam.title,
            score: score,
            total_questions: total,
            correct_answers: correct,
            status: status,
          },
        ]);

        if (error) {
          console.error('خطا در ذخیره نتیجه:', error);
          setSaveError('نتیجه شما ذخیره نشد: ' + error.message);
        }
      } catch (err: any) {
        console.error('خطا در ارتباط با دیتابیس:', err);
        setSaveError('خطا در ارتباط با سرور.');
      }
    } else {
      setSaveError('برای ذخیره نتیجه در پنل کاربری، لطفاً وارد حساب خود شوید.');
    }

    setTimeout(() => {
      setFinished(true);
      setSaving(false);
    }, 600);
  };

  // محاسبه نتیجه برای نمایش
  const result = useMemo(() => {
    if (!finished) return null;
    let correct = 0;
    let wrong = 0;
    exam.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++;
      else if (answers[idx] !== -1) wrong++;
    });
    const total = exam.questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    return {
      correct,
      wrong,
      total,
      score,
      status: score >= 60 ? 'passed' : 'failed',
    };
  }, [finished, answers, exam.questions]);

  // اگر آزمون سوالی ندارد
  if (!started && exam.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2">آزمون بدون سوال!</h2>
          <p className="text-slate-500 mb-6">برای این آزمون هنوز سوالی ثبت نشده است. لطفاً یک آزمون دیگر را امتحان کنید.</p>
          <Link href="/exams" className="px-6 py-3 bg-brand-800 text-white rounded-xl font-bold">بازگشت</Link>
        </div>
      </div>
    );
  }

  // ============ صفحه شروع ============
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/exams/${exam.slug}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-6"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به صفحه آزمون
          </Link>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 text-center">
            <div className="text-7xl mb-6">{exam.icon || '📝'}</div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-800 dark:text-slate-100 mb-3">
              {exam.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              {exam.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                <div className="text-2xl font-black text-brand-800 dark:text-brand-300 mb-1">
                  {exam.questions.length}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">سوال</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                <div className="text-2xl font-black text-teal-600 dark:text-teal-300 mb-1">
                  {exam.duration}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">دقیقه</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                <div className="text-2xl font-black text-orange-600 dark:text-orange-300 mb-1">۶۰٪</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">حد قبولی</div>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full py-4 rounded-xl font-black text-white bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              شروع آزمون
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ صفحه نتیجه ============
  if (finished && result) {
    const isPassed = result.status === 'passed';

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 text-center">
            <div
              className={cn(
                'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6',
                isPassed
                  ? 'bg-gradient-to-br from-teal-400 to-teal-600'
                  : 'bg-gradient-to-br from-red-400 to-red-600'
              )}
            >
              {isPassed ? <CheckCircle2 className="w-12 h-12 text-white" /> : <XCircle className="w-12 h-12 text-white" />}
            </div>

            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-3">
              {isPassed ? '🎉 قبول شدی!' : '😔 متأسفانه رد شدی'}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mb-8">
              {isPassed ? 'تبریک! نمره قبولی رو گرفتی' : 'نگران نباش، دوباره تلاش کن'}
            </p>

            {saveError && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-950/20 border-r-4 border-red-500 rounded-xl flex items-center gap-2 text-red-800 dark:text-red-300 text-sm">
                <AlertCircle className="w-4 h-4" />
                {saveError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 rounded-2xl p-5">
                <div className="text-4xl font-black text-brand-800 dark:text-brand-300 mb-1">{result.score}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">امتیاز</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                <div className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-1">{result.correct}/{result.total}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">پاسخ صحیح</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400">
                <CheckCircle2 className="w-4 h-4" /> {result.correct} صحیح
              </div>
              <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                <XCircle className="w-4 h-4" /> {result.wrong} غلط
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/dashboard/exams" className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white font-black hover:shadow-xl transition">
                <Award className="w-5 h-5" /> مشاهده در پنل کاربری
              </Link>
              <button
                onClick={() => {
                  setStarted(false);
                  setFinished(false);
                  setCurrentIndex(0);
                  setAnswers(new Array(exam.questions.length).fill(-1));
                  setTimeLeft(exam.duration * 60);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <RotateCcw className="w-5 h-5" /> آزمون مجدد
              </button>
              <Link href="/exams" className="w-full inline-flex items-center justify-center gap-2 py-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-bold transition">
                <ArrowRight className="w-4 h-4" /> بازگشت به آزمون‌ها
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ صفحه آزمون ============
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{exam.icon || '📝'}</div>
            <div>
              <div className="font-black text-slate-800 dark:text-slate-100">{exam.title}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">سوال {currentIndex + 1} از {exam.questions.length}</div>
            </div>
          </div>
          <div className={cn('flex items-center gap-2 px-4 py-2 rounded-xl font-black text-lg', timeLeft < 60 ? 'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 animate-pulse' : 'bg-teal-100 dark:bg-teal-950/30 text-teal-600 dark:text-teal-300')}>
            <Clock className="w-5 h-5" /> {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-3 mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>پیشرفت</span>
            <span>{totalAnswered} از {exam.questions.length} پاسخ داده شده</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] transition-all duration-300" style={{ width: `${((currentIndex + 1) / exam.questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 lg:p-8 mb-6">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">سوال {currentIndex + 1}</div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = answers[currentIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={cn('w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-right transition-all', isSelected ? 'border-brand-500 bg-blue-50 dark:bg-blue-950/30' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600')}
                >
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black', isSelected ? 'bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500')}>
                    {['الف', 'ب', 'ج', 'د'][idx] || idx + 1}
                  </div>
                  <span className={cn('flex-1 text-sm font-medium', isSelected ? 'text-brand-800 dark:text-brand-300 font-bold' : 'text-slate-700 dark:text-slate-300')}>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button onClick={handlePrev} disabled={currentIndex === 0} className={cn('flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition', currentIndex === 0 ? 'opacity-0 cursor-default' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800')}>
            <ArrowRight className="w-4 h-4" /> قبلی
          </button>

          {currentIndex === exam.questions.length - 1 ? (
            <button onClick={handleFinish} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-white bg-gradient-to-l from-teal-500 to-teal-700 hover:shadow-xl transition disabled:opacity-70">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> در حال ثبت...</> : <><CheckCircle2 className="w-4 h-4" /> پایان آزمون</>}
            </button>
          ) : (
            <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-white bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] hover:shadow-xl transition">
              بعدی <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}