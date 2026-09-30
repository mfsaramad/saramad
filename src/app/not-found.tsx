import Link from 'next/link';
import { Home, Search, ArrowLeft, BookOpen, Phone } from 'lucide-react';

export default function NotFound() {
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-2xl w-full text-center text-white">
        {/* عدد ۴۰۴ بزرگ */}
        <div className="relative mb-8">
          <h1
            className="text-[120px] lg:text-[200px] font-black leading-none select-none"
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #2dd4bf 50%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ۴۰۴
          </h1>

          {/* آیکون شناور */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center animate-float">
            <BookOpen className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
          </div>
        </div>

        {/* عنوان */}
        <h2 className="text-2xl lg:text-4xl font-black mb-4">
          صفحه‌ای که دنبالش بودی پیدا نشد! 🔍
        </h2>

        {/* توضیح */}
        <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-lg mx-auto">
          ممکنه آدرس اشتباه تایپ شده باشه یا صفحه حذف شده باشه. نگران نباش،
          می‌تونیم کمکت کنیم به مسیر درست برگردی.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-800 font-black shadow-xl hover:scale-105 transition-all"
          >
            <Home className="w-5 h-5" />
            بازگشت به خانه
          </Link>

          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-bold hover:bg-white/20 transition"
          >
            <Search className="w-5 h-5" />
            جستجوی دوره‌ها
          </Link>
        </div>

        {/* لینک‌های سریع */}
        <div className="pt-8 border-t border-white/20">
          <p className="text-sm text-blue-200 mb-4">یا از این لینک‌ها استفاده کن:</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              href="/instructors"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur rounded-lg border border-white/10 transition"
            >
              👨‍🏫 اساتید
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur rounded-lg border border-white/10 transition"
            >
              📰 وبلاگ
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur rounded-lg border border-white/10 transition"
            >
              📞 تماس با ما
            </Link>
          </div>
        </div>

        {/* اطلاعات تماس */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-400" />
              <span>۰۹۳۶۲۸۴۷۹۲۲</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>تبریز، خیابان بهار، روبروی تعاون روستایی</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}