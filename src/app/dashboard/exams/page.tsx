'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  ArrowLeft,
  Sparkles,
  Zap,
  Target,
  Search,
  X,
  Loader2,
} from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import { toPersianNumber } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'passed' | 'failed';

interface OrderItem {
  id: string;
  type: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  userEmail?: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
}

interface Exam {
  id: string;
  slug: string;
  title: string;
  typeLabel?: string;
  duration?: number;
  questions?: number;
  [key: string]: any;
}

interface MyExam {
  exam: Exam;
  score: number; // فعلاً 0 (نتیجه ثبت نشده)
  correct: number;
  wrong: number;
  total: number;
  date: string;
  duration: number;
  status: 'passed' | 'failed' | 'not-taken';
}

export default function MyExamsPage() {
  const { user } = useAuth();
  const { data: allOrders, loading: ordersLoading } =
    useCollection<Order>('orders');
  const { data: allExams, loading: examsLoading } =
    useCollection<Exam>('exams');

  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // استخراج آزمون‌های خریداری‌شده کاربر
  const myExams: MyExam[] = (() => {
    if (!user) return [];

    // فیلتر سفارشات کاربر
    const userOrders = allOrders.filter(
      (o) => o.userId === user.id || o.userEmail === user.email
    );

    // استخراج آیتم‌های آزمون از سفارشات
    const examItems: { item: OrderItem; order: Order }[] = [];
    userOrders.forEach((order) => {
      order.items?.forEach((item) => {
        if (item.type === 'exam') {
          examItems.push({ item, order });
        }
      });
    });

    // match با exams
    const result: MyExam[] = [];
    examItems.forEach(({ item, order }) => {
      const found = allExams.find(
        (e) =>
          e.slug === item.id ||
          e.id === item.id ||
          e.title === item.title
      );

      if (found) {
        // جلوگیری از تکراری
        if (!result.some((r) => r.exam.id === found.id)) {
          result.push({
            exam: found,
            score: 0,
            correct: 0,
            wrong: 0,
            total: found.questions || 0,
            date: order.createdAt,
            duration: found.duration || 0,
            status: 'not-taken',
          });
        }
      }
    });

    return result;
  })();

  const passed = myExams.filter((e) => e.status === 'passed');
  const failed = myExams.filter((e) => e.status === 'failed');
  const notTaken = myExams.filter((e) => e.status === 'not-taken');

  const filteredExams = myExams.filter((exam) => {
    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'passed' && exam.status === 'passed') ||
      (activeTab === 'failed' && exam.status === 'failed');

    const matchSearch =
      !searchQuery.trim() ||
      exam.exam.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchTab && matchSearch;
  });

  const avgScore =
    passed.length + failed.length > 0
      ? Math.round(
          (passed.reduce((s, e) => s + e.score, 0) +
            failed.reduce((s, e) => s + e.score, 0)) /
            (passed.length + failed.length)
        )
      : 0;

  const tabs = [
    {
      id: 'all' as FilterType,
      label: 'همه آزمون‌ها',
      icon: '📋',
      count: myExams.length,
    },
    {
      id: 'passed' as FilterType,
      label: 'قبول',
      icon: '✅',
      count: passed.length,
    },
    {
      id: 'failed' as FilterType,
      label: 'رد',
      icon: '❌',
      count: failed.length,
    },
  ];

  const stats = [
    {
      icon: ClipboardList,
      value: toPersianNumber(myExams.length),
      label: 'کل آزمون‌ها',
      color: 'brand' as const,
    },
    {
      icon: CheckCircle2,
      value: toPersianNumber(passed.length),
      label: 'قبول',
      color: 'teal' as const,
    },
    {
      icon: XCircle,
      value: toPersianNumber(failed.length),
      label: 'رد',
      color: 'red' as const,
    },
    {
      icon: TrendingUp,
      value: toPersianNumber(avgScore) + '٪',
      label: 'میانگین امتیاز',
      color: 'accent' as const,
    },
  ];

  const statColorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
    },
    red: {
      bg: 'bg-red-100 dark:bg-red-950/50',
      icon: 'text-red-600 dark:text-red-300',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
    },
  };

  const loading = ordersLoading || examsLoading || !mounted;

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
              <span>آزمون‌های من</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black mb-2">
              آزمون‌های من 📋
            </h1>
            <p className="text-blue-100 text-sm lg:text-base">
              نتایج آزمون‌های آنلاین سرآمد و پیشرفت تحصیلی خود را اینجا ببین
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = statColorMap[stat.color];

          return (
            <FadeIn key={index} delay={index * 0.08}>
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
              placeholder="جستجو در آزمون‌های من..."
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

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredExams.length > 0 ? (
        <div className="space-y-3">
          {filteredExams.map((exam, index) => {
            const isPassed = exam.status === 'passed';
            const isNotTaken = exam.status === 'not-taken';

            return (
              <FadeIn key={exam.exam.id} delay={index * 0.08} direction="up">
                <div
                  className={cn(
                    'group bg-white dark:bg-slate-900 rounded-2xl border-2 p-5 transition-all hover:shadow-lg hover:-translate-y-1',
                    isNotTaken
                      ? 'border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700'
                      : isPassed
                      ? 'border-teal-100 dark:border-teal-900/50 hover:border-teal-300 dark:hover:border-teal-700'
                      : 'border-red-100 dark:border-red-900/50 hover:border-red-300 dark:hover:border-red-700'
                  )}
                >
                  <div className="flex items-start gap-4 flex-wrap">
                    {/* Icon */}
                    <div
                      className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform',
                        isNotTaken
                          ? 'bg-blue-100 dark:bg-blue-950/50'
                          : isPassed
                          ? 'bg-teal-100 dark:bg-teal-950/50'
                          : 'bg-red-100 dark:bg-red-950/50'
                      )}
                    >
                      {isNotTaken ? '📝' : isPassed ? '✅' : '❌'}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-slate-800 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                        {exam.exam.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {exam.date}
                        </div>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <div className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" />
                          {toPersianNumber(exam.duration)} دقیقه
                        </div>
                        {exam.exam.typeLabel && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                            <div>{exam.exam.typeLabel}</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {isNotTaken ? (
                        <Link
                          href={`/exams/${exam.exam.slug}`}
                          className="px-4 py-2 rounded-xl bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white text-xs font-black hover:shadow-lg transition"
                        >
                          شرکت در آزمون
                        </Link>
                      ) : (
                        <>
                          <div className="text-center">
                            <div
                              className={cn(
                                'text-3xl font-black',
                                isPassed
                                  ? 'text-teal-600 dark:text-teal-300'
                                  : 'text-red-600 dark:text-red-300'
                              )}
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

                          <div
                            className={cn(
                              'px-3 py-1.5 rounded-full text-xs font-black',
                              isPassed
                                ? 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300'
                                : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300'
                            )}
                          >
                            {isPassed ? 'قبول' : 'رد'}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      ) : (
        <FadeIn>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
              {myExams.length === 0
                ? 'هنوز آزمونی نخریده‌اید'
                : 'آزمونی یافت نشد'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {myExams.length === 0
                ? 'برای شروع، یکی از آزمون‌های سرآمد را خریداری کنید'
                : 'فیلتر یا جستجوی خود را تغییر دهید'}
            </p>
            {myExams.length === 0 ? (
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition hover:gap-3"
              >
                مشاهده آزمون‌ها
                <ArrowLeft className="w-4 h-4" />
              </Link>
            ) : (
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
            )}
          </div>
        </FadeIn>
      )}

      {/* CTA */}
      {filteredExams.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                  <Target className="w-7 h-7 text-orange-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">
                    آزمون‌های جدید را از دست نده
                  </h3>
                  <p className="text-sm text-blue-100">
                    آزمون‌های تازه سرآمد را ببین و مسیر یادگیری‌ت رو ادامه بده
                  </p>
                </div>
              </div>

              <Link
                href="/exams"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-800 rounded-xl font-black hover:bg-blue-50 transition-all hover:gap-3"
              >
                <Award className="w-4 h-4" />
                مشاهده آزمون‌ها
              </Link>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}