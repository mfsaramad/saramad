'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('رمز عبور و تکرار آن یکسان نیستند!');
      return;
    }
    if (!formData.agreeTerms) {
      alert('لطفاً قوانین را بپذیرید.');
      return;
    }
    alert('ثبت‌نام با موفقیت انجام شد! (نمونه)');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* ===== فرم ثبت‌نام ===== */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* لوگو */}
            <Link
              href="/"
              className="flex items-center gap-3 mb-8 justify-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-800">
                  سرآمد
                </div>
                <div className="text-xs text-slate-500">
                  مجتمع آموزش فنی و حرفه‌ای
                </div>
              </div>
            </Link>

            {/* عنوان */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-800 mb-2">
                ساخت حساب کاربری 🎉
              </h1>
              <p className="text-slate-600">
                در چند ثانیه ثبت‌نام کنید و شروع کنید
              </p>
            </div>

            {/* فرم */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* نام */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  نام و نام خانوادگی *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="مثلاً: علی محمدی"
                    className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                  />
                  <User className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* ایمیل */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  ایمیل *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="example@email.com"
                    className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                  />
                  <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* شماره تماس */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  شماره تماس *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="۰۹۳۶۲۸۴۷۹۲۲"
                    className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                  />
                  <Phone className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* رمز عبور */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  رمز عبور *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="حداقل ۶ کاراکتر"
                    className="w-full pr-12 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 hover:text-brand-800 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* تکرار رمز عبور */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  تکرار رمز عبور *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="رمز عبور را دوباره وارد کنید"
                    className="w-full pr-12 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 hover:text-brand-800 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* قوانین */}
              <label className="flex items-start gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-brand-800 rounded focus:ring-brand-500"
                />
                <span className="text-sm text-slate-600 leading-relaxed">
                  <Link
                    href="/terms"
                    className="text-brand-800 font-bold hover:underline"
                  >
                    قوانین و مقررات
                  </Link>{' '}
                  و{' '}
                  <Link
                    href="/privacy"
                    className="text-brand-800 font-bold hover:underline"
                  >
                    حریم خصوصی
                  </Link>{' '}
                  سرآمد را می‌پذیرم.
                </span>
              </label>

              {/* دکمه ثبت‌نام */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02] mt-2"
              >
                ساخت حساب کاربری
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* ورود */}
              <p className="text-center text-slate-600 text-sm pt-2">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <Link
                  href="/login"
                  className="text-brand-800 font-black hover:underline"
                >
                  وارد شوید
                </Link>
              </p>
            </form>
          </div>
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

          <div className="relative text-white max-w-md">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span>مزایای عضویت در سرآمد</span>
            </div>

            <h2 className="text-3xl font-black mb-4 leading-tight">
              مسیر حرفه‌ای شدن را همین امروز شروع کن
            </h2>
            <p className="text-blue-100 leading-relaxed mb-10">
              با ثبت‌نام در سرآمد، به همه امکانات آموزشی ما دسترسی پیدا می‌کنید.
            </p>

            <div className="space-y-4">
              {[
                'دسترسی به ۸۰+ دوره تخصصی',
                'کلاس‌های آنلاین زنده و ضبط‌شده',
                'پشتیبانی ۲۴/۷ در تمام ساعات',
                'مدرک معتبر پایان دوره',
                'پنل کاربری اختصاصی',
                'امکان پرداخت اقساطی',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0" />
                  <span className="text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}