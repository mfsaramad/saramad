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
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { instructors, stats } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import InstructorCard from '@/components/shared/InstructorCard';

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
    description:
      'اساتید حرفه‌ای با سال‌ها تجربه در تدریس و صنعت',
    color: 'teal' as const,
  },
  {
    icon: Heart,
    title: 'پشتیبانی قوی',
    description:
      'تیم پشتیبانی ۲۴/۷ در کنار شما در تمام مراحل یادگیری',
    color: 'accent' as const,
  },
  {
    icon: Award,
    title: 'مدرک معتبر',
    description:
      'صدور مدرک معتبر فنی و حرفه‌ای پس از اتمام دوره',
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
      bg: 'bg-blue-100',
      icon: 'text-blue-800',
    },
    teal: {
      bg: 'bg-teal-100',
      icon: 'text-teal-600',
    },
    accent: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-100 mb-8 justify-center">
            <Link href="/" className="hover:text-white transition">
              خانه
            </Link>
            <span>/</span>
            <span className="text-white font-bold">درباره ما</span>
          </div>

          <div className="text-center">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
              ℹ️ درباره سرآمد
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              درباره آموزشگاه سرآمد
            </h1>

            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {SITE_CONFIG.slogan}
            </p>
          </div>
        </div>
      </section>

      {/* ===== داستان ما ===== */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* متن */}
            <div>
              <div className="inline-block px-4 py-1.5 bg-brand-100 text-brand-800 rounded-full text-sm font-bold mb-4">
                📖 داستان ما
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mb-6 leading-tight">
                مسیر حرفه‌ای شدن از سرآمد شروع می‌شود
              </h2>

              <div className="space-y-4 text-slate-600 leading-relaxed">
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
                <h3 className="font-black text-slate-800 mb-4">
                  چرا سرآمد را انتخاب کنیم؟
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {whyUs.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* کارت آماری تصویری */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6">
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
                        className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 text-center"
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
          </div>
        </div>
      </section>

      {/* ===== ارزش‌های ما ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-brand-100 text-brand-800 rounded-full text-sm font-bold mb-4">
              💎 ارزش‌های ما
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mb-3">
              چه چیزی ما را متمایز می‌کند؟
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              ارزش‌هایی که در سرآمد به آن‌ها پایبندیم
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colors = colorMap[value.color];

              return (
                <div
                  key={index}
                  className="group bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <h3 className="font-black text-slate-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== تیم ما ===== */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-brand-100 text-brand-800 rounded-full text-sm font-bold mb-4">
              👨‍🏫 تیم ما
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mb-3">
              با بهترین اساتید یاد بگیر
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              اساتید مجرب و حرفه‌ای سرآمد، شما را در مسیر یادگیری همراهی می‌کنند
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topInstructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/instructors"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-800 text-brand-800 rounded-xl font-bold hover:bg-brand-800 hover:text-white transition"
            >
              مشاهده همه اساتید
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-10 lg:p-14 text-center text-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                آماده‌ای مسیر حرفه‌ای شدن را شروع کنی؟
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                همین امروز ثبت‌نام کن و از مشاوره رایگان تیم سرآمد بهره‌مند شو.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl hover:scale-105 transition-all"
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
        </div>
      </section>
    </div>
  );
}