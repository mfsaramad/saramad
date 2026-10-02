'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Camera,
  CheckCircle2,
} from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'کاربر مهمان',
    email: 'user@example.com',
    phone: '۰۹۳۶۲۸۴۷۹۲۲',
    city: 'تبریز',
    bio: 'علاقه‌مند به یادگیری مهارت‌های جدید و توسعه فردی',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
              <User className="w-6 h-6 text-teal-300" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-black">پروفایل من</h1>
          </div>
          <p className="text-blue-100 text-sm lg:text-base">
            اطلاعات شخصی و پروفایل کاربری خود را مدیریت کن
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center text-white text-4xl font-black shadow-xl">
              ک
            </div>
            <button className="absolute bottom-0 left-0 w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center sm:text-right">
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">
              {formData.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              دانشجوی سرآمد
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              حساب تأیید شده
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                نام و نام خانوادگی
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                />
                <User className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                ایمیل
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                شماره تماس
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                شهر
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              درباره من
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              ذخیره تغییرات
            </button>

            {saved && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-xl text-sm font-bold">
                <CheckCircle2 className="w-4 h-4" />
                ذخیره شد!
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Account Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5">
          اطلاعات حساب
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-blue-800 dark:text-blue-300" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                تاریخ عضویت
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                ۱۴۰۴/۰۵/۰۱
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-300" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                وضعیت
              </div>
              <div className="text-sm font-bold text-teal-600 dark:text-teal-300">
                فعال
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}