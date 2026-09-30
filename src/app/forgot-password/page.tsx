'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Phone,
  ShieldCheck,
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 5) {
      alert('کد تأیید باید ۵ رقمی باشد');
      return;
    }
    setStep(3);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('رمز عبور با موفقیت تغییر کرد! (نمونه)');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* ===== فرم ===== */}
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

            {/* نشانگر مراحل */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition ${
                      step >= s
                        ? 'bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-8 h-1 mx-1 rounded transition ${
                        step > s ? 'bg-[#0d9488]' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ===== مرحله ۱: ایمیل ===== */}
            {step === 1 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-100 flex items-center justify-center mb-5">
                    <KeyRound className="w-10 h-10 text-brand-800" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-800 mb-2">
                    فراموشی رمز عبور؟
                  </h1>
                  <p className="text-slate-600 leading-relaxed">
                    ایمیل یا شماره تماس خود را وارد کنید تا کد بازیابی برایتان
                    ارسال شود.
                  </p>
                </div>

                <form onSubmit={handleSendCode} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      ایمیل یا شماره تماس
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com یا ۰۹۳۶۲۸۴۷۹۲۲"
                        className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                      />
                      <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    ارسال کد بازیابی
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <p className="text-center text-slate-600 text-sm pt-2">
                    رمز عبور خود را به یاد آوردی؟{' '}
                    <Link
                      href="/login"
                      className="text-brand-800 font-black hover:underline"
                    >
                      بازگشت به ورود
                    </Link>
                  </p>
                </form>
              </>
            )}

            {/* ===== مرحله ۲: کد تأیید ===== */}
            {step === 2 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-teal-100 flex items-center justify-center mb-5">
                    <ShieldCheck className="w-10 h-10 text-teal-600" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-800 mb-2">
                    کد تأیید را وارد کنید
                  </h1>
                  <p className="text-slate-600 leading-relaxed">
                    کد ۵ رقمی به{' '}
                    <span className="font-bold text-brand-800">{email}</span>{' '}
                    ارسال شد.
                  </p>
                </div>

                <form onSubmit={handleVerifyCode} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 text-center">
                      کد ۵ رقمی
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.replace(/\D/g, ''))
                      }
                      placeholder="- - - - -"
                      className="w-full text-center text-3xl font-black tracking-[0.5em] py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                      dir="ltr"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    تأیید کد
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-slate-600 hover:text-brand-800 transition"
                    >
                      ← تغییر ایمیل
                    </button>
                    <button
                      type="button"
                      className="text-brand-800 font-bold hover:underline"
                    >
                      ارسال مجدد کد
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* ===== مرحله ۳: رمز جدید ===== */}
            {step === 3 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-10 h-10 text-orange-600" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-800 mb-2">
                    رمز عبور جدید
                  </h1>
                  <p className="text-slate-600 leading-relaxed">
                    یک رمز عبور قوی و امن برای حساب خود انتخاب کنید.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      رمز عبور جدید
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="حداقل ۶ کاراکتر"
                      className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      تکرار رمز عبور
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="رمز عبور را دوباره وارد کنید"
                      className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    تغییر رمز عبور
                    <CheckCircle2 className="w-5 h-5" />
                  </button>

                  <p className="text-center text-slate-600 text-sm pt-2">
                    <Link
                      href="/login"
                      className="text-brand-800 font-black hover:underline"
                    >
                      بازگشت به ورود
                    </Link>
                  </p>
                </form>
              </>
            )}
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
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>بازیابی امن حساب</span>
            </div>

            <h2 className="text-3xl font-black mb-4 leading-tight">
              امنیت حساب شما، اولویت ماست
            </h2>
            <p className="text-blue-100 leading-relaxed mb-10">
              با بازیابی رمز عبور، به حساب خود دسترسی پیدا کنید و از امکانات
              سرآمد بهره‌مند شوید.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: ShieldCheck,
                  title: 'بازیابی امن',
                  description: 'با کد تأیید دو مرحله‌ای',
                },
                {
                  icon: KeyRound,
                  title: 'رمز قوی',
                  description: 'راهنمای انتخاب رمز امن',
                },
                {
                  icon: Phone,
                  title: 'پشتیبانی ۲۴/۷',
                  description: 'در هر زمان کمکت می‌کنیم',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-teal-300" />
                    </div>
                    <div>
                      <h3 className="font-black mb-1">{item.title}</h3>
                      <p className="text-xs text-blue-100">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* تماس */}
            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-sm text-blue-200 mb-3">
                اگه به کمک نیاز داری، با ما تماس بگیر:
              </p>
              <a
                href="tel:09362847922"
                className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-bold transition"
              >
                <Phone className="w-4 h-4" />
                ۰۹۳۶۲۸۴۷۹۲۲
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}