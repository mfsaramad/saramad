'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Camera,
  CheckCircle2,
  Sparkles,
  Shield,
  Award,
  TrendingUp,
  Briefcase,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toPersianNumber } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  user_id?: string;
  items: { type: string; title: string }[];
  status: string;
  created_at: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    bio: '',
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // دریافت اطلاعات پروفایل و سفارشات از Supabase
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // 1. گرفتن اطلاعات کاربر از Supabase Auth
        const { data: { user: sbUser } } = await supabase.auth.getUser();
        if (sbUser) {
          setFormData({
            name: sbUser.user_metadata?.name || user.name || '',
            email: sbUser.email || user.email || '',
            phone: sbUser.user_metadata?.phone || '',
            city: sbUser.user_metadata?.city || '',
            bio: sbUser.user_metadata?.bio || '',
          });
        }

        // 2. گرفتن سفارشات کاربر برای نمایش آمار
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id);
          
        if (ordersData) {
          setOrders(ordersData);
        }
      } catch (err) {
        console.error('خطا در دریافت اطلاعات:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // ذخیره تغییرات در Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');
    setSaved(false);

    try {
      // آپدیت متادیتای کاربر در Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          bio: formData.bio,
        },
      });

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'خطا در ذخیره اطلاعات');
    } finally {
      setIsSaving(false);
    }
  };

  // محاسبه آمار واقعی از دیتابیس
  const completedOrders = orders.filter((o) => o.status === 'completed');
  const completedCourses = completedOrders.filter((o) =>
    o.items?.some((i) => i.type === 'course')
  ).length;
  
  // فعلاً چون جدول آزمون‌ها رو وصل نکردیم، این‌ها رو 0 می‌ذاریم
  const passedExams = 0; 
  const certificates = 0;

  const joinedDate = new Date(user?.id ? Date.now() : Date.now()).toLocaleDateString('fa-IR'); // یک تاریخ ساده برای نمایش

  const accountInfo = [
    { icon: Calendar, label: 'تاریخ عضویت', value: joinedDate, color: 'brand' as const },
    { icon: CheckCircle2, label: 'وضعیت', value: 'فعال', color: 'teal' as const },
    { icon: Award, label: 'سطح', value: 'طلایی', color: 'accent' as const },
    {
      icon: Briefcase,
      label: 'نقش',
      value:
        user?.role === 'admin'
          ? 'مدیر'
          : user?.role === 'instructor'
          ? 'استاد'
          : 'دانشجو',
      color: 'purple' as const,
    },
  ];

  const colorMap = {
    brand: { bg: 'bg-blue-100 dark:bg-blue-950/50', icon: 'text-blue-800 dark:text-blue-300' },
    teal: { bg: 'bg-teal-100 dark:bg-teal-950/50', icon: 'text-teal-600 dark:text-teal-300' },
    accent: { bg: 'bg-orange-100 dark:bg-orange-950/50', icon: 'text-orange-600 dark:text-orange-300' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-950/50', icon: 'text-purple-600 dark:text-purple-300' },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const avatarLetter = formData.name?.charAt(0) || 'م';

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-300" />
              <span>پروفایل من</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black mb-2">پروفایل من 👤</h1>
            <p className="text-blue-100 text-sm lg:text-base">اطلاعات شخصی خود را مدیریت کنید و از پیشرفت تحصیلی خود مطلع شوید</p>
          </div>
        </div>
      </FadeIn>

      {/* Profile Card */}
      <FadeIn delay={0.1}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 via-brand-500 to-orange-500 p-1.5 shadow-2xl group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-5xl font-black text-brand-800 dark:text-brand-300">
                  {avatarLetter}
                </div>
              </div>
              <button className="absolute bottom-1 left-1 w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition shadow-lg shadow-orange-500/30 hover:scale-110">
                <Camera className="w-4 h-4" />
              </button>
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 border-4 border-white dark:border-slate-900" />
            </div>

            <div className="text-center sm:text-right flex-1">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">{formData.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                {user?.role === 'admin' ? 'مدیر سیستم' : user?.role === 'instructor' ? 'استاد' : 'دانشجوی سرآمد'}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> حساب تأیید شده
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 rounded-full text-xs font-bold">
                  <Award className="w-3.5 h-3.5" /> سطح طلایی
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/30 border-r-4 border-red-500 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-300 text-sm font-bold">
              <AlertCircle className="w-5 h-5" /> {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">نام و نام خانوادگی</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">ایمیل</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    dir="ltr"
                    className="w-full pr-11 pl-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 cursor-not-allowed text-left"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">شماره تماس</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    dir="ltr"
                    placeholder="09123456789"
                    className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition text-left"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">شهر</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="مثلاً: تبریز"
                    className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">درباره من</label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="یه توضیح کوتاه درباره خودت..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition-all hover:gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </button>

              {saved && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4" /> با موفقیت ذخیره شد!
                </div>
              )}
            </div>
          </form>
        </div>
      </FadeIn>

      {/* Account Info */}
      <FadeIn delay={0.15}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-800 dark:text-brand-300" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">اطلاعات حساب</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">اطلاعات کلی حساب کاربری شما</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accountInfo.map((info, index) => {
              const Icon = info.icon;
              const colors = colorMap[info.color];

              return (
                <div key={index} className="group flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform', colors.bg)}>
                    <Icon className={cn('w-5 h-5', colors.icon)} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{info.label}</div>
                    <div className={cn('text-sm font-bold', info.color === 'teal' ? 'text-teal-600 dark:text-teal-300' : info.color === 'accent' ? 'text-orange-600 dark:text-orange-300' : 'text-slate-800 dark:text-slate-100')}>
                      {info.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.2}>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-teal-300" />
              </div>
              <div className="text-3xl font-black mb-1">{toPersianNumber(completedCourses)}</div>
              <div className="text-xs text-blue-100">دوره‌های تکمیل‌شده</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-teal-600 dark:text-teal-300" />
            </div>
            <div className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">{toPersianNumber(certificates)}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">مدرک کسب‌شده</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-300" />
            </div>
            <div className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">{toPersianNumber(passedExams)}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">آزمون‌های قبول‌شده</div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}