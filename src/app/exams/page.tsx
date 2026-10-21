'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Clock,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  ClipboardList,
  Sparkles,
  PlayCircle,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toPersianNumber, formatPrice } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'free' | 'level' | 'mock';

const tabs: { id: FilterType; label: string; icon: string }[] = [
  { id: 'all', label: 'همه آزمون‌ها', icon: '📌' },
  { id: 'free', label: 'رایگان', icon: '🎁' },
  { id: 'level', label: 'تعیین سطح', icon: '🎯' },
  { id: 'mock', label: 'آزمایشی', icon: '📋' },
];

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const mapped = data.map((e: any) => ({
            ...e,
            questions: e.questions_count,
            examData: e.exam_data,
          }));
          setExams(mapped);
        }
      } catch (err) {
        console.error('خطا در دریافت آزمون‌ها:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExams();
  }, []);

  const filteredExams = useMemo(() => {
    if (activeTab === 'all') return exams;
    return exams.filter((e) => e.type === activeTab);
  }, [exams, activeTab]);

  const handleOpenExam = (exam: any) => {
    if (exam.price === 0) {
      window.location.href = `/exams/${exam.slug}/take`;
      return;
    }
    window.location.href = `/exams/${exam.slug}`;
  };

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
      hoverBorder: 'hover:border-blue-800 dark:hover:border-blue-300',
      shadow: 'shadow-blue-900/30',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      gradient: 'from-teal-500 to-teal-700',
      hoverBorder: 'hover:border-teal-500 dark:hover:border-teal-300',
      shadow: 'shadow-teal-500/30',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      gradient: 'from-orange-500 to-orange-700',
      hoverBorder: 'hover:border-orange-500 dark:hover:border-orange-300',
      shadow: 'shadow-orange-500/30',
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 text-brand-800 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span>آزمون‌های آنلاین سرآمد</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">خودت را محک بزن!</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              با آزمون‌های آنلاین سرآمد، سطح دانش خود را بسنج و مسیر پیشرفتت را هموار کن
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3"><ClipboardList className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" /></div>
                <div className="text-2xl lg:text-3xl font-black text-white">{toPersianNumber(exams.length)}</div>
                <div className="text-xs text-blue-200 mt-1">آزمون آنلاین</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3"><TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" /></div>
                <div className="text-2xl lg:text-3xl font-black text-white">۱۵,۰۰۰+</div>
                <div className="text-xs text-blue-200 mt-1">شرکت‌کننده</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 transition-all">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3"><CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" /></div>
                <div className="text-2xl lg:text-3xl font-black text-white">۹۸٪</div>
                <div className="text-xs text-blue-200 mt-1">رضایت</div>
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

          {filteredExams.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam, index) => {
                const colors = colorMap[exam.color as keyof typeof colorMap] || colorMap.brand;

                return (
                  <FadeIn key={exam.id} delay={index * 0.1} direction="up" className="h-full">
                    <div className={cn('group relative h-full bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800', colors.hoverBorder, 'hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden')}>
                      <div className="p-7 pb-5">
                        <div className="flex items-start justify-between mb-5">
                          <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6', colors.bg)}>
                            {exam.icon}
                          </div>
                          {exam.price === 0 ? (
                            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-black">🎁 رایگان</span>
                          ) : (
                            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 rounded-full text-xs font-black">{formatPrice(exam.price)}</span>
                          )}
                        </div>
                        <div className="text-xs font-bold text-brand-700 dark:text-brand-300 mb-2">{exam.type_label}</div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">{exam.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">{exam.description}</p>
                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-1"><ClipboardList className="w-3.5 h-3.5 text-brand-700 dark:text-brand-300" /><span>{toPersianNumber(exam.questions_count)} سوال</span></div>
                          <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-700 dark:text-brand-300" /><span>{toPersianNumber(exam.duration)} دقیقه</span></div>
                          <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-brand-700 dark:text-brand-300" /><span>{toPersianNumber(exam.participants)}</span></div>
                        </div>
                      </div>
                      <div className="px-7 pb-7 pt-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1 text-xs"><Award className="w-3.5 h-3.5 text-yellow-500" /><span className="font-bold text-slate-700 dark:text-slate-300">{exam.rating?.toLocaleString('fa-IR') || '۵'}</span></div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">سطح: {exam.level}</div>
                        </div>
                        <button onClick={() => handleOpenExam(exam)} className={cn('flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-l', colors.gradient, 'hover:shadow-lg transition-all hover:gap-3')}>
                          <PlayCircle className="w-4 h-4" />
                          {exam.price === 0 ? 'شروع آزمون رایگان' : 'مشاهده و خرید'}
                        </button>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">آزمونی یافت نشد</h3>
              <button onClick={() => setActiveTab('all')} className="px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition mt-4">نمایش همه آزمون‌ها</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}