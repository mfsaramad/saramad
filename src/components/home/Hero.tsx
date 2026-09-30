'use client';

import Link from 'next/link';
import { ArrowLeft, PlayCircle, Sparkles } from 'lucide-react';
import { stats } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';

export default function Hero() {
  return (
    <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
      {/* پس‌زمینه گرادیانت */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0d9488 100%)',
        }}
      />

      {/* افکت‌های تزئینی */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #14b8a6 0%, transparent 40%), radial-gradient(circle at 80% 70%, #f97316 0%, transparent 40%)',
        }}
      />

      {/* الگوی نقطه‌ای */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* متن هیرو */}
          <div className="text-white">
            {/* برچسب */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-sm border border-white/20"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span>ثبت‌نام ترم جدید آغاز شد</span>
            </div>

            {/* تیتر */}
            <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
              مسیر <span className="text-teal-400">حرفه‌ای</span> شدن
              <br />
              از <span className="text-orange-400">سرآمد</span> شروع می‌شود
            </h1>

            {/* توضیح */}
            <p className="text-lg lg:text-xl text-blue-100 leading-relaxed mb-8 max-w-xl">
              مجتمع آموزش فنی و حرفه‌ای سرآمد با برگزاری دوره‌های{' '}
              <strong className="text-white">حضوری، آنلاین و ترکیبی</strong>،
              شما را برای ورود به بازار کار آماده می‌کند.
            </p>

            {/* دکمه‌ها */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/courses"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform"
                style={{
                  background:
                    'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                }}
              >
                مشاهده دوره‌ها
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/live"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold hover:bg-white/20 transition border border-white/20"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <PlayCircle className="w-5 h-5" />
                کلاس‌های آنلاین
              </Link>
            </div>

            {/* آمار */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-right">
                  <div className="text-2xl lg:text-3xl font-black text-white">
                    {toPersianNumber(stat.value)}
                    <span className="text-teal-400">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-blue-200 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* کارت‌های شناور */}
          <div className="relative hidden lg:block h-[560px]">
            <div
              className="absolute top-0 right-4 w-72 bg-white rounded-3xl shadow-2xl p-6 animate-float"
              style={{ animationDelay: '0s' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                  🏢
                </div>
                <div>
                  <div className="font-black text-slate-800">کلاس حضوری</div>
                  <div className="text-xs text-slate-500">
                    تجربه واقعی یادگیری
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                تعامل چهره‌به‌چهره با استاد و هم‌کلاسی‌ها در محیط آموزشی مجهز
              </p>
            </div>

            <div
              className="absolute top-44 left-0 w-72 bg-white rounded-3xl shadow-2xl p-6 animate-float"
              style={{ animationDelay: '1s' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl">
                  💻
                </div>
                <div>
                  <div className="font-black text-slate-800">کلاس آنلاین</div>
                  <div className="text-xs text-slate-500">از هر جای ایران</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                کلاس‌های زنده با کیفیت HD، ضبط جلسات و پشتیبانی آنلاین
              </p>
            </div>

            <div
              className="absolute bottom-4 right-10 w-72 bg-white rounded-3xl shadow-2xl p-6 animate-float"
              style={{ animationDelay: '2s' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                  🔄
                </div>
                <div>
                  <div className="font-black text-slate-800">دوره ترکیبی</div>
                  <div className="text-xs text-slate-500">
                    بهترین هر دو دنیا
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                ترکیبی از مزایای حضوری و آنلاین برای یادگیری بهتر
              </p>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl -z-10" />
            <div className="absolute top-10 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* موج پایین */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 45C840 60 960 90 1080 97.5C1200 105 1320 90 1380 82.5L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}