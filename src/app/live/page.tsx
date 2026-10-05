'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Radio,
  Video,
  Bell,
  Calendar,
  Sparkles,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { liveClasses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import LiveClassCard from '@/components/live/LiveClassCard';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'live' | 'upcoming';

const weeklySchedule = [
  { day: 'شنبه', count: 2, color: 'brand' },
  { day: 'یکشنبه', count: 1, color: 'teal' },
  { day: 'دوشنبه', count: 3, color: 'accent' },
  { day: 'سه‌شنبه', count: 1, color: 'brand' },
  { day: 'چهارشنبه', count: 2, color: 'teal' },
  { day: 'پنجشنبه', count: 2, color: 'accent' },
  { day: 'جمعه', count: 0, color: 'brand' },
];

export default function LivePage() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');

  const filteredClasses = useMemo(() => {
    if (activeTab === 'all') return liveClasses;
    if (activeTab === 'live') return liveClasses.filter((c) => c.isLive);
    return liveClasses.filter((c) => !c.isLive);
  }, [activeTab]);

  const tabs = [
    { id: 'all' as FilterType, label: 'همه کلاس‌ها', icon: '🎥' },
    { id: 'live' as FilterType, label: 'در حال پخش', icon: '🔴' },
    { id: 'upcoming' as FilterType, label: 'پیش‌رو', icon: '📅' },
  ];

  const liveCount = liveClasses.filter((c) => c.isLive).length;
  const upcomingCount = liveClasses.filter((c) => !c.isLive).length;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="absolute top-1/2 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-96 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-8 justify-center flex-wrap">
              <Link href="/" className="hover:text-white transition">
                خانه
              </Link>
              <span>/</span>
              <span className="text-white font-bold">کلاس‌های آنلاین</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span>کلاس‌های آنلاین زنده</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                کلاس‌های زنده و کارگاه‌های آنلاین
              </h1>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                در کلاس‌های زنده سرآمد شرکت کن، سؤال بپرس و از هر جای ایران یاد
                بگیر
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  {toPersianNumber(liveClasses.length)}
                </div>
                <div className="text-xs text-blue-200 mt-1">کلاس فعال</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                {liveCount > 0 && (
                  <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
                )}
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Radio className="w-5 h-5 lg:w-6 lg:h-6 text-red-400" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-black text-white">
                    {toPersianNumber(liveCount)}
                  </div>
                  <div className="text-xs text-blue-200 mt-1">در حال پخش</div>
                </div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-orange-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  {toPersianNumber(upcomingCount)}
                </div>
                <div className="text-xs text-blue-200 mt-1">پیش‌رو</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                      activeTab === tab.id
                        ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    )}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {filteredClasses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((liveClass) => (
                <LiveClassCard key={liveClass.id} liveClass={liveClass} />
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
                  کلاسی یافت نشد
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  فیلتر دیگری را انتخاب کنید
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ===== برنامه هفتگی ===== */}
      <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                📅 برنامه هفتگی
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">
                برنامه کلاس‌های هفته
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                برنامه کلاس‌های زنده در طول هفته
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklySchedule.map((item, index) => {
              const colorClasses = {
                brand:
                  'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50',
                teal: 'bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900/50 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-950/50',
                accent:
                  'bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900/50 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-950/50',
              }[item.color as 'brand' | 'teal' | 'accent'];

              return (
                <FadeIn key={index} delay={index * 0.05} direction="up">
                  <div
                    className={cn(
                      'rounded-2xl border-2 p-4 text-center transition-all duration-300 hover:scale-105 cursor-pointer',
                      colorClasses
                    )}
                  >
                    <div className="font-black text-sm mb-2">{item.day}</div>
                    <div className="text-3xl font-black mb-1">
                      {toPersianNumber(item.count)}
                    </div>
                    <div className="text-[10px] opacity-70">کلاس</div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 lg:p-14 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-teal-400" />
                </div>

                <h2 className="text-3xl lg:text-4xl font-black mb-4">
                  نمی‌خوای کلاس‌ها رو از دست بدی؟
                </h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                  با عضویت در کانال تلگرام، از تمام کلاس‌های زنده با خبر شو
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://t.me/saramad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                  >
                    <Zap className="w-5 h-5" />
                    عضویت در کانال تلگرام
                  </a>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-xl font-bold transition"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    مشاهده دوره‌ها
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}