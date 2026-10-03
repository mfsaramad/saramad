'use client';

import { useState } from 'react';
import {
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  X,
} from 'lucide-react';
import { courses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import MyCourseCard from '@/components/dashboard/MyCourseCard';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'active' | 'completed';

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // نمونه دیتا
  const myCourses = courses.slice(0, 5).map((course, idx) => ({
    course,
    progress: [65, 100, 30, 85, 45][idx] || 50,
    status: (idx === 1 ? 'completed' : 'active') as 'active' | 'completed',
  }));

  const filteredCourses = myCourses.filter((item) => {
    const matchTab = activeTab === 'all' || item.status === activeTab;
    const matchSearch =
      !searchQuery.trim() ||
      item.course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  const activeCount = myCourses.filter((c) => c.status === 'active').length;
  const completedCount = myCourses.filter(
    (c) => c.status === 'completed'
  ).length;

  const tabs = [
    {
      id: 'all' as FilterType,
      label: 'همه دوره‌ها',
      icon: '📚',
      count: myCourses.length,
    },
    {
      id: 'active' as FilterType,
      label: 'در حال یادگیری',
      icon: '📖',
      count: activeCount,
    },
    {
      id: 'completed' as FilterType,
      label: 'تمام‌شده',
      icon: '✅',
      count: completedCount,
    },
  ];

  const stats = [
    {
      icon: BookOpen,
      value: toPersianNumber(myCourses.length),
      label: 'کل دوره‌ها',
      color: 'brand' as const,
    },
    {
      icon: Clock,
      value: toPersianNumber(activeCount),
      label: 'در حال یادگیری',
      color: 'accent' as const,
    },
    {
      icon: CheckCircle2,
      value: toPersianNumber(completedCount),
      label: 'تمام‌شده',
      color: 'teal' as const,
    },
  ];

  const statColorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-300" />
              <span>دوره‌های من</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black mb-2">
              دوره‌های من 📚
            </h1>
            <p className="text-blue-100 text-sm lg:text-base">
              تمام دوره‌هایی که در سرآمد ثبت‌نام کرده‌ای، اینجا نمایش داده
              می‌شوند
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = statColorMap[stat.color];

          return (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center mb-3',
                    colors.bg
                  )}
                >
                  <Icon className={cn('w-5 h-5', colors.icon)} />
                </div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Search Bar */}
      <FadeIn delay={0.15}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در دوره‌های من..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-100 dark:border-slate-800 inline-flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all',
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-[10px]',
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                )}
              >
                {toPersianNumber(tab.count)}
              </span>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCourses.map((item, index) => (
            <FadeIn
              key={item.course.id}
              delay={index * 0.08}
              direction="up"
              className="h-full"
            >
              <MyCourseCard
                course={item.course}
                progress={item.progress}
                status={item.status}
              />
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
              دوره‌ای یافت نشد
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              فیلتر یا جستجوی خود را تغییر دهید
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition"
            >
              <X className="w-4 h-4" />
              پاک کردن فیلترها
            </button>
          </div>
        </FadeIn>
      )}
    </div>
  );
}