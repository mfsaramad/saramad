'use client';

import { useState, useEffect } from 'react';
import {
  Clock,
  ClipboardList,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  AlertCircle,
  RotateCcw,
  X,
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

interface ExamModalProps {
  exam: ExamData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExamModal({ exam, isOpen, onClose }: ExamModalProps) {
  const [status, setStatus] = useState<'intro' | 'taking' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // ریست کردن وقتی modal بسته/باز می‌شه
  useEffect(() => {
    if (isOpen && exam) {
      setStatus('intro');
      setCurrentQuestion(0);
      setAnswers(new Array(exam.questions.length).fill(-1));
      setTimeLeft(exam.duration * 60);
    }
  }, [isOpen, exam]);

  // قفل کردن اسکرول وقتی modal بازه
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  if (!isOpen || !exam) return null;

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

  const handleClose = () => {
    if (status === 'taking') {
      if (!confirm('آیا مطمئنی می‌خوای آزمون رو نیمه‌کاره رها کنی؟')) {
        return;
      }
    }
    onClose();
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 p-5 border-b border-slate-200 bg-white">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-slate-500 mb-1">آزمون</div>
            <h2 className="font-black text-slate-800 truncate">
              {exam.title}
            </h2>
          </div>

          {status === 'taking' && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black flex-shrink-0 ${
                timeLeft < 60
                  ? 'bg-red-100 text-red-700 animate-pulse'
                  : 'bg-teal-100 text-teal-700'
              }`}
            >
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          )}

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition flex-shrink-0"
            aria-label="بستن"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {/* ===== مرحله ۱: معرفی ===== */}
          {status === 'intro' && (
            <div>
              <div className="text-center mb-8">
                <div className="text-6xl mb-5">{exam.icon}</div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3">
                  {exam.title}
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  {exam.description}
                </p>
              </div>

              {/* اطلاعات آزمون */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 text-center border border-slate-100">
                  <ClipboardList className="w-7 h-7 text-brand-800 mx-auto mb-3" />
                  <div className="text-2xl font-black text-slate-800 mb-1">
                    {toPersianNumber(exam.questions.length)}
                  </div>
                  <div className="text-xs text-slate-500">سوال</div>
                </div>
                <div className="bg-white rounded-2xl p-5 text-center border border-slate-100">
                  <Clock className="w-7 h-7 text-brand-800 mx-auto mb-3" />
                  <div className="text-2xl font-black text-slate-800 mb-1">
                    {toPersianNumber(exam.duration)}
                  </div>
                  <div className="text-xs text-slate-500">دقیقه</div>
                </div>
                <div className="bg-white rounded-2xl p-5 text-center border border-slate-100">
                  <Award className="w-7 h-7 text-brand-800 mx-auto mb-3" />
                  <div className="text-lg font-black text-slate-800 mb-1">
                    {exam.level}
                  </div>
                  <div className="text-xs text-slate-500">سطح</div>
                </div>
              </div>

              {/* نکات مهم */}
              <div className="bg-orange-50 border-r-4 border-orange-500 rounded-2xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-orange-900 mb-2">
                      نکات مهم قبل از شروع
                    </h4>
                    <ul className="text-sm text-orange-800 space-y-1.5">
                      <li>• پس از شروع، تایمر به‌صورت خودکار آغاز می‌شود</li>
                      <li>• می‌توانید بین سوالات جابجا شوید</li>
                      <li>
                        • پس از اتمام زمان، آزمون به‌طور خودکار پایان می‌یابد
                      </li>
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
            </div>
          )}

          {/* ===== مرحله ۲: آزمون ===== */}
          {status === 'taking' && (
            <div>
              {/* نوار پیشرفت */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-bold text-slate-700">
                    سوال {toPersianNumber(currentQuestion + 1)} از{' '}
                    {toPersianNumber(exam.questions.length)}
                  </span>
                  <span className="text-slate-500">
                    {toPersianNumber(
                      Math.round(
                        ((currentQuestion + 1) / exam.questions.length) * 100
                      )
                    )}
                    ٪
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / exam.questions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* سوال */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-black text-brand-800">
                      {toPersianNumber(currentQuestion + 1)}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-relaxed pt-2">
                    {exam.questions[currentQuestion].question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {exam.questions[currentQuestion].options.map(
                    (option, index) => {
                      const isSelected = answers[currentQuestion] === index;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSelectAnswer(index)}
                          className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all text-right ${
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
                            className={`flex-1 text-right text-sm sm:text-base ${
                              isSelected
                                ? 'text-brand-800 font-bold'
                                : 'text-slate-700'
                            }`}
                          >
                            {option}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-brand-800 flex-shrink-0" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* ناوبری */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                    currentQuestion === 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                  قبلی
                </button>

                <div className="flex items-center gap-1.5 flex-wrap justify-center order-3 sm:order-2 w-full sm:w-auto">
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
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-orange-500 text-white hover:bg-orange-600 transition order-2 sm:order-3"
                  >
                    <Award className="w-4 h-4" />
                    پایان آزمون
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white hover:shadow-lg transition order-2 sm:order-3"
                  >
                    بعدی
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>

              {currentQuestion !== exam.questions.length - 1 && (
                <div className="text-center">
                  <button
                    onClick={handleFinish}
                    className="text-sm text-slate-500 hover:text-orange-600 transition"
                  >
                    یا پایان آزمون و مشاهده نتیجه؟
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ===== مرحله ۳: نتیجه ===== */}
          {status === 'result' && (
            <div>
              {/* هدر نتیجه */}
              <div
                className={`relative rounded-3xl p-8 text-center text-white overflow-hidden mb-6 ${
                  score >= 60
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
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5">
                    {score >= 60 ? (
                      <Award className="w-10 h-10" />
                    ) : (
                      <AlertCircle className="w-10 h-10" />
                    )}
                  </div>

                  <h3 className="text-2xl font-black mb-2">
                    {score >= 60 ? '🎉 تبریک! قبول شدی' : 'متأسفانه قبول نشدی'}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {score >= 60
                      ? 'شما در این آزمون موفق شدید'
                      : 'نگران نباش، می‌تونی دوباره تلاش کنی'}
                  </p>

                  <div className="mt-6 inline-block px-8 py-4 bg-white/20 backdrop-blur rounded-3xl border border-white/30">
                    <div className="text-5xl font-black">
                      {toPersianNumber(score)}
                    </div>
                    <div className="text-xs mt-1 opacity-90">
                      امتیاز از ۱۰۰
                    </div>
                  </div>
                </div>
              </div>

              {/* آمار */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-teal-50 rounded-2xl p-4 text-center border border-teal-100">
                  <CheckCircle2 className="w-7 h-7 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-teal-700">
                    {toPersianNumber(correctCount)}
                  </div>
                  <div className="text-xs text-teal-600">صحیح</div>
                </div>
                <div className="bg-red-50 rounded-2xl p-4 text-center border border-red-100">
                  <XCircle className="w-7 h-7 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-red-700">
                    {toPersianNumber(wrongCount)}
                  </div>
                  <div className="text-xs text-red-600">غلط</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-200">
                  <AlertCircle className="w-7 h-7 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-600">
                    {toPersianNumber(unansweredCount)}
                  </div>
                  <div className="text-xs text-slate-500">بدون پاسخ</div>
                </div>
              </div>

              {/* بازبینی */}
              <div className="mb-6">
                <h4 className="text-lg font-black text-slate-800 mb-4">
                  بازبینی پاسخ‌ها
                </h4>

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
                            className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-black text-xs ${
                              isCorrect
                                ? 'bg-teal-500'
                                : isUnanswered
                                ? 'bg-slate-400'
                                : 'bg-red-500'
                            }`}
                          >
                            {toPersianNumber(idx + 1)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-800 mb-2 text-sm">
                              {q.question}
                            </p>
                            <div className="space-y-1 text-xs">
                              {isUnanswered ? (
                                <p className="text-slate-500">⚠️ بدون پاسخ</p>
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
                                    <strong>{q.options[userAnswer]}</strong>
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
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all min-w-[180px]"
                >
                  <RotateCcw className="w-5 h-5" />
                  آزمون مجدد
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-brand-800 text-brand-800 rounded-xl font-black hover:bg-brand-800 hover:text-white transition-all min-w-[180px]"
                >
                  <X className="w-5 h-5" />
                  بستن
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}