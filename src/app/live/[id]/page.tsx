import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  Calendar,
  Users,
  Radio,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  Award,
  Bell,
  BookOpen,
  Target,
  Video,
  GraduationCap,
} from 'lucide-react';
import {
  liveClasses,
  getLiveClassBySlug,
  getRelatedLiveClasses,
} from '@/lib/data';
import { toPersianNumber, formatPrice } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import LiveClassCard from '@/components/live/LiveClassCard';
import { cn } from '@/lib/utils';

// ✅ برای Static Export
export function generateStaticParams() {
  return liveClasses.map((live) => ({
    id: live.slug,
  }));
}

interface LiveClassDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LiveClassDetailPage({
  params,
}: LiveClassDetailPageProps) {
  const { id } = await params;
  const liveClass = getLiveClassBySlug(id);

  if (!liveClass) {
    notFound();
  }

  const relatedClasses = getRelatedLiveClasses(liveClass, 3);
  const percentage = Math.round(
    (liveClass.registered / liveClass.capacity) * 100
  );
  const isAlmostFull = percentage > 80;

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      gradient: 'from-teal-500 to-teal-700',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      gradient: 'from-orange-500 to-orange-700',
    },
  };

  const colors = colorMap[liveClass.color];

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

        {/* خطوط نوری */}
        <div className="absolute top-1/2 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-96 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-blue-100 mb-8 flex-wrap">
              <Link href="/" className="hover:text-white transition">
                خانه
              </Link>
              <span>/</span>
              <Link href="/live" className="hover:text-white transition">
                کلاس‌های آنلاین
              </Link>
              <span>/</span>
              <span className="text-white font-bold line-clamp-1">
                {liveClass.title}
              </span>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* آیکون بزرگ */}
            <FadeIn>
              <div className="relative">
                <div
                  className={cn(
                    'aspect-square rounded-3xl flex items-center justify-center text-[180px] shadow-2xl',
                    colors.bg
                  )}
                >
                  {liveClass.icon}
                </div>

                {/* برچسب زنده */}
                {liveClass.isLive && (
                  <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full text-sm font-black text-white shadow-lg animate-pulse">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                    </span>
                    در حال پخش
                  </div>
                )}

                {/* برچسب رایگان */}
                {liveClass.isFree && !liveClass.isLive && (
                  <div className="absolute top-6 right-6 px-4 py-2 bg-teal-500 rounded-full text-sm font-black text-white shadow-lg">
                    🎁 رایگان
                  </div>
                )}
              </div>
            </FadeIn>

            {/* اطلاعات */}
            <FadeIn delay={0.15}>
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold">
                    <Radio className="w-3.5 h-3.5 text-teal-400" />
                    کلاس آنلاین
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold">
                    <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                    سطح {liveClass.level}
                  </span>
                </div>

                <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-4">
                  {liveClass.title}
                </h1>

                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  {liveClass.description}
                </p>

                {/* اطلاعات سریع */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">تاریخ</div>
                      <div className="font-black text-sm">
                        {liveClass.day} - {liveClass.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">ساعت</div>
                      <div className="font-black text-sm">{liveClass.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                      <Video className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">مدت</div>
                      <div className="font-black text-sm">
                        {toPersianNumber(liveClass.duration)} ساعت
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">ظرفیت</div>
                      <div className="font-black text-sm">
                        {toPersianNumber(liveClass.registered)} /{' '}
                        {toPersianNumber(liveClass.capacity)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* استاد */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-brand-500 flex items-center justify-center text-white text-xl font-black shadow-lg">
                    {liveClass.instructor.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">مدرس</div>
                    <div className="font-black text-lg">
                      {liveClass.instructor}
                    </div>
                    <div className="text-sm text-blue-100">
                      {liveClass.instructorTitle}
                    </div>
                  </div>
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
              {/* درباره کلاس */}
              <FadeIn>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-brand-800 dark:text-brand-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      درباره این کلاس
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {liveClass.longDescription}
                  </p>
                </div>
              </FadeIn>

              {/* آنچه یاد می‌گیرید */}
              <FadeIn delay={0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
                      <Target className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      آنچه یاد می‌گیرید
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {liveClass.learnings.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/30 transition"
                      >
                        <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* برنامه جلسات */}
              <FadeIn delay={0.2}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                        برنامه جلسات
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {toPersianNumber(liveClass.sessions.length)} جلسه
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {liveClass.sessions.map((session, idx) => (
                      <div
                        key={session.id}
                        className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-800 to-teal-500 flex items-center justify-center text-white font-black flex-shrink-0">
                            {toPersianNumber(idx + 1)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-black text-slate-800 dark:text-slate-100 mb-1">
                              {session.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                              <span>👨‍🏫 {session.instructor}</span>
                              <span>
                                ⏱️ {toPersianNumber(session.duration)} دقیقه
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mr-13">
                          {session.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white dark:bg-slate-900 rounded-full text-xs text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* برچسب‌ها */}
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-2">
                  {liveClass.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-bold hover:border-brand-500 transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* ستون راست - کارت اقدام */}
            <div className="lg:col-span-1">
              <FadeIn direction="left" delay={0.15}>
                <div className="lg:sticky lg:top-24 space-y-4">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 p-6">
                    {/* قیمت */}
                    <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        هزینه شرکت
                      </div>
                      {liveClass.isFree ? (
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
                          {formatPrice(liveClass.price)}
                        </div>
                      )}
                    </div>

                    {/* اطلاعات */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          ظرفیت باقی‌مانده
                        </span>
                        <span
                          className={cn(
                            'font-bold',
                            isAlmostFull
                              ? 'text-orange-600 dark:text-orange-400'
                              : 'text-teal-600 dark:text-teal-400'
                          )}
                        >
                          {toPersianNumber(
                            liveClass.capacity - liveClass.registered
                          )}{' '}
                          نفر
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          وضعیت
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">
                          {liveClass.isLive
                            ? 'در حال پخش'
                            : 'پیش‌رو'}
                        </span>
                      </div>
                    </div>

                    {/* نوار ظرفیت */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-500 dark:text-slate-400">
                          ظرفیت
                        </span>
                        <span
                          className={cn(
                            'font-bold',
                            isAlmostFull
                              ? 'text-orange-600 dark:text-orange-400'
                              : 'text-teal-600 dark:text-teal-400'
                          )}
                        >
                          {toPersianNumber(percentage)}٪
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            isAlmostFull
                              ? 'bg-gradient-to-l from-orange-500 to-orange-600'
                              : 'bg-gradient-to-l from-teal-400 to-teal-500'
                          )}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* دکمه */}
                    {liveClass.isLive ? (
                      <button
                        className="w-full flex items-center justify-center gap-2 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black shadow-lg shadow-red-500/30 hover:shadow-xl transition-all hover:scale-[1.02] mb-3"
                      >
                        <Radio className="w-5 h-5" />
                        ورود به کلاس زنده
                      </button>
                    ) : liveClass.isFree ? (
                      <button
                        className={cn(
                          'w-full flex items-center justify-center gap-2 py-4 text-white rounded-xl font-black shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] mb-3 bg-gradient-to-l',
                          colors.gradient
                        )}
                      >
                        <PlayCircle className="w-5 h-5" />
                        ثبت‌نام رایگان
                      </button>
                    ) : (
                      <button
                        className={cn(
                          'w-full flex items-center justify-center gap-2 py-4 text-white rounded-xl font-black shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] mb-3 bg-gradient-to-l',
                          colors.gradient
                        )}
                      >
                        <PlayCircle className="w-5 h-5" />
                        ثبت‌نام در کلاس
                      </button>
                    )}

                    {/* یادآور */}
                    <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mb-6">
                      <Bell className="w-4 h-4" />
                      یادآوری
                    </button>

                    {/* مزایا */}
                    <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        شرکت در کلاس زنده
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        دسترسی به ویدیو ضبط‌شده
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        پرسش و پاسخ زنده
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        فایل‌های آموزشی
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== کلاس‌های مشابه ===== */}
      {relatedClasses.length > 0 && (
        <section className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                  🔗 کلاس‌های مشابه
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">
                  کلاس‌های مشابه
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  کلاس‌های مشابه که ممکن است به آن‌ها علاقه‌مند باشید
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedClasses.map((related) => (
                <LiveClassCard key={related.id} liveClass={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}