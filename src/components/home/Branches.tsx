import Link from 'next/link';
import { MapPin, Phone, Clock, Navigation, ArrowLeft, Users, Building2 } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';
import { branches } from '@/lib/data';

/* ویژگی‌های شعبه */
const branchFeatures = [
  {
    icon: Users,
    title: 'کلاس‌های مجهز',
    description: 'کلاس‌های مدرن با تجهیزات کامل',
  },
  {
    icon: Building2,
    title: 'محیط آموزشی حرفه‌ای',
    description: 'فضایی آرام و مناسب یادگیری',
  },
];

export default function Branches() {
  const branch = branches[0];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="شعبه ما"
          title="در شعبه سرآمد منتظرت هستیم"
          description="برای یادگیری حضوری، در فضایی حرفه‌ای و صمیمی در کنار ما باش"
        />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* بخش تصویر و نقشه */}
          <div className="relative bg-gradient-to-br from-brand-800 to-brand-900 rounded-3xl overflow-hidden min-h-[400px] shadow-2xl">
            {/* الگوی تزئینی */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* محتوای داخل تصویر */}
            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
              {/* آیکون بزرگ */}
              <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6">
                <MapPin className="w-12 h-12 text-teal-400" />
              </div>

              {/* نام شعبه */}
              <h3 className="text-2xl font-black text-white mb-3">
                {branch.name}
              </h3>

              {/* آدرس */}
              <p className="text-blue-100 leading-relaxed mb-6 max-w-sm">
                {branch.address}
              </p>

              {/* دکمه مشاهده روی نقشه */}
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-white font-bold shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform"
              >
                <Navigation className="w-4 h-4" />
                مشاهده روی نقشه
              </a>
            </div>
          </div>

          {/* بخش اطلاعات شعبه */}
          <div className="flex flex-col gap-6">
            {/* اطلاعات تماس */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-100">
              <h4 className="text-lg font-black text-slate-800 mb-5">
                اطلاعات تماس
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-800" />
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

            {/* ویژگی‌های شعبه */}
            <div className="grid grid-cols-2 gap-4">
              {branchFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center hover:bg-white hover:shadow-lg transition"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-brand-100 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-brand-800" />
                    </div>
                    <div className="font-black text-slate-800 text-sm mb-1">
                      {feature.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {feature.description}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* دکمه تماس */}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl gradient-brand text-white font-bold hover:shadow-xl hover:shadow-brand-800/30 hover:scale-[1.02] transition-all"
            >
              تماس با ما
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}