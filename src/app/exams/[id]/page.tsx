import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Award,
  Users,
  ClipboardList,
  PlayCircle,
  CheckCircle2,
  Target,
  TrendingUp,
  Sparkles,
  AlertCircle,
  Star,
  BarChart3,
  Zap,
  BookOpen,
  Trophy,
} from 'lucide-react';
import { exams, getExamBySlug, getRelatedExams } from '@/lib/data';
import { toPersianNumber, formatPrice } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

// ✅ برای Static Export
export function generateStaticParams() {
  return exams.map((exam) => ({
    id: exam.slug,
  }));
}

interface ExamDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExamDetailPage({
  params,
}: ExamDetailPageProps) {
  const { id } = await params;
  const exam = getExamBySlug(id);

  if (!exam) {
    notFound();
  }

  const relatedExams = getRelatedExams(exam, 3);

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
      shadow: 'shadow-blue-900/30',
      border: 'hover:border-blue-800 dark:hover:border-blue-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      gradient: 'from-teal-500 to-teal-700',
      shadow: 'shadow-teal-500/30',
      border: 'hover:border-teal-500 dark:hover:border-teal-300',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      gradient: 'from-orange-500 to-orange-700',
      shadow: 'shadow-orange-500/30',
      border: 'hover:border-orange-500 dark:hover:border-orange-300',
    },
  };

  const colors = colorMap[exam.color];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== Hero ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-blue-100 mb-8">
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
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* اطلاعات آزمون */}
            <FadeIn className="lg:col-span-2">
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                    {exam.typeLabel}
                  </span>
                  {exam.price === 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/90 rounded-full text-xs font-bold">
                      🎁 رایگان
                    </span>
                  )}
                  {exam.certificate && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/90 rounded-full text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      مدرک معتبر
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-6">
                  {exam.icon} {exam.title}
                </h1>

                <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
                  {exam.description}
                </p>

                {/* اطلاعات سریع */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ClipboardList className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">تعداد سوال</div>
                      <div className="font-black">
                        {toPersianNumber(exam.questions)} سوال
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">مدت زمان</div>
                      <div className="font-black">
                        {toPersianNumber(exam.duration)} دقیقه
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">شرکت‌کننده</div>
                      <div className="font-black">
                        {toPersianNumber(exam.participants)}+
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">امتیاز</div>
                      <div className="font-black">
                        {exam.rating.toLocaleString('fa-IR')} / ۵
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* کارت اقدام */}
            <FadeIn
              direction="left"
              delay={0.15}
              className="lg:sticky lg:top-24"
            >
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 lg:p-7">
                {/* قیمت */}
                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    هزینه آزمون
                  </div>
                  {exam.price === 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-black text-teal-600 dark:text-teal-400">
                        رایگان
                      </span>
                      <span className="px-2 py-0.5 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-black">
                        🎁
                      </span>
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-brand-800 dark:text-brand-300">
                      {formatPrice(exam.price)}
                    </div>
                  )}
                </div>

                {/* اطلاعات */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      سطح آزمون
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {exam.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      نرخ قبولی
                    </span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      {toPersianNumber(exam.successRate)}٪
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      مدرک
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {exam.certificate ? '✓ دارد' : '✗ ندارد'}
                    </span>
                  </div>
                </div>

                {/* دکمه شروع */}
                <Link
                  href={`/exams/${exam.slug}`}
                  className={cn(
                    'flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-white bg-gradient-to-l',
                    colors.gradient,
                    'hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3 mb-3'
                  )}
                >
                  <PlayCircle className="w-5 h-5" />
                  شروع آزمون
                </Link>

                <Link
                  href="/exams"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:gap-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  بازگشت به آزمون‌ها
                </Link>

                {/* مزایا */}
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    نتیجه آنی پس از پایان آزمون
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    پاسخ‌های تشریحی
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    امکان آزمون مجدد
                  </div>
                  {exam.certificate && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      صدور مدرک معتبر
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ستون چپ */}
            <div className="lg:col-span-2 space-y-6">
              {/* درباره آزمون */}
              <FadeIn>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-brand-800 dark:text-brand-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      درباره این آزمون
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {exam.longDescription}
                  </p>
                </div>
              </FadeIn>

              {/* نمونه سوالات */}
              <FadeIn delay={0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
                      <ClipboardList className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                        نمونه سوالات
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {toPersianNumber(exam.examData.questions.length)} سوال
                        نمونه از {toPersianNumber(exam.questions)} سوال
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {exam.examData.questions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-800 text-white flex items-center justify-center flex-shrink-0 text-sm font-black">
                            {toPersianNumber(idx + 1)}
                          </div>
                          <p className="font-bold text-slate-800 dark:text-slate-100 pt-1">
                            {q.question}
                          </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2 mr-11">
                          {q.options.map((opt, optIdx) => (
                            <div
                              key={optIdx}
                              className="text-sm text-slate-600 dark:text-slate-400 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800"
                            >
                              <span className="font-black text-brand-800 dark:text-brand-300 ml-1">
                                {['الف', 'ب', 'ج', 'د'][optIdx]}:
                              </span>
                              {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/20 border-r-4 border-orange-500 rounded-xl">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-orange-800 dark:text-orange-300">
                        این‌ها فقط نمونه سوالات هستند. برای دیدن همه سوالات و
                        شرکت در آزمون اصلی، روی دکمه «شروع آزمون» کلیک کنید.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* برچسب‌ها */}
              <FadeIn delay={0.15}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-5">
                    برچسب‌ها
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {exam.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-brand-50 dark:bg-brand-950/30 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold hover:bg-brand-100 dark:hover:bg-brand-950/50 transition cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ستون راست */}
            <div className="space-y-6">
              {/* آمار */}
              <FadeIn direction="left" delay={0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                    آمار آزمون
                  </h3>

                  <div className="space-y-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                      <div className="text-3xl font-black text-brand-800 dark:text-brand-300 mb-1">
                        {toPersianNumber(exam.participants)}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        نفر شرکت کرده‌اند
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-teal-50 dark:bg-teal-950/30 rounded-2xl">
                        <div className="text-xl font-black text-teal-600 dark:text-teal-400">
                          {toPersianNumber(exam.successRate)}٪
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          نرخ قبولی
                        </div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-2xl">
                        <div className="text-xl font-black text-orange-600 dark:text-orange-400">
                          {exam.rating.toLocaleString('fa-IR')}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          امتیاز
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* اطلاعات تکمیلی */}
              <FadeIn direction="left" delay={0.15}>
                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl shadow-lg p-6 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-orange-300" />
                      </div>
                      <h3 className="text-lg font-black">اطلاعات آزمون</h3>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-blue-200">نوع آزمون</span>
                        <span className="font-bold">{exam.typeLabel}</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-blue-200">سطح</span>
                        <span className="font-bold">{exam.level}</span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-blue-200">مدت</span>
                        <span className="font-bold">
                          {toPersianNumber(exam.duration)} دقیقه
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-200">سوالات</span>
                        <span className="font-bold">
                          {toPersianNumber(exam.questions)} سوال
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* CTA */}
              <FadeIn direction="left" delay={0.2}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center mb-4">
                    <Trophy className="w-7 h-7 text-orange-600 dark:text-orange-300" />
                  </div>
                  <h4 className="font-black text-slate-800 dark:text-slate-100 mb-2">
                    آماده‌ای شروع کنی؟
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    همین حالا آزمون رو شروع کن و خودت رو محک بزن
                  </p>
                  <Link
                    href={`/exams/${exam.slug}`}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-white bg-gradient-to-l',
                      colors.gradient,
                      'hover:shadow-lg transition-all hover:gap-3'
                    )}
                  >
                    <Zap className="w-4 h-4" />
                    شروع آزمون
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== آزمون‌های مشابه ===== */}
      {relatedExams.length > 0 && (
        <section className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                  🔗 آزمون‌های مشابه
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">
                  آزمون‌های مشابه
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  آزمون‌های مشابه که ممکن است به آن‌ها علاقه‌مند باشید
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedExams.map((related, idx) => {
                const relatedColors = colorMap[related.color];

                return (
                  <FadeIn
                    key={related.id}
                    delay={idx * 0.1}
                    direction="up"
                    className="h-full"
                  >
                    <Link
                      href={`/exams/${related.slug}`}
                      className={cn(
                        'group block h-full bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 overflow-hidden',
                        relatedColors.border,
                        'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300'
                      )}
                    >
                      <div className="p-6">
                        <div
                          className={cn(
                            'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl transition-transform group-hover:scale-110',
                            relatedColors.bg
                          )}
                        >
                          {related.icon}
                        </div>

                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                          {related.typeLabel}
                        </div>

                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition min-h-[3.5rem]">
                          {related.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                          {related.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <ClipboardList className="w-3.5 h-3.5" />
                              {toPersianNumber(related.questions)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {toPersianNumber(related.duration)}د
                            </div>
                          </div>
                          {related.price === 0 ? (
                            <span className="font-black text-teal-600 dark:text-teal-400">
                              رایگان
                            </span>
                          ) : (
                            <span className="font-black text-brand-800 dark:text-brand-300">
                              {formatPrice(related.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}