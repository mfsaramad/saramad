import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Building2,
  Users,
  Car,
  Wifi,
  Coffee,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Award,
  TrendingUp,
} from 'lucide-react';
import { branches } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Building2,
    title: 'کلاس‌های مجهز',
    description: 'کلاس‌های مدرن با تجهیزات کامل آموزشی',
    color: 'brand' as const,
  },
  {
    icon: Users,
    title: 'محیط آموزشی صمیمی',
    description: 'فضایی آرام و مناسب یادگیری',
    color: 'teal' as const,
  },
  {
    icon: Car,
    title: 'پارکینگ رایگان',
    description: 'پارکینگ اختصاصی برای دانشجویان',
    color: 'accent' as const,
  },
  {
    icon: Wifi,
    title: 'اینترنت پرسرعت',
    description: 'دسترسی رایگان به Wi-Fi',
    color: 'brand' as const,
  },
  {
    icon: Coffee,
    title: 'کافه و استراحت',
    description: 'فضای استراحت و پذیرایی',
    color: 'teal' as const,
  },
  {
    icon: BookOpen,
    title: 'کتابخانه',
    description: 'منابع آموزشی متنوع',
    color: 'accent' as const,
  },
];

export default function BranchesPage() {
  const branch = branches[0];

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
                <span>شعبه‌های سرآمد</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                در شعبه سرآمد منتظرت هستیم
              </h1>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                برای یادگیری حضوری، در فضایی حرفه‌ای و صمیمی در کنار ما باش
              </p>
            </div>
          </FadeIn>

          {/* آمار */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  {toPersianNumber(branches.length)}
                </div>
                <div className="text-xs text-blue-200 mt-1">شعبه فعال</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۶+
                </div>
                <div className="text-xs text-blue-200 mt-1">امکانات ویژه</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۹۸٪
                </div>
                <div className="text-xs text-blue-200 mt-1">رضایت</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== کارت شعبه ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              {/* نقشه / تصویر */}
              <div className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl overflow-hidden min-h-[400px] shadow-2xl group">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* افکت درخشش */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl group-hover:bg-teal-400/30 transition-colors" />

                <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
                  <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <MapPin className="w-12 h-12 text-teal-400" />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3">
                    {branch.name}
                  </h3>

                  <p className="text-blue-100 leading-relaxed mb-6 max-w-sm">
                    {branch.address}
                  </p>

                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-bold shadow-xl shadow-orange-500/30 transition hover:scale-105 hover:gap-3"
                  >
                    <Navigation className="w-4 h-4" />
                    مشاهده روی نقشه
                  </a>
                </div>
              </div>

              {/* اطلاعات شعبه */}
              <div className="flex flex-col gap-6">
                {/* اطلاعات تماس */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    اطلاعات تماس
                  </h4>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5 text-blue-800 dark:text-blue-300" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          آدرس
                        </div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                          {branch.address}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-teal-600 dark:text-teal-300" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          تلفن
                        </div>
                        <a
                          href={`tel:${branch.phone}`}
                          className="text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-300 transition"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Clock className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          ساعات کاری
                        </div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          شنبه تا پنج‌شنبه | ۹:۰۰ - ۲۱:۰۰
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* دکمه تماس */}
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white font-bold hover:shadow-xl hover:shadow-brand-800/30 hover:scale-[1.02] transition-all hover:gap-3 group"
                >
                  تماس با ما
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== ویژگی‌های شعبه ===== */}
      <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                ✨ امکانات شعبه
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">
                امکانات شعبه مرکزی سرآمد
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                همه امکانات لازم برای یادگیری بهتر و راحت‌تر
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors = colorMap[feature.color];

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
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
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
                  <MapPin className="w-10 h-10 text-teal-400" />
                </div>

                <h2 className="text-3xl lg:text-4xl font-black mb-4">
                  آماده‌ای از شعبه ما دیدن کنی؟
                </h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                  برای مشاوره رایگان و بازدید از شعبه، با ما تماس بگیر یا حضوری
                  مراجعه کن
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`tel:${branch.phone}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    تماس تلفنی
                  </a>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-xl font-bold transition"
                  >
                    <Navigation className="w-5 h-5" />
                    مسیریابی
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}