import Link from 'next/link';
import { ArrowLeft, Sparkles, Phone, MessageCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-brand p-10 lg:p-16 text-white">
          {/* افکت‌های تزئینی */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          
          {/* الگوی نقطه‌ای */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* متن */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-bold mb-5">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span>همین امروز شروع کن</span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-black leading-tight mb-5">
                آماده‌ای مسیر حرفه‌ای شدن
                <br />
                را شروع کنی؟
              </h2>

              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-lg">
                همین حالا ثبت‌نام کن و از مشاوره رایگان تیم سرآمد بهره‌مند شو.
                ما تا رسیدن به هدفت کنارت هستیم.
              </p>

              {/* دکمه‌ها */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-accent text-white font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform"
                >
                  ثبت‌نام رایگان
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>

                <a
                  href="tel:02112345678"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-white font-bold hover:bg-white/20 transition"
                >
                  <Phone className="w-4 h-4" />
                  مشاوره تلفنی
                </a>
              </div>
            </div>

            {/* کارت مشاوره */}
            <div className="lg:justify-self-end w-full max-w-md">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-teal-300" />
                  </div>
                  <div>
                    <div className="font-black text-lg">
                      مشاوره رایگان
                    </div>
                    <div className="text-xs text-blue-200">
                      پاسخ در کمتر از ۵ دقیقه
                    </div>
                  </div>
                </div>

                <p className="text-sm text-blue-100 leading-relaxed mb-6">
                  مطمئن نیستی کدام دوره مناسبته؟ کارشناسان ما در انتخاب مسیر
                  یادگیری کمکت می‌کنند.
                </p>

                <div className="space-y-3">
                  <a
                    href="tel:02112345678"
                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/10"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-orange-300" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-blue-200">تماس تلفنی</div>
                      <div className="text-sm font-bold">۰۲۱-۱۲۳۴۵۶۷۸</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/989121234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/10"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-teal-300" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-blue-200">واتس‌اپ</div>
                      <div className="text-sm font-bold">۰۹۱۲۱۲۳۴۵۶۷</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}