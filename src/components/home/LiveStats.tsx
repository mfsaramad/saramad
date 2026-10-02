'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Users,
  BookOpen,
  Award,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedNumber from '@/components/animations/AnimatedNumber';

const stats = [
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'دانشجوی موفق',
    color: 'from-blue-500 to-blue-700',
    shadowColor: 'shadow-blue-500/30',
  },
  {
    icon: BookOpen,
    value: 80,
    suffix: '+',
    label: 'دوره تخصصی',
    color: 'from-teal-500 to-teal-700',
    shadowColor: 'shadow-teal-500/30',
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'سال تجربه',
    color: 'from-orange-500 to-orange-700',
    shadowColor: 'shadow-orange-500/30',
  },
  {
    icon: Briefcase,
    value: 3200,
    suffix: '+',
    label: 'ورود به بازار کار',
    color: 'from-purple-500 to-purple-700',
    shadowColor: 'shadow-purple-500/30',
  },
];

export default function LiveStats() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* الگوی تزئینی */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* دایره‌های تزئینی */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-4">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span>سرآمد در یک نگاه</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              اعداد و آمارهایی که اعتماد شما را نشان می‌دهد
            </h2>

            <p className="text-blue-100 max-w-2xl mx-auto">
              افتخار ما، موفقیت دانشجویان سرآمد است
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <FadeIn key={index} delay={index * 0.15} direction="up">
                <div className="group relative bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 lg:p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  {/* افکت تزئینی */}
                  <div
                    className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}
                  />

                  <div className="relative">
                    {/* آیکون */}
                    <div
                      className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-xl ${stat.shadowColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                    </div>

                    {/* عدد */}
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* برچسب */}
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}