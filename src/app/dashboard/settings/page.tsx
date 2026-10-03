'use client';

import { useState } from 'react';
import {
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  Shield,
  Smartphone,
  Mail,
  MessageSquare,
  Zap,
  Sparkles,
  AlertTriangle,
  Globe,
  Moon,
} from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
    courseUpdates: true,
    examResults: true,
    promotions: false,
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert('رمز عبور جدید و تکرار آن یکسان نیستند!');
      return;
    }
    alert('رمز عبور با موفقیت تغییر کرد! (نمونه)');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const notificationItems = [
    {
      key: 'emailNotif' as const,
      icon: Mail,
      title: 'اعلان‌های ایمیلی',
      description: 'دریافت اعلان‌ها از طریق ایمیل',
      color: 'brand' as const,
    },
    {
      key: 'smsNotif' as const,
      icon: Smartphone,
      title: 'اعلان‌های پیامکی',
      description: 'دریافت اعلان‌ها از طریق پیامک',
      color: 'teal' as const,
    },
    {
      key: 'pushNotif' as const,
      icon: Bell,
      title: 'اعلان‌های مرورگر',
      description: 'دریافت اعلان‌ها در مرورگر',
      color: 'accent' as const,
    },
    {
      key: 'courseUpdates' as const,
      icon: Globe,
      title: 'بروزرسانی دوره‌ها',
      description: 'اطلاع از دوره‌های جدید و تخفیف‌ها',
      color: 'purple' as const,
    },
    {
      key: 'examResults' as const,
      icon: MessageSquare,
      title: 'نتایج آزمون‌ها',
      description: 'اطلاع از نتایج آزمون‌ها',
      color: 'brand' as const,
    },
    {
      key: 'promotions' as const,
      icon: Zap,
      title: 'پیشنهادات ویژه',
      description: 'دریافت پیشنهادات و تخفیف‌های ویژه',
      color: 'teal' as const,
    },
  ];

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-950/50',
      icon: 'text-purple-600 dark:text-purple-300',
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-300" />
              <span>تنظیمات</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black mb-2">
              تنظیمات ⚙️
            </h1>
            <p className="text-blue-100 text-sm lg:text-base">
              تنظیمات حساب کاربری، اعلان‌ها و امنیت خود را مدیریت کن
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Notifications */}
      <FadeIn delay={0.1}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
              <Bell className="w-5 h-5 text-brand-800 dark:text-brand-300" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
                اعلان‌ها
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                نحوه دریافت اعلان‌ها را انتخاب کن
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {notificationItems.map((item) => {
              const Icon = item.icon;
              const isActive = settings[item.key];
              const colors = colorMap[item.color];

              return (
                <div
                  key={item.key}
                  className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all',
                      isActive
                        ? colors.bg
                        : 'bg-slate-100 dark:bg-slate-800'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5',
                        isActive
                          ? colors.icon
                          : 'text-slate-500 dark:text-slate-400'
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={cn(
                      'relative w-12 h-7 rounded-full transition-colors flex-shrink-0',
                      isActive
                        ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488]'
                        : 'bg-slate-200 dark:bg-slate-700'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all',
                        isActive ? 'right-1' : 'right-6'
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition-all hover:gap-3"
            >
              <Save className="w-4 h-4" />
              ذخیره تنظیمات
            </button>

            {saved && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-xl text-sm font-bold animate-fade-up">
                <CheckCircle2 className="w-4 h-4" />
                ذخیره شد!
              </span>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Security - Change Password */}
      <FadeIn delay={0.15}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
              <Lock className="w-5 h-5 text-orange-600 dark:text-orange-300" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
                امنیت حساب
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                رمز عبور خود را تغییر ده
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                رمز عبور فعلی
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  value={passwordData.current}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      current: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  className="w-full pr-11 pl-11 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      current: !showPassword.current,
                    })
                  }
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 transition"
                >
                  {showPassword.current ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                رمز عبور جدید
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  value={passwordData.new}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, new: e.target.value })
                  }
                  placeholder="حداقل ۶ کاراکتر"
                  className="w-full pr-11 pl-11 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      new: !showPassword.new,
                    })
                  }
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 transition"
                >
                  {showPassword.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                تکرار رمز عبور جدید
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm: e.target.value,
                    })
                  }
                  placeholder="رمز عبور را دوباره وارد کنید"
                  className="w-full pr-11 pl-11 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirm: !showPassword.confirm,
                    })
                  }
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 transition"
                >
                  {showPassword.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#f97316] to-[#ea580c] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:gap-3"
            >
              <Lock className="w-4 h-4" />
              تغییر رمز عبور
            </button>
          </form>
        </div>
      </FadeIn>

      {/* Theme Settings */}
      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
              <Moon className="w-5 h-5 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
                ظاهر سایت
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                حالت نمایش سایت را تغییر ده
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-50 to-teal-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-5 border border-brand-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center">
                <Moon className="w-5 h-5 text-brand-800 dark:text-brand-300" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">
                  حالت تاریک / روشن
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  با استفاده از دکمه‌ی بالای صفحه، حالت نمایش را تغییر دهید
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Danger Zone */}
      <FadeIn delay={0.25}>
        <div className="bg-red-50 dark:bg-red-950/20 rounded-3xl p-6 lg:p-8 border-2 border-red-200 dark:border-red-900/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-300" />
            </div>
            <div>
              <h2 className="text-lg font-black text-red-700 dark:text-red-300">
                منطقه خطر
              </h2>
              <p className="text-xs text-red-600 dark:text-red-400">
                عملیات غیرقابل بازگشت
              </p>
            </div>
          </div>

          <p className="text-sm text-red-700 dark:text-red-300 mb-5 leading-relaxed">
            با حذف حساب کاربری، تمام اطلاعات، دوره‌ها، مدارک و پیشرفت شما پاک
            خواهد شد. این عملیات قابل بازگشت نیست.
          </p>

          <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all hover:gap-3 hover:scale-105 shadow-lg shadow-red-500/30">
            <Shield className="w-4 h-4" />
            حذف حساب کاربری
          </button>
        </div>
      </FadeIn>
    </div>
  );
}