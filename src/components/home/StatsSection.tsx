'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, BookOpen, Award, Briefcase } from 'lucide-react';
import { toPersianNumber } from '@/lib/format';

/* داده‌های آماری */
const statsData = [
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'دانشجوی موفق',
    color: 'brand' as const,
  },
  {
    icon: BookOpen,
    value: 80,
    suffix: '+',
    label: 'دوره تخصصی',
    color: 'teal' as const,
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'سال تجربه',
    color: 'accent' as const,
  },
  {
    icon: Briefcase,
    value: 3200,
    suffix: '+',
    label: 'ورود به بازار کار',
    color: 'brand' as const,
  },
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // تشخیص ورود به viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 bg-gradient-to-br from-brand-800 via-brand-900 to-slate-900 text-white relative overflow-hidden"
    >
      {/* افکت تزئینی */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      {/* الگوی نقطه‌ای */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-black mb-3">
            سرآمد در یک نگاه
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            اعداد و آمارهایی که نشان‌دهنده اعتماد شما به ماست
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              brand: {
                bg: 'bg-brand-500/20',
                border: 'border-brand-500/30',
                icon: 'text-brand-300',
              },
              teal: {
                bg: 'bg-teal-500/20',
                border: 'border-teal-500/30',
                icon: 'text-teal-300',
              },
              accent: {
                bg: 'bg-orange-500/20',
                border: 'border-orange-500/30',
                icon: 'text-orange-300',
              },
            }[stat.color];

            return (
              <div
                key={index}
                className="text-center bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-2xl ${colorClasses.bg} ${colorClasses.border} border flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-7 h-7 ${colorClasses.icon}`} />
                </div>

                <div className="text-3xl lg:text-4xl font-black text-white mb-2">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>

                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   کامپوننت شمارنده
   ============================================================ */
function CountUp({
  end,
  suffix = '',
  isVisible,
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  isVisible: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // easeOutQuart برای انیمیشن نرم
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span>
      {toPersianNumber(count)}
      <span className="text-teal-400">{suffix}</span>
    </span>
  );
}