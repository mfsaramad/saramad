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
    setError(err.message || 'خطای ناشناخته'); console.error('خطای دقیق ثبت‌نام:', err);

    // ط·آ§ط·آ¹ط·ع¾ط·آ¨ط·آ§ط·آ±ط·آ³ط¸â€ ط·آ¬ط؛إ’
    if (formData.password !== formData.confirmPassword) {
      setError(err.message || 'خطای ناشناخته'); console.error('خطای دقیق ثبت‌نام:', err);
      return;
    }

    if (formData.password.length < 6) {
      setError(err.message || 'خطای ناشناخته'); console.error('خطای دقیق ثبت‌نام:', err);
      return;
    }

    if (!formData.agreeTerms) {
      setError(err.message || 'خطای ناشناخته'); console.error('خطای دقیق ثبت‌نام:', err);
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
        setError(err.message || 'خطای ناشناخته'); console.error('خطای دقیق ثبت‌نام:', err);
        return; // finally ط·آ¨ط·آ§ط·آ¹ط·آ« ط¸â€¦ط؛إ’ط·آ´ط¸â€، isLoading ط¸ظ¾ط·آ§ط¸â€‍ط·آ³ ط·آ¨ط·آ´ط¸â€،
      }

      setSuccess(true);

      // ط·آ¨ط·آ¹ط·آ¯ ط·آ§ط·آ² ط؛آ³ ط·آ«ط·آ§ط¸â€ ط؛إ’ط¸â€، ط·آ¨ط·آ±ط¸ث† ط·آ¨ط¸â€، ط·آ¯ط·آ§ط·آ´ط·آ¨ط¸ث†ط·آ±ط·آ¯
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

    } catch (err) {
      setError(err.message || 'خطای ناشناخته'); console.error('خطای دقیق ثبت‌نام:', err);
    } finally {
      // ط·آ§ط؛إ’ط¸â€  ط·آ¨ط¸â€‍ط·آ§ط¹آ© ط·آ­ط·ع¾ط¸â€¦ط·آ§ط¸â€¹ ط·آ§ط·آ¬ط·آ±ط·آ§ ط¸â€¦ط؛إ’ط·آ´ط¸â€،ط·إ’ ط¹â€ ط¸â€، ط·آ®ط·آ·ط·آ§ ط·آ¨ط·آ¯ط¸â€، ط¹â€ ط¸â€، ط¸â€¦ط¸ث†ط¸ظ¾ط¸â€ڑط؛إ’ط·ع¾أ¢â‚¬إ’ط·آ¢ط¸â€¦ط؛إ’ط·آ² ط·آ¨ط·آ§ط·آ´ط¸â€،
      setIsLoading(false);
    }
  };

  // ط·آµط¸ظ¾ط·آ­ط¸â€، ط¸â€¦ط¸ث†ط¸ظ¾ط¸â€ڑط؛إ’ط·ع¾
  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/30 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
          </div>

          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">
            ظ‹ع؛عکâ€° ط·آ«ط·آ¨ط·ع¾أ¢â‚¬إ’ط¸â€ ط·آ§ط¸â€¦ ط¸â€¦ط¸ث†ط¸ظ¾ط¸â€ڑ!
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            ط·آ­ط·آ³ط·آ§ط·آ¨ ط¹آ©ط·آ§ط·آ±ط·آ¨ط·آ±ط؛إ’ ط·آ´ط¸â€¦ط·آ§ ط·آ¨ط·آ§ ط¸â€¦ط¸ث†ط¸ظ¾ط¸â€ڑط؛إ’ط·ع¾ ط·آ³ط·آ§ط·آ®ط·ع¾ط¸â€، ط·آ´ط·آ¯.
            <br />
            ط·آ¯ط·آ± ط·آ­ط·آ§ط¸â€‍ ط·آ§ط¸â€ ط·ع¾ط¸â€ڑط·آ§ط¸â€‍ ط·آ¨ط¸â€، ط·آ¯ط·آ§ط·آ´ط·آ¨ط¸ث†ط·آ±ط·آ¯...
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-4 h-4 border-2 border-brand-800 border-t-transparent rounded-full animate-spin" />
            <span>ط¸â€‍ط·آ·ط¸ظ¾ط·آ§ط¸â€¹ ط·آµط·آ¨ط·آ± ط¹آ©ط¸â€ ط؛إ’ط·آ¯</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* ===== ط¸ظ¾ط·آ±ط¸â€¦ ط·آ«ط·آ¨ط·ع¾أ¢â‚¬إ’ط¸â€ ط·آ§ط¸â€¦ ===== */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* ط¸â€‍ط¸ث†ط¹آ¯ط¸ث† */}
            <Link
              href="/"
              className="flex items-center gap-3 mb-8 justify-center"
            >
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="ط·آ¢ط¸â€¦ط¸ث†ط·آ²ط·آ´ط¹آ¯ط·آ§ط¸â€، ط·آ³ط·آ±ط·آ¢ط¸â€¦ط·آ¯"
                  className="w-full h-full object-contain dark:hidden"
                />
                <img
                  src="/logo-white.png"
                  alt="ط·آ¢ط¸â€¦ط¸ث†ط·آ²ط·آ´ط¹آ¯ط·آ§ط¸â€، ط·آ³ط·آ±ط·آ¢ط¸â€¦ط·آ¯"
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
              <div>
                <div className="text-2xl font-black text-brand-800 dark:text-brand-100">
                  ط·آ³ط·آ±ط·آ¢ط¸â€¦ط·آ¯
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  ط¸â€¦ط·آ¬ط·ع¾ط¸â€¦ط·آ¹ ط·آ¢ط¸â€¦ط¸ث†ط·آ²ط·آ´ ط¸ظ¾ط¸â€ ط؛إ’ ط¸ث† ط·آ­ط·آ±ط¸ظ¾ط¸â€،أ¢â‚¬إ’ط·آ§ط؛إ’
                </div>
              </div>
            </Link>

            {/* ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€  */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                ط·آ³ط·آ§ط·آ®ط·ع¾ ط·آ­ط·آ³ط·آ§ط·آ¨ ط¹آ©ط·آ§ط·آ±ط·آ¨ط·آ±ط؛إ’ ظ‹ع؛عکâ€°
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                ط·آ¯ط·آ± ط¹â€ ط¸â€ ط·آ¯ ط·آ«ط·آ§ط¸â€ ط؛إ’ط¸â€، ط·آ«ط·آ¨ط·ع¾أ¢â‚¬إ’ط¸â€ ط·آ§ط¸â€¦ ط¹آ©ط¸â€ ط؛إ’ط·آ¯ ط¸ث† ط·آ´ط·آ±ط¸ث†ط·آ¹ ط¹آ©ط¸â€ ط؛إ’ط·آ¯
              </p>
            </div>

            {/* ط·آ®ط·آ·ط·آ§ */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/30 border-r-4 border-red-500 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300 font-bold">
                  {error}
                </p>
              </div>
            )}

            {/* ط¸ظ¾ط·آ±ط¸â€¦ */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ط¸â€ ط·آ§ط¸â€¦ */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ط¸â€ ط·آ§ط¸â€¦ ط¸ث† ط¸â€ ط·آ§ط¸â€¦ ط·آ®ط·آ§ط¸â€ ط¸ث†ط·آ§ط·آ¯ط¹آ¯ط؛إ’ *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="ط¸â€¦ط·آ«ط¸â€‍ط·آ§ط¸â€¹: ط·آ¹ط¸â€‍ط؛إ’ ط¸â€¦ط·آ­ط¸â€¦ط·آ¯ط؛إ’"
                    disabled={isLoading}
                    className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                  />
                  <User className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* ط·آ§ط؛إ’ط¸â€¦ط؛إ’ط¸â€‍ */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ط·آ§ط؛إ’ط¸â€¦ط؛إ’ط¸â€‍ *
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

              {/* ط·آ´ط¸â€¦ط·آ§ط·آ±ط¸â€، ط·ع¾ط¸â€¦ط·آ§ط·آ³ */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ط·آ´ط¸â€¦ط·آ§ط·آ±ط¸â€، ط·ع¾ط¸â€¦ط·آ§ط·آ³ *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="ط؛آ°ط؛آ¹ط؛آ³ط؛آ¶ط؛آ²ط؛آ¸ط؛آ´ط؛آ·ط؛آ¹ط؛آ²ط؛آ²"
                    disabled={isLoading}
                    className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                  />
                  <Phone className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* ط·آ±ط¸â€¦ط·آ² ط·آ¹ط·آ¨ط¸ث†ط·آ± */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ط·آ±ط¸â€¦ط·آ² ط·آ¹ط·آ¨ط¸ث†ط·آ± *
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
                    placeholder="ط·آ­ط·آ¯ط·آ§ط¸â€ڑط¸â€‍ ط؛آ¶ ط¹آ©ط·آ§ط·آ±ط·آ§ط¹آ©ط·ع¾ط·آ±"
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

              {/* ط·ع¾ط¹آ©ط·آ±ط·آ§ط·آ± ط·آ±ط¸â€¦ط·آ² ط·آ¹ط·آ¨ط¸ث†ط·آ± */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ط·ع¾ط¹آ©ط·آ±ط·آ§ط·آ± ط·آ±ط¸â€¦ط·آ² ط·آ¹ط·آ¨ط¸ث†ط·آ± *
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
                    placeholder="ط·آ±ط¸â€¦ط·آ² ط·آ¹ط·آ¨ط¸ث†ط·آ± ط·آ±ط·آ§ ط·آ¯ط¸ث†ط·آ¨ط·آ§ط·آ±ط¸â€، ط¸ث†ط·آ§ط·آ±ط·آ¯ ط¹آ©ط¸â€ ط؛إ’ط·آ¯"
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

              {/* ط¸â€ڑط¸ث†ط·آ§ط¸â€ ط؛إ’ط¸â€  */}
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
                    ط¸â€ڑط¸ث†ط·آ§ط¸â€ ط؛إ’ط¸â€  ط¸ث† ط¸â€¦ط¸â€ڑط·آ±ط·آ±ط·آ§ط·ع¾
                  </Link>{' '}
                  ط¸ث†{' '}
                  <Link
                    href="/privacy"
                    className="text-brand-800 dark:text-brand-300 font-bold hover:underline"
                  >
                    ط·آ­ط·آ±ط؛إ’ط¸â€¦ ط·آ®ط·آµط¸ث†ط·آµط؛إ’
                  </Link>{' '}
                  ط·آ³ط·آ±ط·آ¢ط¸â€¦ط·آ¯ ط·آ±ط·آ§ ط¸â€¦ط؛إ’أ¢â‚¬إ’ط¸آ¾ط·آ°ط؛إ’ط·آ±ط¸â€¦.
                </span>
              </label>

              {/* ط·آ¯ط¹آ©ط¸â€¦ط¸â€، ط·آ«ط·آ¨ط·ع¾أ¢â‚¬إ’ط¸â€ ط·آ§ط¸â€¦ */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02] mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ط·آ¯ط·آ± ط·آ­ط·آ§ط¸â€‍ ط·آ³ط·آ§ط·آ®ط·ع¾ ط·آ­ط·آ³ط·آ§ط·آ¨...
                  </>
                ) : (
                  <>
                    ط·آ³ط·آ§ط·آ®ط·ع¾ ط·آ­ط·آ³ط·آ§ط·آ¨ ط¹آ©ط·آ§ط·آ±ط·آ¨ط·آ±ط؛إ’
                    <ArrowLeft className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* ط¸ث†ط·آ±ط¸ث†ط·آ¯ */}
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm pt-2">
                ط¸â€ڑط·آ¨ط¸â€‍ط·آ§ط¸â€¹ ط·آ«ط·آ¨ط·ع¾أ¢â‚¬إ’ط¸â€ ط·آ§ط¸â€¦ ط¹آ©ط·آ±ط·آ¯ط¸â€،أ¢â‚¬إ’ط·آ§ط؛إ’ط·آ¯ط·ع؛{' '}
                <Link
                  href="/login"
                  className="text-brand-800 dark:text-brand-300 font-black hover:underline"
                >
                  ط¸ث†ط·آ§ط·آ±ط·آ¯ ط·آ´ط¸ث†ط؛إ’ط·آ¯
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* ===== ط·آ¨ط·آ®ط·آ´ ط·ع¾ط·آ¨ط¸â€‍ط؛إ’ط·ط›ط·آ§ط·ع¾ط؛إ’ ===== */}
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
              <span>ط¸â€¦ط·آ²ط·آ§ط؛إ’ط·آ§ط؛إ’ ط·آ¹ط·آ¶ط¸ث†ط؛إ’ط·ع¾ ط·آ¯ط·آ± ط·آ³ط·آ±ط·آ¢ط¸â€¦ط·آ¯</span>
            </div>

            <h2 className="text-3xl font-black mb-4 leading-tight">
              ط¸â€¦ط·آ³ط؛إ’ط·آ± ط·آ­ط·آ±ط¸ظ¾ط¸â€،أ¢â‚¬إ’ط·آ§ط؛إ’ ط·آ´ط·آ¯ط¸â€  ط·آ±ط·آ§ ط¸â€،ط¸â€¦ط؛إ’ط¸â€  ط·آ§ط¸â€¦ط·آ±ط¸ث†ط·آ² ط·آ´ط·آ±ط¸ث†ط·آ¹ ط¹آ©ط¸â€ 
            </h2>
            <p className="text-blue-100 leading-relaxed mb-10">
              ط·آ¨ط·آ§ ط·آ«ط·آ¨ط·ع¾أ¢â‚¬إ’ط¸â€ ط·آ§ط¸â€¦ ط·آ¯ط·آ± ط·آ³ط·آ±ط·آ¢ط¸â€¦ط·آ¯ط·إ’ ط·آ¨ط¸â€، ط¸â€،ط¸â€¦ط¸â€، ط·آ§ط¸â€¦ط¹آ©ط·آ§ط¸â€ ط·آ§ط·ع¾ ط·آ¢ط¸â€¦ط¸ث†ط·آ²ط·آ´ط؛إ’ ط¸â€¦ط·آ§ ط·آ¯ط·آ³ط·ع¾ط·آ±ط·آ³ط؛إ’ ط¸آ¾ط؛إ’ط·آ¯ط·آ§ ط¸â€¦ط؛إ’أ¢â‚¬إ’ط¹آ©ط¸â€ ط؛إ’ط·آ¯.
            </p>

            <div className="space-y-4">
              {[
                'ط·آ¯ط·آ³ط·ع¾ط·آ±ط·آ³ط؛إ’ ط·آ¨ط¸â€، ط؛آ¸ط؛آ°+ ط·آ¯ط¸ث†ط·آ±ط¸â€، ط·ع¾ط·آ®ط·آµط·آµط؛إ’',
                'ط¹آ©ط¸â€‍ط·آ§ط·آ³أ¢â‚¬إ’ط¸â€،ط·آ§ط؛إ’ ط·آ¢ط¸â€ ط¸â€‍ط·آ§ط؛إ’ط¸â€  ط·آ²ط¸â€ ط·آ¯ط¸â€، ط¸ث† ط·آ¶ط·آ¨ط·آ·أ¢â‚¬إ’ط·آ´ط·آ¯ط¸â€،',
                'ط¸آ¾ط·آ´ط·ع¾ط؛إ’ط·آ¨ط·آ§ط¸â€ ط؛إ’ ط؛آ²ط؛آ´/ط؛آ· ط·آ¯ط·آ± ط·ع¾ط¸â€¦ط·آ§ط¸â€¦ ط·آ³ط·آ§ط·آ¹ط·آ§ط·ع¾',
                'ط¸â€¦ط·آ¯ط·آ±ط¹آ© ط¸â€¦ط·آ¹ط·ع¾ط·آ¨ط·آ± ط¸آ¾ط·آ§ط؛إ’ط·آ§ط¸â€  ط·آ¯ط¸ث†ط·آ±ط¸â€،',
                'ط¸آ¾ط¸â€ ط¸â€‍ ط¹آ©ط·آ§ط·آ±ط·آ¨ط·آ±ط؛إ’ ط·آ§ط·آ®ط·ع¾ط·آµط·آ§ط·آµط؛إ’',
                'ط·آ§ط¸â€¦ط¹آ©ط·آ§ط¸â€  ط¸آ¾ط·آ±ط·آ¯ط·آ§ط·آ®ط·ع¾ ط·آ§ط¸â€ڑط·آ³ط·آ§ط·آ·ط؛إ’',
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