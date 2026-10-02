'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  Home,
  RefreshCw,
  AlertTriangle,
  ArrowLeft,
  LayoutDashboard,
  Phone,
} from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('خطای برنامه:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] flex items-center justify-center p-6 relative overflow-hidden">
      {/* الگوی تزئینی */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* دایره‌های تزئینی */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-2xl w-full text-center text-white">
        {/* عدد ۵۰۰ */}
        <div className="relative mb-8">
          <h1
            className="text-[120px] lg:text-[200px] font-black leading-none select-none"
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #fb923c 50%, #2dd4bf 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ۵۰۰
          </h1>

          {/* آیکون هشدار */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center animate-float">
            <AlertTriangle className="w-12 h-12 lg:w-16 lg:h-16 text-orange-300" />
          </div>
        </div>

        {/* عنوان */}
        <h2 className="text-2xl lg:text-4xl font-black mb-4">
          خطای غیرمنتظره‌ای رخ داد! ⚠️
        </h2>

        {/* توضیح */}
        <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-lg mx-auto">
          متأسفانه در سرور مشکلی پیش اومده. تیم فنی ما در حال بررسی هستن. لطفاً
          چند لحظه دیگه دوباره تلاش کن.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={reset}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-800 font-black shadow-xl hover:scale-105 transition-all"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            تلاش مجدد
          </button>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-bold hover:bg-white/20 transition"
          >
            <Home className="w-5 h-5" />
            بازگشت به خانه
          </Link>
        </div>

        {/* لینک‌های سریع */}
        <div className="pt-8 border-t border-white/20">
          <p className="text-sm text-blue-200 mb-4">
            یا از این لینک‌ها استفاده کن:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur rounded-lg border border-white/10 transition"
            >
              <LayoutDashboard className="w-4 h-4" />
              پنل کاربری
            </Link>
            <Link
              href="/courses"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur rounded-lg border border-white/10 transition"
            >
              🎓 دوره‌ها
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur rounded-lg border border-white/10 transition"
            >
              <Phone className="w-4 h-4" />
              تماس با ما
            </Link>
          </div>
        </div>

        {/* اطلاعات تماس */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-sm text-blue-200 mb-3">
            اگه مشکل ادامه داشت، با ما تماس بگیر:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-blue-100">
            <a
              href="tel:09362847922"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold transition"
            >
              <Phone className="w-4 h-4" />
              ۰۹۳۶۲۸۴۷۹۲۲
            </a>
          </div>
        </div>

        {/* کد خطا (فقط در حالت توسعه) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-black/30 backdrop-blur rounded-2xl border border-white/20 text-right">
            <p className="text-xs text-orange-300 mb-2 font-bold">
              🔧 جزئیات خطا (فقط در حالت توسعه):
            </p>
            <p className="text-xs text-blue-200 font-mono break-all leading-relaxed">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-teal-300 font-mono mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}