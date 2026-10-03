'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Award,
  Video,
  Users,
  Sparkles,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ورود با موفقیت انجام شد! (نمونه)');
  };

  const benefits = [
    {
      icon: GraduationCap,
      title: 'دسترسی به دوره‌ها',
      description: 'به همه دوره‌های خریداری‌شده دسترسی داشته باش',
    },
    {
      icon: Video,
      title: 'کلاس‌های آنلاین',
      description: 'در کلاس‌های زنده و ضبط‌شده شرکت کن',
    },
    {
      icon: Award,
      title: 'مدارک و گواهی‌نامه',
      description: 'مدارک خود را دریافت و مدیریت کن',
    },
    {
      icon: CheckCircle2,
      title: 'پیگیری پیشرفت',
      description: 'پیشرفت تحصیلی خود را پیگیری کن',
    },
  ];

  const stats = [
    { icon: Users, value: '۵۰۰۰+', label: 'دانشجو' },
    { icon: BookOpen, value: '۸۰+', label: 'دوره' },
    { icon: TrendingUp, value: '۱۵+', label: 'سال تجربه' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* ===== فرم ورود ===== */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <FadeIn className="w-full max-w-md">
            {/* لوگو */}
            <Link
              href="/"
              className="flex items-center gap-3 mb-8 justify-center group"
            >
              <div className="w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="آموزشگاه سرآمد"
                  className="w-full h-full object-contain dark:hidden"
                />
                <img
                  src="/logo-white.png"
                  alt="آموزشگاه سرآمد"
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
              <div>
                <div className="text-2xl font-black text-brand-800 dark:text-brand-100">
                  سرآمد
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  مجتمع آموزش فنی و حرفه‌ای
                </div>
              </div>
            </Link>

            {/* عنوان */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>خوش آمدی</span>
              </div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                ورود به حساب کاربری
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                برای دسترسی به پنل کاربری، وارد شوید
              </p>
            </div>

            {/* فرم */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ایمیل */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ایمیل یا شماره تماس
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="example@email.com"
                    className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition"
                  />
                  <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* رمز عبور */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  رمز عبور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full pr-12 pl-12 py-3.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition"
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* گزینه‌ها */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) =>
                      setFormData({ ...formData, remember: e.target.checked })
                    }
                    className="w-4 h-4 text-brand-800 rounded focus:ring-brand-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                    مرا به خاطر بسپار
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-brand-800 dark:text-brand-300 font-bold hover:underline"
                >
                  فراموشی رمز؟
                </Link>
              </div>

              {/* دکمه ورود */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3"
              >
                ورود به حساب
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* جداکننده */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400">
                    یا
                  </span>
                </div>
              </div>

              {/* ثبت‌نام */}
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                حساب کاربری ندارید؟{' '}
                <Link
                  href="/register"
                  className="text-brand-800 dark:text-brand-300 font-black hover:underline"
                >
                  ثبت‌نام کنید
                </Link>
              </p>
            </form>
          </FadeIn>
        </div>

        {/* ===== بخش تبلیغاتی ===== */}
        <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

          <FadeIn direction="left" className="relative text-white max-w-md">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span>مزایای عضویت</span>
            </div>

            <h2 className="text-3xl font-black mb-4 leading-tight">
              به جمع هزاران دانشجوی سرآمد بپیوند
            </h2>

            <p className="text-blue-100 leading-relaxed mb-10">
              با ورود به پنل کاربری، به همه امکانات آموزشی سرآمد دسترسی پیدا
              می‌کنید.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <FadeIn
                    key={index}
                    delay={0.2 + index * 0.1}
                    direction="left"
                  >
                    <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl hover:bg-white/15 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="font-black mb-1">{benefit.title}</h3>
                        <p className="text-xs text-blue-100">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* آمار */}
            <FadeIn delay={0.7}>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                      <div className="text-2xl font-black">{stat.value}</div>
                      <div className="text-xs text-blue-200 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}