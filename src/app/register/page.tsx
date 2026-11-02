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

    // ط§ط¹طھط¨ط§ط±ط³ظ†ط¬غŒ
    if (formData.password !== formData.confirmPassword) {
      setError('ط±ظ…ط² ط¹ط¨ظˆط± ظˆ طھع©ط±ط§ط± ط¢ظ† غŒع©ط³ط§ظ† ظ†غŒط³طھظ†ط¯!');
      return;
    }

    if (formData.password.length < 6) {
      setError('ط±ظ…ط² ط¹ط¨ظˆط± ط¨ط§غŒط¯ ط­ط¯ط§ظ‚ظ„ غ¶ ع©ط§ط±ط§ع©طھط± ط¨ط§ط´ط¯.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('ظ„ط·ظپط§ظ‹ ظ‚ظˆط§ظ†غŒظ† ظˆ ظ…ظ‚ط±ط±ط§طھ ط±ط§ ط¨ظ¾ط°غŒط±غŒط¯.');
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
        return; // finally ط¨ط§ط¹ط« ظ…غŒط´ظ‡ isLoading ظپط§ظ„ط³ ط¨ط´ظ‡
      }

      setSuccess(true);

      // ط¨ط¹ط¯ ط§ط² غ³ ط«ط§ظ†غŒظ‡ ط¨ط±ظˆ ط¨ظ‡ ط¯ط§ط´ط¨ظˆط±ط¯
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

    } catch (err) {
      setError('ط®ط·ط§ ط¯ط± ط¨ط±ظ‚ط±ط§ط±غŒ ط§ط±طھط¨ط§ط· ط¨ط§ ط³ط±ظˆط±. ظ„ط·ظپط§ظ‹ ط¯ظˆط¨ط§ط±ظ‡ طھظ„ط§ط´ ع©ظ†غŒط¯.');
    } finally {
      // ط§غŒظ† ط¨ظ„ط§ع© ط­طھظ…ط§ظ‹ ط§ط¬ط±ط§ ظ…غŒط´ظ‡طŒ ع†ظ‡ ط®ط·ط§ ط¨ط¯ظ‡ ع†ظ‡ ظ…ظˆظپظ‚غŒطھâ€Œط¢ظ…غŒط² ط¨ط§ط´ظ‡
      setIsLoading(false);
    }
  };

  // طµظپط­ظ‡ ظ…ظˆظپظ‚غŒطھ
  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/30 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
          </div>

          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">
            ًںژ‰ ط«ط¨طھâ€Œظ†ط§ظ… ظ…ظˆظپظ‚!
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            ط­ط³ط§ط¨ ع©ط§ط±ط¨ط±غŒ ط´ظ…ط§ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط³ط§ط®طھظ‡ ط´ط¯.
            <br />
            ط¯ط± ط­ط§ظ„ ط§ظ†طھظ‚ط§ظ„ ط¨ظ‡ ط¯ط§ط´ط¨ظˆط±ط¯...
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-4 h-4 border-2 border-brand-800 border-t-transparent rounded-full animate-spin" />
            <span>ظ„ط·ظپط§ظ‹ طµط¨ط± ع©ظ†غŒط¯</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* ===== ظپط±ظ… ط«ط¨طھâ€Œظ†ط§ظ… ===== */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* ظ„ظˆع¯ظˆ */}
            <Link
              href="/"
              className="flex items-center gap-3 mb-8 justify-center"
            >
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="ط¢ظ…ظˆط²ط´ع¯ط§ظ‡ ط³ط±ط¢ظ…ط¯"
                  className="w-full h-full object-contain dark:hidden"
                />
                <img
                  src="/logo-white.png"
                  alt="ط¢ظ…ظˆط²ط´ع¯ط§ظ‡ ط³ط±ط¢ظ…ط¯"
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
              <div>
                <div className="text-2xl font-black text-brand-800 dark:text-brand-100">
                  ط³ط±ط¢ظ…ط¯
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  ظ…ط¬طھظ…ط¹ ط¢ظ…ظˆط²ط´ ظپظ†غŒ ظˆ ط­ط±ظپظ‡â€Œط§غŒ
                </div>
              </div>
            </Link>

            {/* ط¹ظ†ظˆط§ظ† */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                ط³ط§ط®طھ ط­ط³ط§ط¨ ع©ط§ط±ط¨ط±غŒ ًںژ‰
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                ط¯ط± ع†ظ†ط¯ ط«ط§ظ†غŒظ‡ ط«ط¨طھâ€Œظ†ط§ظ… ع©ظ†غŒط¯ ظˆ ط´ط±ظˆط¹ ع©ظ†غŒط¯
              </p>
            </div>

            {/* ط®ط·ط§ */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/30 border-r-4 border-red-500 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300 font-bold">
                  {error}
                </p>
              </div>
            )}

            {/* ظپط±ظ… */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ظ†ط§ظ… */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ظ†ط§ظ… ظˆ ظ†ط§ظ… ط®ط§ظ†ظˆط§ط¯ع¯غŒ *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="ظ…ط«ظ„ط§ظ‹: ط¹ظ„غŒ ظ…ط­ظ…ط¯غŒ"
                    disabled={isLoading}
                    className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                  />
                  <User className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* ط§غŒظ…غŒظ„ */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ط§غŒظ…غŒظ„ *
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

              {/* ط´ظ…ط§ط±ظ‡ طھظ…ط§ط³ */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ط´ظ…ط§ط±ظ‡ طھظ…ط§ط³ *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="غ°غ¹غ³غ¶غ²غ¸غ´غ·غ¹غ²غ²"
                    disabled={isLoading}
                    className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-950/50 transition disabled:opacity-60"
                  />
                  <Phone className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              {/* ط±ظ…ط² ط¹ط¨ظˆط± */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  ط±ظ…ط² ط¹ط¨ظˆط± *
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
                    placeholder="ط­ط¯ط§ظ‚ظ„ غ¶ ع©ط§ط±ط§ع©طھط±"
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

              {/* طھع©ط±ط§ط± ط±ظ…ط² ط¹ط¨ظˆط± */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  طھع©ط±ط§ط± ط±ظ…ط² ط¹ط¨ظˆط± *
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
                    placeholder="ط±ظ…ط² ط¹ط¨ظˆط± ط±ط§ ط¯ظˆط¨ط§ط±ظ‡ ظˆط§ط±ط¯ ع©ظ†غŒط¯"
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

              {/* ظ‚ظˆط§ظ†غŒظ† */}
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
                    ظ‚ظˆط§ظ†غŒظ† ظˆ ظ…ظ‚ط±ط±ط§طھ
                  </Link>{' '}
                  ظˆ{' '}
                  <Link
                    href="/privacy"
                    className="text-brand-800 dark:text-brand-300 font-bold hover:underline"
                  >
                    ط­ط±غŒظ… ط®طµظˆطµغŒ
                  </Link>{' '}
                  ط³ط±ط¢ظ…ط¯ ط±ط§ ظ…غŒâ€Œظ¾ط°غŒط±ظ….
                </span>
              </label>

              {/* ط¯ع©ظ…ظ‡ ط«ط¨طھâ€Œظ†ط§ظ… */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02] mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ط¯ط± ط­ط§ظ„ ط³ط§ط®طھ ط­ط³ط§ط¨...
                  </>
                ) : (
                  <>
                    ط³ط§ط®طھ ط­ط³ط§ط¨ ع©ط§ط±ط¨ط±غŒ
                    <ArrowLeft className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* ظˆط±ظˆط¯ */}
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm pt-2">
                ظ‚ط¨ظ„ط§ظ‹ ط«ط¨طھâ€Œظ†ط§ظ… ع©ط±ط¯ظ‡â€Œط§غŒط¯طں{' '}
                <Link
                  href="/login"
                  className="text-brand-800 dark:text-brand-300 font-black hover:underline"
                >
                  ظˆط§ط±ط¯ ط´ظˆغŒط¯
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* ===== ط¨ط®ط´ طھط¨ظ„غŒط؛ط§طھغŒ ===== */}
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
              <span>ظ…ط²ط§غŒط§غŒ ط¹ط¶ظˆغŒطھ ط¯ط± ط³ط±ط¢ظ…ط¯</span>
            </div>

            <h2 className="text-3xl font-black mb-4 leading-tight">
              ظ…ط³غŒط± ط­ط±ظپظ‡â€Œط§غŒ ط´ط¯ظ† ط±ط§ ظ‡ظ…غŒظ† ط§ظ…ط±ظˆط² ط´ط±ظˆط¹ ع©ظ†
            </h2>
            <p className="text-blue-100 leading-relaxed mb-10">
              ط¨ط§ ط«ط¨طھâ€Œظ†ط§ظ… ط¯ط± ط³ط±ط¢ظ…ط¯طŒ ط¨ظ‡ ظ‡ظ…ظ‡ ط§ظ…ع©ط§ظ†ط§طھ ط¢ظ…ظˆط²ط´غŒ ظ…ط§ ط¯ط³طھط±ط³غŒ ظ¾غŒط¯ط§ ظ…غŒâ€Œع©ظ†غŒط¯.
            </p>

            <div className="space-y-4">
              {[
                'ط¯ط³طھط±ط³غŒ ط¨ظ‡ غ¸غ°+ ط¯ظˆط±ظ‡ طھط®طµطµغŒ',
                'ع©ظ„ط§ط³â€Œظ‡ط§غŒ ط¢ظ†ظ„ط§غŒظ† ط²ظ†ط¯ظ‡ ظˆ ط¶ط¨ط·â€Œط´ط¯ظ‡',
                'ظ¾ط´طھغŒط¨ط§ظ†غŒ غ²غ´/غ· ط¯ط± طھظ…ط§ظ… ط³ط§ط¹ط§طھ',
                'ظ…ط¯ط±ع© ظ…ط¹طھط¨ط± ظ¾ط§غŒط§ظ† ط¯ظˆط±ظ‡',
                'ظ¾ظ†ظ„ ع©ط§ط±ط¨ط±غŒ ط§ط®طھطµط§طµغŒ',
                'ط§ظ…ع©ط§ظ† ظ¾ط±ط¯ط§ط®طھ ط§ظ‚ط³ط§ط·غŒ',
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