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
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: resetError } = await resetPassword(email);

      if (resetError) {
        setError(resetError);
        return;
      }

      setStep(2);
    } catch (err) {
      setError('خطا در برقراری ارتباط با سرور.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* ===== فرم ===== */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* لوگو */}
            <Link
              href="/"
              className="flex items-center gap-3 mb-8 justify-center"
            >
              <div className="w-14 h-14 flex items-center justify-center">
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

            {/* خطا */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/30 border-r-4 border-red-500 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300 font-bold">
                  {error}
                </p>
              </div>
            )}

            {/* ===== مرحله ۱: ایمیل ===== */}
            {step === 1 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center mb-5">
                    <KeyRound className="w-10 h-10 text-brand-800 dark:text-brand-300" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                    فراموشی رمز عبور؟
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    ایمیل خود را وارد کنید تا لینک بازیابی برایتان ارسال شود.
                  </p>
                </div>

                <form onSubmit={handleSendCode} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      ایمیل
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        disabled={isLoading}
                        className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                      />
                      <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال ارسال...
                      </>
                    ) : (
                      <>
                        ارسال لینک بازیابی
                        <ArrowLeft className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-slate-600 dark:text-slate-400 text-sm pt-2">
                    رمز عبور خود را به یاد آوردی؟{' '}
                    <Link
                      href="/login"
                      className="text-brand-800 dark:text-brand-300 font-black hover:underline"
                    >
                      بازگشت به ورود
                    </Link>
                  </p>
                </form>
              </>
            )}

            {/* ===== مرحله ۲: تأیید ===== */}
            {step === 2 && (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
                </div>

                <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-4">
                  📧 ایمیل بازیابی ارسال شد!
                </h1>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  لینک بازیابی رمز عبور به ایمیل{' '}
                  <strong className="text-brand-800 dark:text-brand-300">
                    {email}
                  </strong>{' '}
                  ارسال شد.
                  <br />
                  لطفاً صندوق ورودی خود را چک کنید و روی لینک کلیک کنید.
                </p>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border-r-4 border-orange-500 rounded-xl mb-8 text-right">
                  <p className="text-sm text-orange-800 dark:text-orange-300">
                    <strong>نکته:</strong> اگه ایمیل رو ندیدی، پوشه Spam یا
                    Promotions رو چک کن.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setStep(1);
                      setEmail('');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    ایمیل دیگه‌ای رو امتحان کن
                  </button>

                  <Link
                    href="/login"
                    className="block w-full text-center py-3 text-brand-800 dark:text-brand-300 font-bold hover:underline"
                  >
                    بازگشت به ورود
                  </Link>
                </div>
              </div>
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
                  description: 'با لینک ایمیل معتبر',
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