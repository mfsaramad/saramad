'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, User, Mail, Phone, Lock, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signUp(formData.email, formData.password, formData.name, formData.phone);
      
      if (!result.success) {
        setError(result.error || 'خطا در ثبت‌نام');
      } else {
        // هدایت به داشبورد پس از ثبت‌نام موفق
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message || 'خطای غیرمنتظره رخ داد');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50" dir="rtl">
      {/* سمت چپ: فرم ثبت‌نام */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-800 mb-2">ساخت حساب کاربری 🎉</h1>
            <p className="text-sm text-slate-500">در چند ثانیه ثبت‌نام کنید و شروع کنید</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">نام و نام خانوادگی *</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" required placeholder="مثلاً: علی محمدی" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ایمیل *</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required placeholder="example@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" dir="ltr" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">شماره تماس *</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="tel" required placeholder="09123456789" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" dir="ltr" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">رمز عبور *</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" required placeholder="حداقل ۶ کاراکتر" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" dir="ltr" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" required className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              <span className="text-xs text-slate-600">قوانین و حریم خصوصی سرآمد را می‌پذیرم.</span>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-l from-blue-800 to-teal-600 text-white font-bold py-3.5 rounded-xl hover:from-blue-900 hover:to-teal-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ساخت حساب کاربری'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            قبلاً ثبت‌نام کرده‌اید؟ <Link href="/login" className="text-blue-700 font-bold hover:underline">وارد شوید</Link>
          </div>
        </div>
      </div>

      {/* سمت راست: بنر گرافیکی */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] p-12 text-white flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-4 leading-tight">مسیر حرفه‌ای شدن را همین امروز شروع کن</h2>
          <p className="text-blue-100 text-lg mb-8">با ثبت‌نام در سرآمد، به همه امکانات آموزشی ما دسترسی پیدا می‌کنید.</p>
          <ul className="space-y-4 text-blue-50">
            <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5" /> دسترسی به ۸۰+ دوره تخصصی</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5" /> کلاس‌های آنلاین زنده و ضبط‌شده</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5" /> پشتیبانی ۲۴/۷ در تمام ساعات</li>
            <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5" /> مدرک معتبر پایان دوره</li>
          </ul>
        </div>
      </div>
    </div>
  );
}