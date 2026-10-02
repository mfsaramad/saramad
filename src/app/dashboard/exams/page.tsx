'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import { toPersianNumber } from '@/lib/format';

type FilterType = 'all' | 'passed' | 'failed';

const myExams = [
  {
    id: '1',
    title: 'آزمون تعیین سطح برنامه‌نویسی',
    score: 85,
    correct: 17,
    wrong: 3,
    total: 20,
    date: '۱۴۰۴/۰۷/۱۵',
    duration: 35,
  },
  {
    id: '2',
    title: 'آزمون مهارت‌های کامپیوتری',
    score: 92,
    correct: 23,
    wrong: 2,
    total: 25,
    date: '۱۴۰۴/۰۷/۱۰',
    duration: 28,
  },
  {
    id: '3',
    title: 'آزمون آزمایشی فنی و حرفه‌ای',
    score: 55,
    correct: 33,
    wrong: 27,
    total: 60,
    date: '۱۴۰۴/۰۷/۰۵',
    duration: 85,
  },
  {
    id: '4',
    title: 'آزمون تعیین سطح زبان انگلیسی',
    score: 78,
    correct: 31,
    wrong: 9,
    total: 40,
    date: '۱۴۰۴/۰۶/۲۸',
    duration: 42,
  },
  {
    id: '5',
    title: 'آزمون پایانی دوره حسابداری',
    score: 45,
    correct: 22,
    wrong: 28,
    total: 50,
    date: '۱۴۰۴/۰۶/۲۰',
    duration: 70,
  },
];

export default function MyExamsPage() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');

  const passed = myExams.filter((e) => e.score >= 60);
  const failed = myExams.filter((e) => e.score < 60);

  const filteredExams = myExams.filter((exam) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'passed') return exam.score >= 60;
    return exam.score < 60;
  });

  const avgScore = Math.round(
    myExams.reduce((sum, e) => sum + e.score, 0) / myExams.length
  );

  const tabs = [
    { id: 'all' as FilterType, label: 'همه آزمون‌ها', icon: '📝', count: myExams.length },
    { id: 'passed' as FilterType, label: 'قبول', icon: '✅', count: passed.length },
    { id: 'failed' as FilterType, label: 'مردود', icon: '❌', count: failed.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-teal-300" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-black">آزمون‌های من</h1>
          </div>
          <p className="text-blue-100 text-sm lg:text-base">
            نتایج آزمون‌های آنلاین سرآمد و پیشرفت تحصیلی خودت رو اینجا ببین
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-800 dark:text-blue-300" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              کل آزمون‌ها
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {toPersianNumber(myExams.length)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-300" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              قبول
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {toPersianNumber(passed.length)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-300" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              مردود
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {toPersianNumber(failed.length)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-300" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              میانگین امتیاز
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {toPersianNumber(avgScore)}٪
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-100 dark:border-slate-800 inline-flex flex-wrap gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {toPersianNumber(tab.count)}
            </span>
          </button>
        ))}
      </div>

      {/* Exams List */}
      <div className="space-y-3">
        {filteredExams.map((exam) => {
          const isPassed = exam.score >= 60;

          return (
            <div
              key={exam.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4 flex-wrap">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    isPassed
                      ? 'bg-teal-100 dark:bg-teal-950/50'
                      : 'bg-red-100 dark:bg-red-950/50'
                  }`}
                >
                  {isPassed ? '✅' : '❌'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-slate-800 dark:text-slate-100 mb-2 line-clamp-2">
                    {exam.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {exam.date}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {toPersianNumber(exam.duration)} دقیقه
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-black ${
                        isPassed
                          ? 'text-teal-600 dark:text-teal-300'
                          : 'text-red-600 dark:text-red-300'
                      }`}
                    >
                      {toPersianNumber(exam.score)}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      امتیاز
                    </div>
                  </div>

                  <div className="hidden sm:block text-center">
                    <div className="text-lg font-black text-slate-700 dark:text-slate-300">
                      {toPersianNumber(exam.correct)}/
                      {toPersianNumber(exam.total)}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      صحیح
                    </div>
                  </div>

                  <div className="hidden md:block text-center">
                    <div className="text-lg font-black text-slate-700 dark:text-slate-300">
                      {toPersianNumber(exam.wrong)}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      غلط
                    </div>
                  </div>

                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-black ${
                      isPassed
                        ? 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300'
                        : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {isPassed ? 'قبول' : 'مردود'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredExams.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
            آزمونی در این دسته نیست
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            برای شرکت در آزمون جدید، به صفحه آزمون‌ها برو
          </p>
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            مشاهده آزمون‌ها
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}