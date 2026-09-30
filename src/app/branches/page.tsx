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
} from 'lucide-react';
import { branches } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';

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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-blue-100 mb-8 justify-center">
            <Link href="/" className="hover:text-white transition">
              خانه
            </Link>
            <span>/</span>
            <span className="text-white font-bold">شعبه‌ها</span>
          </div>

          <div className="text-center">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
              🏢 شعبه‌های سرآمد
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              در شعبه سرآمد منتظرت هستیم
            </h1>

            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              برای یادگیری حضوری، در فضایی حرفه‌ای و صمیمی در کنار ما باش
            </p>
          </div>
        </div>
      </section>

      {/* ===== کارت شعبه ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* نقشه / تصویر */}
            <div className="relative bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl overflow-hidden min-h-[400px] shadow-2xl">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
                <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-bold shadow-xl transition hover:scale-105"
                >
                  <Navigation className="w-4 h-4" />
                  مشاهده روی نقشه
                </a>
              </div>
            </div>

            {/* اطلاعات شعبه */}
            <div className="flex flex-col gap-6">
              {/* اطلاعات تماس */}
              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm">
                <h4 className="text-lg font-black text-slate-800 mb-5">
                  اطلاعات تماس
                </h4>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-800" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">آدرس</div>
                      <div className="text-sm font-bold text-slate-800 leading-relaxed">
                        {branch.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">تلفن</div>
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-sm font-bold text-slate-800 hover:text-teal-600 transition"
                      >
                        {branch.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">
                        ساعات کاری
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        شنبه تا پنج‌شنبه | ۹:۰۰ - ۲۱:۰۰
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* دکمه تماس */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white font-bold hover:shadow-xl hover:shadow-brand-800/30 hover:scale-[1.02] transition-all"
              >
                تماس با ما
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ویژگی‌های شعبه ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-brand-100 text-brand-800 rounded-full text-sm font-bold mb-4">
              ✨ امکانات شعبه
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mb-3">
              امکانات شعبه مرکزی سرآمد
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              همه امکانات لازم برای یادگیری بهتر و راحت‌تر
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors = colorMap[feature.color];

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
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 lg:py-16">
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
                آماده‌ای از شعبه ما دیدن کنی؟
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                برای مشاوره رایگان و بازدید از شعبه، با ما تماس بگیر یا حضوری
                مراجعه کن
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${branch.phone}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl hover:scale-105 transition-all"
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
        </div>
      </section>
    </div>
  );
}