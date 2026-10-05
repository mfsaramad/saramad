import Link from 'next/link';
import {
  Calendar,
  Clock,
  Users,
  Radio,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import { liveClasses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import SectionTitle from '@/components/shared/SectionTitle';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

export default function LiveClasses() {
  const topClasses = liveClasses.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-bold mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span>کلاس‌های آنلاین زنده</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-black mb-3">
              کلاس‌های زنده و کارگاه‌های آنلاین
            </h2>

            <p className="text-blue-100 max-w-2xl mx-auto">
              در کلاس‌های زنده سرآمد شرکت کن، سؤال بپرس و از هر جای ایران یاد
              بگیر
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {topClasses.map((cls, index) => {
            const percentage = Math.round(
              (cls.registered / cls.capacity) * 100
            );
            const isAlmostFull = percentage > 80;

            return (
              <FadeIn
                key={cls.id}
                delay={index * 0.15}
                direction="up"
                className="h-full"
              >
                <Link
                  href={`/live/${cls.slug}`}
                  className="group relative block h-full bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 hover:-translate-y-3 transition-all duration-500 overflow-hidden"
                >
                  {cls.isLive && (
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
                  )}

                  <div className="relative">
                    {cls.isLive && (
                      <div className="absolute top-0 left-0 flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full text-xs font-black shadow-lg">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        در حال پخش
                      </div>
                    )}

                    {cls.isFree && !cls.isLive && (
                      <div className="absolute top-0 left-0 px-3 py-1 bg-teal-500 rounded-full text-xs font-black shadow-lg">
                        🎁 رایگان
                      </div>
                    )}

                    <div
                      className={cn(
                        'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mt-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-2xl',
                        cls.color === 'brand' &&
                          'bg-brand-500/20 border border-brand-500/30',
                        cls.color === 'teal' &&
                          'bg-teal-500/20 border border-teal-500/30',
                        cls.color === 'accent' &&
                          'bg-orange-500/20 border border-orange-500/30'
                      )}
                    >
                      {cls.icon}
                    </div>

                    <h3 className="text-lg font-black leading-snug mb-4 min-h-[3.5rem] line-clamp-2">
                      {cls.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-5 pb-5 border-b border-white/10">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-brand-500 flex items-center justify-center text-white text-xs font-black">
                        {cls.instructor.charAt(0)}
                      </div>
                      <span className="text-sm text-blue-100">
                        {cls.instructor}
                      </span>
                    </div>

                    <div className="space-y-2.5 mb-6 text-sm text-blue-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-teal-400" />
                        <span>
                          {cls.day} - {cls.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-400" />
                        <span>{cls.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-teal-400" />
                        <span>
                          {toPersianNumber(cls.registered)} از{' '}
                          {toPersianNumber(cls.capacity)} نفر
                        </span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-blue-200">ظرفیت</span>
                        <span
                          className={cn(
                            'font-bold',
                            isAlmostFull ? 'text-orange-400' : 'text-teal-400'
                          )}
                        >
                          {toPersianNumber(percentage)}٪
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
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

                    <div
                      className={cn(
                        'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all group-hover:gap-3',
                        cls.isLive
                          ? 'bg-red-500 text-white'
                          : cls.isFree
                          ? 'bg-teal-500 text-white'
                          : 'bg-white/10 border border-white/20 text-white'
                      )}
                    >
                      {cls.isLive ? (
                        <>
                          <Radio className="w-4 h-4" />
                          ورود به کلاس
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          ثبت‌نام در کلاس
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <Link
              href="/live"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-bold hover:bg-white/20 transition-all hover:gap-3 group"
            >
              مشاهده همه کلاس‌های آنلاین
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}