'use client';

import { useState, useMemo } from 'react';
import {
  FileText,
  BookOpen,
  Video,
  Package,
  Star,
  ShoppingCart,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { toPersianNumber, formatPrice } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'questions' | 'book' | 'video';

const products = [
  {
    id: '1',
    title: 'پکیج سوالات آزمون فنی و حرفه‌ای',
    description: 'مجموعه کامل سوالات آزمون‌های فنی و حرفه‌ای با پاسخ تشریحی',
    type: 'questions',
    typeLabel: 'سوالات',
    price: 350000,
    originalPrice: 500000,
    icon: FileText,
    color: 'brand' as const,
    rating: 4.9,
    salesCount: 1240,
    badge: 'پرفروش',
  },
  {
    id: '2',
    title: 'جزوه جامع برنامه‌نویسی پایتون',
    description: 'جزوه PDF کامل آموزش پایتون همراه با تمرین و پروژه‌های عملی',
    type: 'book',
    typeLabel: 'جزوه',
    price: 280000,
    originalPrice: null,
    icon: BookOpen,
    color: 'teal' as const,
    rating: 4.8,
    salesCount: 890,
    badge: null,
  },
  {
    id: '3',
    title: 'ویدیوهای ضبط‌شده دوره طراحی گرافیک',
    description: 'دسترسی مادام‌العمر به ویدیوهای ضبط‌شده دوره گرافیک',
    type: 'video',
    typeLabel: 'ویدیو',
    price: 1200000,
    originalPrice: 1800000,
    icon: Video,
    color: 'accent' as const,
    rating: 5.0,
    salesCount: 560,
    badge: 'تخفیف ویژه',
  },
  {
    id: '4',
    title: 'پکیج سوالات آزمون برنامه‌نویسی',
    description: 'مجموعه سوالات تخصصی برنامه‌نویسی با پاسخ‌های تشریحی',
    type: 'questions',
    typeLabel: 'سوالات',
    price: 320000,
    originalPrice: 450000,
    icon: FileText,
    color: 'brand' as const,
    rating: 4.7,
    salesCount: 780,
    badge: null,
  },
  {
    id: '5',
    title: 'جزوه اصول حسابداری',
    description: 'جزوه کامل اصول حسابداری ویژه دانشجویان و علاقه‌مندان',
    type: 'book',
    typeLabel: 'جزوه',
    price: 220000,
    originalPrice: null,
    icon: BookOpen,
    color: 'teal' as const,
    rating: 4.8,
    salesCount: 1120,
    badge: null,
  },
  {
    id: '6',
    title: 'ویدیوهای آموزش اکسل پیشرفته',
    description: 'آموزش اکسل از مقدماتی تا پیشرفته با پروژه‌های واقعی',
    type: 'video',
    typeLabel: 'ویدیو',
    price: 950000,
    originalPrice: 1400000,
    icon: Video,
    color: 'accent' as const,
    rating: 4.9,
    salesCount: 670,
    badge: 'پرفروش',
  },
];

const tabs: { id: FilterType; label: string; icon: string }[] = [
  { id: 'all', label: 'همه محصولات', icon: '🛒' },
  { id: 'questions', label: 'سوالات', icon: '📝' },
  { id: 'book', label: 'جزوه', icon: '📚' },
  { id: 'video', label: 'ویدیو', icon: '🎬' },
];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return products;
    return products.filter((p) => p.type === activeTab);
  }, [activeTab]);

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
      hoverBorder: 'hover:border-blue-800 dark:hover:border-blue-300',
      shadow: 'shadow-blue-900/30',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      gradient: 'from-teal-500 to-teal-700',
      hoverBorder: 'hover:border-teal-500 dark:hover:border-teal-300',
      shadow: 'shadow-teal-500/30',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      gradient: 'from-orange-500 to-orange-700',
      hoverBorder: 'hover:border-orange-500 dark:hover:border-orange-300',
      shadow: 'shadow-orange-500/30',
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span>فروشگاه سرآمد</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                منابع آموزشی و سوالات
              </h1>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                جزوه، سوالات آزمون و ویدیوهای آموزشی را به‌صورت آنلاین تهیه کن
              </p>
            </div>
          </FadeIn>

          {/* آمار */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Package className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۵۰+
                </div>
                <div className="text-xs text-blue-200 mt-1">منابع آموزشی</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۵٬۲۶۰
                </div>
                <div className="text-xs text-blue-200 mt-1">خرید موفق</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۹۸٪
                </div>
                <div className="text-xs text-blue-200 mt-1">
                  رضایت مشتریان
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* تب‌ها */}
          <FadeIn>
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                      activeTab === tab.id
                        ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    )}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* نتیجه */}
          <FadeIn>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-bold text-brand-800 dark:text-brand-300">
                  {toPersianNumber(filteredProducts.length)}
                </span>{' '}
                محصول یافت شد
              </p>
            </div>
          </FadeIn>

          {/* شبکه محصولات */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => {
                const Icon = product.icon;
                const colors = colorMap[product.color];

                return (
                  <FadeIn
                    key={product.id}
                    delay={index * 0.1}
                    direction="up"
                    className="h-full"
                  >
                    <div className="group relative h-full bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden">
                      {/* بخش بالا */}
                      <div className="relative p-7 pb-5">
                        {product.badge && (
                          <div
                            className={cn(
                              'absolute top-5 left-5 px-3 py-1 text-white rounded-full text-xs font-black shadow-lg',
                              product.badge === 'تخفیف ویژه'
                                ? 'bg-red-500'
                                : 'bg-orange-500'
                            )}
                          >
                            {product.badge}
                          </div>
                        )}

                        <div
                          className={cn(
                            'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6',
                            colors.bg
                          )}
                        >
                          <Icon className={cn('w-8 h-8', colors.icon)} />
                        </div>

                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                          {product.typeLabel}
                        </div>

                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                          {product.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">
                          {product.description}
                        </p>

                        {/* امتیاز و فروش */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {product.rating.toLocaleString('fa-IR')}
                            </span>
                          </div>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                          <div>
                            {toPersianNumber(product.salesCount)} فروش
                          </div>
                        </div>
                      </div>

                      {/* بخش پایین */}
                      <div className="px-7 pb-7 pt-5 bg-slate-50/50 dark:bg-slate-800/30">
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            {product.originalPrice && (
                              <div className="text-xs text-slate-400 dark:text-slate-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </div>
                            )}
                            <div className="text-xl font-black text-brand-800 dark:text-brand-300">
                              {formatPrice(product.price)}
                            </div>
                          </div>

                          {product.originalPrice && (
                            <div className="px-2 py-1 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-lg text-xs font-black">
                              {toPersianNumber(
                                Math.round(
                                  ((product.originalPrice - product.price) /
                                    product.originalPrice) *
                                    100
                                )
                              )}
                              ٪ تخفیف
                            </div>
                          )}
                        </div>

                        <button
                          className={cn(
                            'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-l',
                            colors.gradient,
                            'hover:shadow-lg transition-all hover:gap-3'
                          )}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          افزودن به سبد خرید
                        </button>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
                  محصولی یافت نشد
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  دسته‌بندی دیگری را انتخاب کنید
                </p>
                <button
                  onClick={() => setActiveTab('all')}
                  className="px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition"
                >
                  نمایش همه محصولات
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 lg:p-14 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6">
                  <Zap className="w-10 h-10 text-teal-400" />
                </div>

                <h2 className="text-3xl lg:text-4xl font-black mb-4">
                  منابع بیشتری می‌خوای؟
                </h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                  با عضویت در کانال تلگرام، از جدیدترین منابع و تخفیف‌ها باخبر
                  شو
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://t.me/saramad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                  >
                    <Zap className="w-5 h-5" />
                    عضویت در تلگرام
                  </a>
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-xl font-bold transition"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    مشاهده محصولات
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}