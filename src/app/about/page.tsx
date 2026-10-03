import Link from 'next/link';
import {
  Target,
  Users,
  Award,
  Heart,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  TrendingUp,
  BookOpen,
  Briefcase,
  Star,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { instructors, stats } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import InstructorCard from '@/components/shared/InstructorCard';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: GraduationCap,
    title: 'کیفیت آموزش',
    description:
      'ارائه آموزش‌های باکیفیت و به‌روز بر اساس نیازهای بازار کار روز',
    color: 'brand' as const,
  },
  {
    icon: Users,
    title: 'اساتید مجرب',
    description: 'اساتید حرفه‌ای با سال‌ها تجربه در تدریس و صنعت',
    color: 'teal' as const,
  },
  {
    icon: Heart,
    title: 'پشتیبانی قوی',
    description: 'تیم پشتیبانی ۲۴/۷ در کنار شما در تمام مراحل یادگیری',
    color: 'accent' as const,
  },
  {
    icon: Award,
    title: 'مدرک معتبر',
    description: 'صدور مدرک معتبر فنی و حرفه‌ای پس از اتمام دوره',
    color: 'brand' as const,
  },
];

const whyUs = [
  'آموزش عملی و پروژه‌محور',
  'دوره‌های حضوری، آنلاین و ترکیبی',
  'منابع آموزشی به‌روز و کاربردی',
  'امکان پرداخت اقساطی',
  'پشتیبانی مادام‌العمر',
  'شبکه‌سازی با هم‌کلاسی‌ها',
];

export default function AboutPage() {
  const topInstructors = instructors.slice(0, 4);

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      hoverBg: 'group-hover:bg-blue-800',
      hoverIcon: 'group-hover:text-white',
      border: 'hover:border-blue-800 dark:hover:border-blue-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      hoverBg: 'group-hover:bg-teal-500',
      hoverIcon: 'group-hover:text-white',
      border: 'hover:border-teal-500 dark:hover:border-teal-300',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      hoverBg: 'group-hover:bg-orange-500',
      hoverIcon: 'group-hover:text-white',
      border: 'hover:border-orange-500 dark:hover:border-orange-300',
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        {/* الگوی نقطه‌ای */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* افکت‌های تزئینی */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span>درباره سرآمد</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                درباره آموزشگاه سرآمد
              </h1>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                {SITE_CONFIG.slogan}
              </p>
            </div>
          </FadeIn>

          {/* آمار */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-2xl lg:text-3xl font-black text-white">
                    {toPersianNumber(stat.value)}
                    <span className="text-teal-400">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-blue-200 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== داستان ما ===== */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* متن */}
            <FadeIn direction="right">
              <div>
                <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                  📖 داستان ما
                </div>

                <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-6 leading-tight">
                  مسیر حرفه‌ای شدن از سرآمد شروع می‌شود
                </h2>

                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    آموزشگاه سرآمد، یک مجتمع آموزش فنی و حرفه‌ای در شهر تبریز
                    است که با هدف آموزش مهارت‌های کاربردی و آماده‌سازی افراد
                    برای ورود به بازار کار فعالیت می‌کند.
                  </p>
                  <p>
                    ما با بهره‌گیری از اساتید مجرب، تجهیزات مدرن و روش‌های
                    آموزشی نوین، دوره‌های حضوری، آنلاین و ترکیبی متنوعی را در
                    زمینه‌های مختلف فنی و حرفه‌ای ارائه می‌دهیم.
                  </p>
                  <p>
                    هدف ما این است که هر فرد، با هر سطح دانشی، بتواند مسیر
                    حرفه‌ای شدن خود را از سرآمد شروع کند و به هدف شغلی مورد
                    نظرش برسد.
                  </p>
                </div>

                {/* چرا ما */}
                <div className="mt-8">
                  <h3 className="font-black text-slate-800 dark:text-slate-100 mb-4">
                    چرا سرآمد را انتخاب کنیم؟
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {whyUs.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 group"
                      >
                        <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* کارت آماری تصویری */}
            <FadeIn direction="left" delay={0.15}>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl group">
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* افکت درخشش */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl group-hover:bg-teal-400/30 transition-colors" />

                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Sparkles className="w-10 h-10 text-teal-400" />
                    </div>

                    <h3 className="text-2xl font-black mb-4">
                      سرآمد در یک نگاه
                    </h3>

                    <p className="text-blue-100 leading-relaxed mb-8">
                      از شروع فعالیت تا امروز، همواره در تلاش بوده‌ایم که بهترین
                      آموزش‌ها را با کیفیت بالا و قیمت مناسب ارائه دهیم.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {stats.map((stat, index) => (
                        <div
                          key={index}
                          className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 transition-colors"
                        >
                          <div className="text-2xl font-black text-white">
                            {toPersianNumber(stat.value)}
                            <span className="text-teal-400">{stat.suffix}</span>
                          </div>
                          <div className="text-xs text-blue-200 mt-1">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* دایره‌های تزئینی */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -z-10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== ارزش‌های ما ===== */}
      <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                💎 ارزش‌های ما
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">
                چه چیزی ما را متمایز می‌کند؟
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                ارزش‌هایی که در سرآمد به آن‌ها پایبندیم
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colors = colorMap[value.color];

              return (
                <FadeIn
                  key={index}
                  delay={index * 0.1}
                  direction="up"
                  className="h-full"
                >
                  <div
                    className={cn(
                      'group h-full bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-800',
                      colors.border,
                      'hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
                    )}
                  >
                    <div
                      className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110',
                        colors.bg,
                        colors.hoverBg
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-7 h-7 transition-colors duration-300',
                          colors.icon,
                          colors.hoverIcon
                        )}
                      />
                    </div>
                    <h3 className="font-black text-slate-800 dark:text-slate-100 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== تیم ما ===== */}
      <section className="py-12 lg:py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                👨‍🏫 تیم ما
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">
                با بهترین اساتید یاد بگیر
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                اساتید مجرب و حرفه‌ای سرآمد، شما را در مسیر یادگیری همراهی
                می‌کنند
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topInstructors.map((instructor, index) => (
              <FadeIn
                key={instructor.id}
                delay={index * 0.1}
                direction="up"
                className="h-full"
              >
                <InstructorCard instructor={instructor} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="text-center mt-12">
              <Link
                href="/instructors"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 rounded-xl font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition-all hover:gap-3 group"
              >
                مشاهده همه اساتید
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
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
                  <Target className="w-10 h-10 text-teal-400" />
                </div>

                <h2 className="text-3xl lg:text-4xl font-black mb-4">
                  آماده‌ای مسیر حرفه‌ای شدن را شروع کنی؟
                </h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                  همین امروز ثبت‌نام کن و از مشاوره رایگان تیم سرآمد بهره‌مند
                  شو.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                  >
                    <BookOpen className="w-5 h-5" />
                    مشاهده دوره‌ها
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-xl font-bold transition"
                  >
                    <Target className="w-5 h-5" />
                    تماس با ما
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