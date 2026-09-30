'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  ClipboardList,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Target,
  AlertCircle,
  RotateCcw,
  Home,
} from 'lucide-react';
import { toPersianNumber } from '@/lib/format';

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ExamData {
  id: string;
  title: string;
  description: string;
  questions: ExamQuestion[];
  duration: number;
  level: string;
  icon: string;
}

const examsData: Record<string, ExamData> = {
  '1': {
    id: '1',
    title: 'آزمون تعیین سطح برنامه‌نویسی',
    description: 'سطح دانش خود را در برنامه‌نویسی بسنجید',
    duration: 45,
    level: 'مقدماتی تا پیشرفته',
    icon: '💻',
    questions: [
      {
        id: 1,
        question: 'زبان پایتون در چه سالی معرفی شد؟',
        options: ['۱۹۸۹', '۱۹۹۱', '۱۹۹۵', '۲۰۰۰'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'کدام یک از موارد زیر یک نوع داده در پایتون نیست؟',
        options: ['List', 'Tuple', 'Array', 'Dictionary'],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'خروجی دستور print(2 ** 3) چیست؟',
        options: ['6', '8', '9', '23'],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'در جاوااسکریپت، کدام کلمه کلیدی برای تعریف متغیر با قابلیت تغییر استفاده می‌شود؟',
        options: ['const', 'let', 'final', 'static'],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'HTML مخفف چیست؟',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language',
        ],
        correctAnswer: 0,
      },
    ],
  },
  '2': {
    id: '2',
    title: 'آزمون آزمایشی فنی و حرفه‌ای',
    description: 'خودت را در شرایط واقعی آزمون قرار بده',
    duration: 90,
    level: 'متوسط',
    icon: '📋',
    questions: [
      {
        id: 1,
        question: 'کدام یک از موارد زیر یک سیستم‌عامل نیست؟',
        options: ['Windows', 'Linux', 'macOS', 'Photoshop'],
        correctAnswer: 3,
      },
      {
        id: 2,
        question: 'واحد اندازه‌گیری سرعت اینترنت چیست؟',
        options: ['مگابایت', 'مگابیت', 'گیگابایت', 'کیلوبایت'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'کدام یک از موارد زیر نرم‌افزار گرافیکی است؟',
        options: ['Excel', 'Word', 'Photoshop', 'PowerPoint'],
        correctAnswer: 2,
      },
    ],
  },
};

interface ExamPageProps {
  params: Promise<{ id: string }>;
}

export default function ExamPage({ params }: ExamPageProps) {
  const { id } = use(params);
  const exam = examsData[id];

  const [status, setStatus] = useState<'intro' | 'taking' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (exam) {
      setAnswers(new Array(exam.questions.length).fill(-1));
      setTimeLeft(exam.duration * 60);
    }
  }, [exam]);

  // تایمر
  useEffect(() => {
    if (status !== 'taking') return;
    if (timeLeft <= 0) {
      setStatus('result');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  if (!exam) {
    notFound();
  }

  const handleStart = () => {
    setStatus('taking');
    setCurrentQuestion(0);
    setAnswers(new Array(exam.questions.length).fill(-1));
    setTimeLeft(exam.duration * 60);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    setStatus('result');
  };

  const handleRetry = () => {
    handleStart();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${toPersianNumber(mins.toString().padStart(2, '0'))}:${toPersianNumber(
      secs.toString().padStart(2, '0')
    )}`;
  };

  // محاسبه نتیجه
  const correctCount = answers.filter(
    (ans, idx) => ans === exam.questions[idx].correctAnswer
  ).length;
  const wrongCount = answers.filter(
    (ans, idx) => ans !== -1 && ans !== exam.questions[idx].correctAnswer
  ).length;
  const unansweredCount = answers.filter((ans) => ans === -1).length;
  const score = Math.round((correctCount / exam.questions.length) * 100);

  /* ===== صفحه معرفی ===== */
  if (status === 'intro') {
    return (
      <div className="bg-slate-50 min-h-screen">
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-blue-100 mb-8 justify-center">
              <Link href="/" className="hover:text-white transition">
                خانه
              </Link>
              <span>/</span>
              <Link href="/exams" className="hover:text-white transition">
                آزمون‌ها
              </Link>
              <span>/</span>
              <span className="text-white font-bold line-clamp-1">
                {exam.title}
              </span>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-6">{exam.icon}</div>
              <h1 className="text-3xl lg:text-5xl font-black text-white mb-4">
                {exam.title}
              </h1>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                {exam.description}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 -mt-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 lg:p-10">
              <h2 className="text-2xl font-black text-slate-800 mb-6">
                اطلاعات آزمون
              </h2>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <ClipboardList className="w-8 h-8 text-brand-800 mx-auto mb-3" />
                  <div className="text-2xl font-black text-slate-800 mb-1">
                    {toPersianNumber(exam.questions.length)}
                  </div>
                  <div className="text-xs text-slate-500">سوال</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <Clock className="w-8 h-8 text-brand-800 mx-auto mb-3" />
                  <div className="text-2xl font-black text-slate-800 mb-1">
                    {toPersianNumber(exam.duration)}
                  </div>
                  <div className="text-xs text-slate-500">دقیقه</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <Target className="w-8 h-8 text-brand-800 mx-auto mb-3" />
                  <div className="text-lg font-black text-slate-800 mb-1">
                    {exam.level}
                  </div>
                  <div className="text-xs text-slate-500">سطح</div>
                </div>
              </div>

              <div className="bg-orange-50 border-r-4 border-orange-500 rounded-2xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black text-orange-900 mb-2">
                      نکات مهم قبل از شروع
                    </h3>
                    <ul className="text-sm text-orange-800 space-y-1.5">
                      <li>• پس از شروع، تایمر به‌صورت خودکار آغاز می‌شود</li>
                      <li>• می‌توانید بین سوالات جابجا شوید</li>
                      <li>• پس از اتمام زمان، آزمون به‌طور خودکار پایان می‌یابد</li>
                      <li>• در پایان، پاسخ‌های صحیح نمایش داده می‌شوند</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black text-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-6 h-6" />
                شروع آزمون
              </button>

              <div className="text-center mt-6">
                <Link
                  href="/exams"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-800 transition"
                >
                  <ArrowRight className="w-4 h-4" />
                  بازگشت به لیست آزمون‌ها
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ===== صفحه آزمون ===== */
  if (status === 'taking') {
    const question = exam.questions[currentQuestion];
    const selectedAnswer = answers[currentQuestion];
    const progress = ((currentQuestion + 1) / exam.questions.length) * 100;

    return (
      <div className="bg-slate-50 min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* هدر آزمون */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 mb-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs text-slate-500 mb-1">آزمون</div>
                <h1 className="font-black text-slate-800">{exam.title}</h1>
              </div>

              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black ${
                  timeLeft < 60
                    ? 'bg-red-100 text-red-700 animate-pulse'
                    : 'bg-teal-100 text-teal-700'
                }`}
              >
                <Clock className="w-5 h-5" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {/* نوار پیشرفت */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-bold text-slate-700">
                سوال {toPersianNumber(currentQuestion + 1)} از{' '}
                {toPersianNumber(exam.questions.length)}
              </span>
              <span className="text-slate-500">
                {toPersianNumber(Math.round(progress))}٪
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* سوال */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-6">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-black text-brand-800">
                  {toPersianNumber(currentQuestion + 1)}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-800 leading-relaxed pt-2">
                {question.question}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right ${
                      isSelected
                        ? 'bg-gradient-to-l from-brand-50 to-teal-50 border-brand-800 shadow-md'
                        : 'bg-slate-50 border-slate-100 hover:border-brand-200 hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black transition ${
                        isSelected
                          ? 'bg-brand-800 text-white'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {['الف', 'ب', 'ج', 'د'][index]}
                    </div>
                    <span
                      className={`flex-1 text-right ${
                        isSelected
                          ? 'text-brand-800 font-bold'
                          : 'text-slate-700'
                      }`}
                    >
                      {option}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-6 h-6 text-brand-800 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* دکمه‌های ناوبری */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${
                currentQuestion === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              سوال قبلی
            </button>

            {/* نشانگر سوالات */}
            <div className="flex items-center gap-1.5 order-3 sm:order-2 w-full sm:w-auto justify-center">
              {exam.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition ${
                    idx === currentQuestion
                      ? 'bg-brand-800 text-white scale-110'
                      : answers[idx] !== -1
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {toPersianNumber(idx + 1)}
                </button>
              ))}
            </div>

            {currentQuestion === exam.questions.length - 1 ? (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                <Award className="w-4 h-4" />
                پایان آزمون
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white hover:shadow-lg transition order-2 sm:order-3"
              >
                سوال بعدی
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* دکمه پایان سریع */}
          {currentQuestion !== exam.questions.length - 1 && (
            <div className="text-center mt-6">
              <button
                onClick={handleFinish}
                className="text-sm text-slate-500 hover:text-orange-600 transition"
              >
                یا پایان آزمون و مشاهده نتیجه؟
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ===== صفحه نتیجه ===== */
  const isPassed = score >= 60;

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* هدر نتیجه */}
          <div
            className={`relative p-10 text-center text-white overflow-hidden ${
              isPassed
                ? 'bg-gradient-to-br from-teal-500 to-teal-700'
                : 'bg-gradient-to-br from-orange-500 to-orange-700'
            }`}
          >
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="relative">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5">
                {isPassed ? (
                  <Award className="w-12 h-12" />
                ) : (
                  <AlertCircle className="w-12 h-12" />
                )}
              </div>

              <h1 className="text-3xl font-black mb-2">
                {isPassed ? '🎉 تبریک! قبول شدی' : 'متأسفانه قبول نشدی'}
              </h1>
              <p className="text-white/90">
                {isPassed
                  ? 'شما در این آزمون موفق شدید'
                  : 'نگران نباش، می‌تونی دوباره تلاش کنی'}
              </p>

              {/* امتیاز */}
              <div className="mt-8 inline-block px-8 py-5 bg-white/20 backdrop-blur rounded-3xl border border-white/30">
                <div className="text-6xl font-black">
                  {toPersianNumber(score)}
                </div>
                <div className="text-sm mt-1 opacity-90">امتیاز از ۱۰۰</div>
              </div>
            </div>
          </div>

          {/* آمار نتیجه */}
          <div className="p-8 lg:p-10">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-teal-50 rounded-2xl p-5 text-center border border-teal-100">
                <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-teal-700">
                  {toPersianNumber(correctCount)}
                </div>
                <div className="text-xs text-teal-600">پاسخ صحیح</div>
              </div>
              <div className="bg-red-50 rounded-2xl p-5 text-center border border-red-100">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-red-700">
                  {toPersianNumber(wrongCount)}
                </div>
                <div className="text-xs text-red-600">پاسخ غلط</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <div className="text-2xl font-black text-slate-600">
                  {toPersianNumber(unansweredCount)}
                </div>
                <div className="text-xs text-slate-500">بدون پاسخ</div>
              </div>
            </div>

            {/* بازبینی پاسخ‌ها */}
            <div className="mb-8">
              <h2 className="text-xl font-black text-slate-800 mb-5">
                بازبینی پاسخ‌ها
              </h2>

              <div className="space-y-3">
                {exam.questions.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  const isUnanswered = userAnswer === -1;

                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl border-2 p-4 ${
                        isCorrect
                          ? 'bg-teal-50 border-teal-200'
                          : isUnanswered
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-black ${
                            isCorrect
                              ? 'bg-teal-500'
                              : isUnanswered
                              ? 'bg-slate-400'
                              : 'bg-red-500'
                          }`}
                        >
                          {toPersianNumber(idx + 1)}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-800 mb-2 text-sm">
                            {q.question}
                          </p>
                          <div className="space-y-1 text-xs">
                            {isUnanswered ? (
                              <p className="text-slate-500">
                                ⚠️ بدون پاسخ
                              </p>
                            ) : (
                              <>
                                <p
                                  className={
                                    isCorrect
                                      ? 'text-teal-700'
                                      : 'text-red-700'
                                  }
                                >
                                  پاسخ شما:{' '}
                                  <strong>
                                    {q.options[userAnswer]}
                                  </strong>
                                </p>
                                {!isCorrect && (
                                  <p className="text-teal-700">
                                    پاسخ صحیح:{' '}
                                    <strong>
                                      {q.options[q.correctAnswer]}
                                    </strong>
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* دکمه‌ها */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02] min-w-[200px]"
              >
                <RotateCcw className="w-5 h-5" />
                آزمون مجدد
              </button>
              <Link
                href="/exams"
                className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-brand-800 text-brand-800 rounded-xl font-black hover:bg-brand-800 hover:text-white transition-all min-w-[200px]"
              >
                <Home className="w-5 h-5" />
                بازگشت به آزمون‌ها
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}