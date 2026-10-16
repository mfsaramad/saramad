'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  BookOpen,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  ClipboardList,
  GraduationCap,
  Award,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Sparkles,
} from 'lucide-react';
import { toPersianNumber, formatPrice } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

const topStats = [
  {
    icon: Users,
    label: 'کاربران فعال',
    value: 5240,
    suffix: '',
    trend: +12.5,
    trendLabel: 'نسبت به ماه قبل',
    color: 'brand' as const,
  },
  {
    icon: ShoppingBag,
    label: 'سفارشات ماه',
    value: 1248,
    suffix: '',
    trend: +8.2,
    trendLabel: 'نسبت به ماه قبل',
    color: 'teal' as const,
  },
  {
    icon: DollarSign,
    label: 'درآمد ماه',
    value: 285000000,
    suffix: ' تومان',
    trend: +23.1,
    trendLabel: 'نسبت به ماه قبل',
    color: 'accent' as const,
  },
  {
    icon: GraduationCap,
    label: 'دوره‌های فعال',
    value: 86,
    suffix: '',
    trend: +5.4,
    trendLabel: 'نسبت به ماه قبل',
    color: 'purple' as const,
  },
];

const recentOrders = [
  {
    id: 'SRM-1404-1248',
    user: 'علی محمدی',
    item: 'برنامه‌نویسی پایتون',
    amount: 3139200,
    status: 'completed',
    date: '۵ دقیقه پیش',
  },
  {
    id: 'SRM-1404-1247',
    user: 'زهرا احمدی',
    item: 'طراحی گرافیک',
    amount: 4800000,
    status: 'paid',
    date: '۲۰ دقیقه پیش',
  },
  {
    id: 'SRM-1404-1246',
    user: 'رضا کریمی',
    item: 'دیجیتال مارکتینگ',
    amount: 3600000,
    status: 'pending',
    date: '۱ ساعت پیش',
  },
  {
    id: 'SRM-1404-1245',
    user: 'مریم رضایی',
    item: 'مکالمه انگلیسی',
    amount: 2746800,
    status: 'completed',
    date: '۲ ساعت پیش',
  },
  {
    id: 'SRM-1404-1244',
    user: 'حسین نوری',
    item: 'پکیج سوالات',
    amount: 327000,
    status: 'cancelled',
    date: '۳ ساعت پیش',
  },
];

const topCourses = [
  {
    title: 'برنامه‌نویسی پایتون',
    students: 1240,
    revenue: 3977600000,
    rating: 4.9,
    trend: +15,
  },
  {
    title: 'طراحی گرافیک',
    students: 1120,
    revenue: 5376000000,
    rating: 4.9,
    trend: +12,
  },
  {
    title: 'مکالمه انگلیسی',
    students: 1560,
    revenue: 4368000000,
    rating: 4.9,
    trend: +18,
  },
  {
    title: 'اکسل پیشرفته',
    students: 1340,
    revenue: 2956800000,
    rating: 4.8,
    trend: +8,
  },
  {
    title: 'دیجیتال مارکتینگ',
    students: 720,
    revenue: 2592000000,
    rating: 4.8,
    trend: +5,
  },
];

const statusConfig = {
  completed: {
    label: 'تکمیل شده',
    icon: CheckCircle2,
    color: 'teal' as const,
  },
  paid: { label: 'پرداخت شده', icon: DollarSign, color: 'brand' as const },
  pending: { label: 'در انتظار', icon: Clock, color: 'accent' as const },
  cancelled: { label: 'لغو شده', icon: XCircle, color: 'red' as const },
};

const sidebarItems = [
  { icon: LayoutDashboard, label: 'داشبورد', href: '/admin', active: true },
  { icon: ShoppingBag, label: 'سفارشات', href: '/admin/orders', badge: '۱۲' },
  { icon: Users, label: 'کاربران', href: '/admin/users' },
  { icon: BookOpen, label: 'دوره‌ها', href: '/admin/courses' },
  { icon: Package, label: 'محصولات', href: '/admin/products' },
  { icon: ClipboardList, label: 'آزمون‌ها', href: '/admin/exams' },
  { icon: Award, label: 'مدارک', href: '/admin/certificates' },
  { icon: FileText, label: 'وبلاگ', href: '/admin/blog' },
  { icon: Bell, label: 'اعلانات', href: '/admin/notifications', badge: '۳' },
  { icon: Settings, label: 'تنظیمات', href: '/admin/settings' },
];

const colorMap = {
  brand: {
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    icon: 'text-blue-800 dark:text-blue-300',
    gradient: 'from-blue-500 to-blue-700',
  },
  teal: {
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    icon: 'text-teal-600 dark:text-teal-300',
    gradient: 'from-teal-500 to-teal-700',
  },
  accent: {
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    icon: 'text-orange-600 dark:text-orange-300',
    gradient: 'from-orange-500 to-orange-700',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    icon: 'text-purple-600 dark:text-purple-300',
    gradient: 'from-purple-500 to-purple-700',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-950/50',
    icon: 'text-red-600 dark:text-red-300',
    gradient: 'from-red-500 to-red-700',
  },
};

export default function AdminPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ============ Sidebar ============ */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Admin Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />

                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 via-brand-500 to-purple-500 p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-2xl font-black text-brand-800 dark:text-brand-300">
                          م
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-4 border-white dark:border-slate-900" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-black text-white truncate">
                        مدیر سرآمد
                      </div>
                      <div className="text-xs text-blue-100">
                        مدیر کل سیستم
                      </div>
                      <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-orange-500/30 backdrop-blur border border-orange-400/50 rounded-full text-[10px] font-bold text-white">
                        <Sparkles className="w-3 h-3" />
                        <span>دسترسی کامل</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <nav className="p-3 space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                          item.active
                            ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        )}
                      >
                        <Icon
                          className={cn(
                            'w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110',
                            item.active
                              ? 'text-white'
                              : 'text-slate-500 dark:text-slate-400'
                          )}
                        />
                        <span className="flex-1">{item.label}</span>

                        {item.badge && (
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded-full text-[10px] font-black',
                              item.active
                                ? 'bg-white/20 text-white'
                                : 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300'
                            )}
                          >
                            {toPersianNumber(item.badge)}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Action */}
              <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-orange-300" />
                  </div>

                  <h4 className="font-black text-lg mb-2">گزارش کامل</h4>
                  <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                    دانلود گزارش کامل از وضعیت فروش، کاربران و دوره‌ها
                  </p>

                  <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-brand-800 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all hover:gap-3">
                    <Download className="w-4 h-4" />
                    دانلود گزارش
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* ============ Main Content ============ */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Header */}
            <FadeIn>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-xs font-bold mb-2">
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>پنل مدیریت</span>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-black text-slate-800 dark:text-slate-100">
                      داشبورد مدیریت 🎯
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      خوش آمدی! یه نگاه کلی به وضعیت سایت سرآمد
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="relative w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition">
                      <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
                    </button>

                    <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                      <Download className="w-4 h-4" />
                      دانلود گزارش
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topStats.map((stat, index) => {
                const Icon = stat.icon;
                const colors = colorMap[stat.color];
                const isUp = stat.trend > 0;

                return (
                  <FadeIn key={index} delay={index * 0.08}>
                    <div className="group bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={cn(
                            'w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform',
                            colors.bg
                          )}
                        >
                          <Icon className={cn('w-6 h-6', colors.icon)} />
                        </div>

                        <div
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-black',
                            isUp
                              ? 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300'
                              : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300'
                          )}
                        >
                          {isUp ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {toPersianNumber(Math.abs(stat.trend))}٪
                        </div>
                      </div>

                      <div className="text-2xl lg:text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">
                        {stat.value >= 1000000
                          ? formatPrice(stat.value)
                          : toPersianNumber(stat.value)}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        {stat.label}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">
                        {stat.trendLabel}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Charts + Recent Orders */}
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Revenue Chart (Placeholder) */}
              <FadeIn delay={0.2} className="lg:col-span-3">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 h-full">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                        درآمد ۶ ماه اخیر
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        نمودار رشد درآمد ماهانه
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-lg text-xs font-bold">
                        ۶ ماه
                      </button>
                      <button className="px-3 py-1.5 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                        ۱ سال
                      </button>
                    </div>
                  </div>

                  {/* Simple Bar Chart */}
                  <div className="h-64 flex items-end justify-between gap-3">
                    {[45, 62, 38, 75, 55, 88].map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div className="w-full flex items-end justify-center h-52">
                          <div
                            className="w-full max-w-[40px] rounded-t-xl bg-gradient-to-t from-[#1e3a8a] via-[#1e40af] to-[#0d9488] transition-all hover:opacity-80 relative group/bar"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap">
                              {formatPrice(height * 4000000)}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {['مرد', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر'][idx]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-center">
                      <div className="text-xl font-black text-brand-800 dark:text-brand-300">
                        {formatPrice(1450000000)}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        میانگین ماهانه
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black text-teal-600 dark:text-teal-400">
                        {formatPrice(285000000)}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        بهترین ماه
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black text-orange-600 dark:text-orange-400">
                        +۲۳٪
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        رشد ماهانه
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Recent Orders */}
              <FadeIn delay={0.25} className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                        سفارشات اخیر
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        آخرین ۵ سفارش
                      </p>
                    </div>

                    <Link
                      href="/admin/orders"
                      className="text-xs font-bold text-brand-800 dark:text-brand-300 hover:underline"
                    >
                      مشاهده همه
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {recentOrders.map((order, idx) => {
                      const status = statusConfig[order.status as keyof typeof statusConfig];
                      const StatusIcon = status.icon;
                      const colors = colorMap[status.color];

                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition group"
                        >
                          <div
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                              colors.bg
                            )}
                          >
                            <StatusIcon className={cn('w-5 h-5', colors.icon)} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                              {order.user}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {order.item}
                            </div>
                          </div>

                          <div className="text-left flex-shrink-0">
                            <div className="text-sm font-black text-brand-800 dark:text-brand-300">
                              {formatPrice(order.amount)}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {order.date}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Top Courses + Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Top Courses */}
              <FadeIn delay={0.3} className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                        دوره‌های پرفروش
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        برترین دوره‌ها بر اساس فروش
                      </p>
                    </div>

                    <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition">
                      <MoreHorizontal className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {topCourses.map((course, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center text-white font-black flex-shrink-0">
                          {toPersianNumber(idx + 1)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                            {course.title}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <span>👥 {toPersianNumber(course.students)} دانشجو</span>
                            <span>⭐ {course.rating.toLocaleString('fa-IR')}</span>
                          </div>
                        </div>

                        <div className="text-left flex-shrink-0">
                          <div className="text-sm font-black text-brand-800 dark:text-brand-300">
                            {formatPrice(course.revenue)}
                          </div>
                          <div className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">
                            +{toPersianNumber(course.trend)}٪
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Quick Actions */}
              <FadeIn delay={0.35}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 h-full">
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5">
                    دسترسی سریع
                  </h3>

                  <div className="space-y-2">
                    {[
                      { icon: ShoppingBag, label: 'سفارشات', color: 'brand' as const },
                      { icon: Users, label: 'کاربران', color: 'teal' as const },
                      { icon: BookOpen, label: 'دوره‌ها', color: 'accent' as const },
                      { icon: Package, label: 'محصولات', color: 'purple' as const },
                      { icon: ClipboardList, label: 'آزمون‌ها', color: 'brand' as const },
                      { icon: FileText, label: 'وبلاگ', color: 'teal' as const },
                    ].map((action, idx) => {
                      const Icon = action.icon;
                      const colors = colorMap[action.color];

                      return (
                        <button
                          key={idx}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition group text-right"
                        >
                          <div
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform',
                              colors.bg
                            )}
                          >
                            <Icon className={cn('w-5 h-5', colors.icon)} />
                          </div>

                          <span className="flex-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                            {action.label}
                          </span>

                          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-800 dark:group-hover:text-brand-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}