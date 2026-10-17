'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // اعتبارسنجی
    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند!');
      return;
    }

    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('لطفاً قوانین و مقررات را بپذیرید.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: signUpError } = await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.phone
      );

      if (signUpError) {
        setError(signUpError);
        return; // finally باعث میشه isLoading فالس بشه
      }

      setSuccess(true);

      // بعد از ۳ ثانیه برو به داشبورد
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

    } catch (err) {
      setError('خطا در برقراری ارتباط با سرور. لطفاً دوباره تلاش کنید.');
    } finally {
      // این بلاک حتماً اجرا میشه، چه خطا بده چه موفقیت‌آمیز باشه
      setIsLoading(false);
    }
  };

  // صفحه موفقیت
  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/30 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
          </div>

          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">
            🎉 ثبت‌نام موفق!
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            حساب کاربری شما با موفقیت ساخته شد.
            <br />
            در حال انتقال به داشبورد...
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-4 h-4 border-2 border-brand-800 border-t-transparent rounded-full animate-spin" />
            <span>لطفاً صبر کنید</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* ===== فرم ثبت‌نام ===== */}
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

            {/* عنوان */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                ساخت حساب کاربری 🎉
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                در چند ثانیه ثبت‌نام کنید و شروع کنید
              </p>
            </div>

            {/* خطا */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/30 border-r-4 border-red-500 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300 font-bold">
                  {error}
                </p>
              </div>
            )}

            {/* فرم */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* نام */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
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
                    disabled={isLoading}
                    className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                  />
                  <User className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* ایمیل */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
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
                    disabled={isLoading}
                    className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                  />
                  <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* شماره تماس */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
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
                    disabled={isLoading}
                    className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                  />
                  <Phone className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* رمز عبور */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
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
                    disabled={isLoading}
                    className="w-full pr-12 pl-12 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
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

              {/* تکرار رمز عبور */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
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
                    disabled={isLoading}
                    className="w-full pr-12 pl-12 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 transition"
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
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-brand-800 rounded focus:ring-brand-500"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <Link
                    href="/terms"
                    className="text-brand-800 dark:text-brand-300 font-bold hover:underline"
                  >
                    قوانین و مقررات
                  </Link>{' '}
                  و{' '}
                  <Link
                    href="/privacy"
                    className="text-brand-800 dark:text-brand-300 font-bold hover:underline"
                  >
                    حریم خصوصی
                  </Link>{' '}
                  سرآمد را می‌پذیرم.
                </span>
              </label>

              {/* دکمه ثبت‌نام */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02] mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال ساخت حساب...
                  </>
                ) : (
                  <>
                    ساخت حساب کاربری
                    <ArrowLeft className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* ورود */}
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm pt-2">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <Link
                  href="/login"
                  className="text-brand-800 dark:text-brand-300 font-black hover:underline"
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