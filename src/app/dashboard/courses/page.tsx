'use client';

import { useState } from 'react';
import { BookOpen, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { courses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import MyCourseCard from '@/components/dashboard/MyCourseCard';

type FilterType = 'all' | 'active' | 'completed';

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');

  // نمونه دیتا (بعداً از بک‌اند میاد)
  const myCourses = courses.slice(0, 5).map((course, idx) => ({
    course,
    progress: [65, 100, 30, 85, 45][idx] || 50,
    status: (idx === 1 ? 'completed' : 'active') as 'active' | 'completed',
  }));

  const filteredCourses = myCourses.filter((item) => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  const activeCount = myCourses.filter((c) => c.status === 'active').length;
  const completedCount = myCourses.filter(
    (c) => c.status === 'completed'
  ).length;

  const tabs = [
    { id: 'all' as FilterType, label: 'همه دوره‌ها', icon: '📚', count: myCourses.length },
    { id: 'active' as FilterType, label: 'در حال یادگیری', icon: '📖', count: activeCount },
    { id: 'completed' as FilterType, label: 'تمام‌شده', icon: '✅', count: completedCount },
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
              <BookOpen className="w-6 h-6 text-teal-300" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-black">دوره‌های من</h1>
          </div>
          <p className="text-blue-100 text-sm lg:text-base">
            تمام دوره‌هایی که در سرآمد ثبت‌نام کرده‌ای، اینجا نمایش داده می‌شوند
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-800 dark:text-blue-300" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              کل دوره‌ها
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {toPersianNumber(myCourses.length)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-300" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              در حال یادگیری
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {toPersianNumber(activeCount)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-300" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              تمام‌شده
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {toPersianNumber(completedCount)}
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

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCourses.map((item) => (
            <MyCourseCard
              key={item.course.id}
              course={item.course}
              progress={item.progress}
              status={item.status}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
            دوره‌ای در این دسته نیست
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            دسته‌بندی دیگری را انتخاب کنید
          </p>
        </div>
      )}
    </div>
  );
}