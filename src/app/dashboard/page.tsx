'use client';

import { BookOpen, ClipboardList, Award, TrendingUp, Clock, Zap } from 'lucide-react';
import { courses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import StatsCard from '@/components/dashboard/StatsCard';
import MyCourseCard from '@/components/dashboard/MyCourseCard';

export default function DashboardPage() {
  // نمونه دیتا (بعداً از بک‌اند میاد)
  const myCourses = courses.slice(0, 3).map((course, idx) => ({
    course,
    progress: [65, 100, 30][idx] || 50,
    status: idx === 1 ? ('completed' as const) : ('active' as const),
  }));

  const recentExams = [
    {
      title: 'آزمون تعیین سطح برنامه‌نویسی',
      score: 85,
      date: '۱۴۰۴/۰۷/۱۵',
      passed: true,
    },
    {
      title: 'آزمون مهارت‌های کامپیوتری',
      score: 92,
      date: '۱۴۰۴/۰۷/۱۰',
      passed: true,
    },
    {
      title: 'آزمون آزمایشی فنی و حرفه‌ای',
      score: 55,
      date: '۱۴۰۴/۰۷/۰۵',
      passed: false,
    },
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
          <h1 className="text-2xl lg:text-3xl font-black mb-2">
            سلام، خوش آمدی! 👋
          </h1>
          <p className="text-blue-100 text-sm lg:text-base">
            به پنل کاربری سرآمد خوش آمدی. اینجا می‌تونی دوره‌ها، آزمون‌ها و مدارکت
            رو مدیریت کنی.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={BookOpen}
          label="دوره‌های فعال"
          value={toPersianNumber(2)}
          color="brand"
        />
        <StatsCard
          icon={ClipboardList}
          label="آزمون‌های انجام‌شده"
          value={toPersianNumber(3)}
          color="teal"
          trend="+۱ این ماه"
        />
        <StatsCard
          icon={Award}
          label="مدارک کسب‌شده"
          value={toPersianNumber(1)}
          color="accent"
        />
        <StatsCard
          icon={TrendingUp}
          label="میانگین امتیاز"
          value="۷۸٪"
          color="purple"
          trend="+۵٪"
        />
      </div>

      {/* My Courses */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-brand-800 dark:text-brand-300" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-black text-slate-800 dark:text-slate-100">
                دوره‌های من
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {toPersianNumber(myCourses.length)} دوره
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {myCourses.map((item) => (
            <MyCourseCard
              key={item.course.id}
              course={item.course}
              progress={item.progress}
              status={item.status}
            />
          ))}
        </div>
      </div>

      {/* Recent Exams */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-teal-600 dark:text-teal-300" />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-black text-slate-800 dark:text-slate-100">
              آخرین آزمون‌های من
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ۳ آزمون اخیر
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {recentExams.map((exam, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                  exam.passed
                    ? 'bg-teal-100 dark:bg-teal-950/50'
                    : 'bg-red-100 dark:bg-red-950/50'
                }`}
              >
                {exam.passed ? '✅' : '❌'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1 mb-1">
                  {exam.title}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {exam.date}
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    امتیاز: {toPersianNumber(exam.score)}
                  </div>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-black flex-shrink-0 ${
                  exam.passed
                    ? 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300'
                    : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300'
                }`}
              >
                {exam.passed ? 'قبول' : 'مردود'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}