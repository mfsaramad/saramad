'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || 'ایمیل یا رمز عبور اشتباه است.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50" dir="rtl">
      {/* سمت راست: فرم ورود */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-800 mb-2">ورود به حساب کاربری 👋</h1>
            <p className="text-sm text-slate-500">برای ورود به پنل کاربری، اطلاعات خود را وارد کنید.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-600">مرا به خاطر بسپار</span>
              </label>
              <Link href="/forgot-password" className="text-blue-700 font-bold hover:underline">
                فراموشی رمز عبور؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-l from-blue-800 to-teal-600 hover:from-blue-900 hover:to-teal-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ورود به حساب'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            حساب کاربری ندارید؟{' '}
            <Link href="/register" className="text-blue-700 font-bold hover:underline">
              همین حالا ثبت‌نام کنید
            </Link>
          </div>
        </div>
      </div>

      {/* سمت چپ: بنر گرافیکی */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] p-12 text-white flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-4 leading-tight">مسیر حرفه‌ای شدن را همین امروز شروع کن</h2>
          <p className="text-blue-100 text-lg mb-8">با ورود به سرآمد، به تمام دوره‌ها، آزمون‌ها و مدارک خود دسترسی خواهید داشت.</p>
          <ul className="space-y-4 text-blue-50">
            <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</div> دسترسی به دوره‌های تخصصی</li>
            <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</div> پشتیبانی ۲۴/۷ در تمام ساعات</li>
            <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">✓</div> مدرک معتبر پایان دوره</li>
          </ul>
        </div>
      </div>
    </div>
  );
}