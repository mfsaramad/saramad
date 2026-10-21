'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  Trophy,
  TrendingUp,
  Eye,
  FileText,
  Clock,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toPersianNumber } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface OrderItem {
  id: string;
  type: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  order_number: string;
  user_id: string;
  items: OrderItem[];
  status: string;
  created_at: string;
}

interface ExamResult {
  id: string;
  user_id: string;
  exam_slug: string;
  exam_title: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  status: string; // 'passed' | 'failed'
  created_at: string;
}

interface Certificate {
  id: string;
  title: string;
  instructor: string;
  date: string;
  code: string;
  duration: number;
  grade: string;
  gradeColor: 'teal' | 'brand' | 'accent';
  type: 'exam' | 'course';
  score?: number;
}

function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    const year = date.getFullYear() - 621;
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  } catch {
    return isoDate;
  }
}

export default function CertificatesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchCertificates = async () => {
      setLoading(true);
      const result: Certificate[] = [];

      try {
        // ۱. دریافت نتایج قبول‌شده آزمون‌ها از دیتابیس
        const { data: examResults, error: examError } = await supabase
          .from('exam_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'passed')
          .order('created_at', { ascending: false });

        if (examError) throw examError;

        if (examResults) {
          examResults.forEach((res: ExamResult, idx: number) => {
            result.push({
              id: `exam-${res.id}`,
              title: `گواهی‌نامه ${res.exam_title}`,
              instructor: 'آموزشگاه سرآمد',
              date: formatDate(res.created_at),
              code: `SRM-EX-${formatDate(res.created_at).split('/')[0]}-${String(idx + 1).padStart(3, '0')}`,
              duration: 0,
              grade: res.score >= 90 ? 'عالی' : res.score >= 75 ? 'خوب' : 'قبول',
              gradeColor: res.score >= 90 ? 'teal' : 'brand',
              type: 'exam',
              score: res.score,
            });
          });
        }

        // ۲. دریافت سفارشات تکمیل‌شده (برای گواهی دوره‌ها)
        const { data: orders, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('created_at', { ascending: false });

        if (orderError) throw orderError;

        if (orders) {
          orders.forEach((order: Order) => {
            const items = order.items || [];
            items.forEach((item) => {
              if (item.type === 'course') {
                // جلوگیری از تکراری بودن عنوان دوره
                if (!result.some((c) => c.title.includes(item.title))) {
                  result.push({
                    id: `course-${order.id}-${item.id}`,
                    title: `گواهی‌نامه ${item.title}`,
                    instructor: 'آموزشگاه سرآمد',
                    date: formatDate(order.created_at),
                    code: `SRM-CO-${formatDate(order.created_at).split('/')[0]}-${String(result.length + 1).padStart(3, '0')}`,
                    duration: 60,
                    grade: 'قبول',
                    gradeColor: 'brand',
                    type: 'course',
                  });
                }
              }
            });
          });
        }

        setCertificates(result);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [user]);

  const gradeMap = {
    teal: 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900/50',
    brand:
      'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
    accent:
      'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/50',
  };

  const lastDate = certificates.length > 0 ? certificates[0].date : '—';

  const stats = [
    {
      icon: Award,
      value: toPersianNumber(certificates.length),
      label: 'کل مدارک',
      color: 'accent' as const,
    },
    {
      icon: Trophy,
      value: toPersianNumber(
        certificates.filter((c) => c.type === 'exam').length
      ),
      label: 'مدارک آزمون',
      color: 'teal' as const,
    },
    {
      icon: Calendar,
      value: lastDate,
      label: 'آخرین مدرک',
      color: 'brand' as const,
    },
  ];

  const statColorMap = {
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
    },
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
    },
  };

  const pageLoading = loading || authLoading;

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
              <span>مدارک من</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black mb-2">
              مدارک من 🏆
            </h1>
            <p className="text-blue-100 text-sm lg:text-base">
              مدارک معتبر دوره‌های آموزشی که با موفقیت به پایان رسانده‌اید
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="text-xl lg:text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">
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

      {/* Loading */}
      {pageLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1} direction="up">
              <div className="group bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className="p-5 lg:p-6">
                  <div className="flex items-start gap-4 flex-wrap">
                    {/* Icon */}
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      <Award className="w-8 h-8 lg:w-10 lg:h-10" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-black border',
                            gradeMap[cert.gradeColor]
                          )}
                        >
                          نمره: {cert.grade}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          کد: {cert.code}
                        </span>
                        {cert.score !== undefined && (
                          <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/50 rounded-full text-xs font-bold text-teal-700 dark:text-teal-300">
                            امتیاز: {toPersianNumber(cert.score)}٪
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg lg:text-xl font-black text-slate-800 dark:text-slate-100 mb-3 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                        {cert.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span>👨‍🏫</span>
                          <span>{cert.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{cert.date}</span>
                        </div>
                        {cert.duration > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{toPersianNumber(cert.duration)} ساعت</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => alert('به‌زودی: دانلود PDF')}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all hover:gap-3"
                      >
                        <Download className="w-4 h-4" />
                        دانلود PDF
                      </button>
                      <button
                        onClick={() => alert('به‌زودی: اشتراک‌گذاری')}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert('به‌زودی: مشاهده')}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Verification */}
                  <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-bold">
                        این مدرک تأیید شده و دارای اعتبار رسمی است
                      </span>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-800 dark:text-brand-300 hover:underline"
                    >
                      استعلام مدرک
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
              هنوز مدرکی نداری
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              با تکمیل دوره‌های آموزشی و قبولی در آزمون‌ها، مدرک معتبر دریافت کن
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition hover:gap-3"
              >
                مشاهده دوره‌ها
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                شرکت در آزمون
              </Link>
            </div>
          </div>
        </FadeIn>
      )}

      {/* CTA */}
      {certificates.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-orange-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">
                    مدرک بیشتری می‌خوای؟
                  </h3>
                  <p className="text-sm text-blue-100">
                    دوره‌های جدید سرآمد رو ببین و مدرک معتبر دریافت کن
                  </p>
                </div>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-800 rounded-xl font-black hover:bg-blue-50 transition-all hover:gap-3"
              >
                <Award className="w-4 h-4" />
                مشاهده دوره‌ها
              </Link>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}