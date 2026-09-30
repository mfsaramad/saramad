'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  BookOpen,
  Video,
  Package,
  Star,
  ShoppingCart,
  ArrowLeft,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';
import { toPersianNumber, formatPrice } from '@/lib/format';

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
      bg: 'bg-blue-100',
      icon: 'text-blue-800',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
    },
    teal: {
      bg: 'bg-teal-100',
      icon: 'text-teal-600',
      gradient: 'from-teal-500 to-teal-700',
    },
    accent: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-700',
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-blue-100 mb-8 justify-center">
            <Link href="/" className="hover:text-white transition">
              خانه
            </Link>
            <span>/</span>
            <span className="text-white font-bold">فروشگاه</span>
          </div>

          <div className="text-center">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
              🛒 فروشگاه سرآمد
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              منابع آموزشی و سوالات
            </h1>

            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              جزوه، سوالات آزمون و ویدیوهای آموزشی را به‌صورت آنلاین تهیه کن
            </p>

            {/* آمار */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                <Package className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">
                  {toPersianNumber(products.length)}+
                </div>
                <div className="text-xs text-blue-200 mt-1">منابع آموزشی</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                <ShoppingCart className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">۵٬۲۶۰</div>
                <div className="text-xs text-blue-200 mt-1">خرید موفق</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                <Award className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">۹۸٪</div>
                <div className="text-xs text-blue-200 mt-1">رضایت مشتریان</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* تب‌های فیلتر */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar max-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                      : 'text-slate-600 hover:text-brand-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* نتیجه */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-600">
              <span className="font-bold text-brand-800">
                {toPersianNumber(filteredProducts.length)}
              </span>{' '}
              محصول یافت شد
            </p>
          </div>

          {/* شبکه محصولات */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const Icon = product.icon;
                const colors = colorMap[product.color];

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-3xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                  >
                    {/* بخش بالا */}
                    <div className="relative p-7 pb-5">
                      {product.badge && (
                        <div
                          className={`absolute top-5 left-5 px-3 py-1 ${
                            product.badge === 'تخفیف ویژه'
                              ? 'bg-red-500'
                              : 'bg-orange-500'
                          } text-white rounded-full text-xs font-black shadow-lg`}
                        >
                          {product.badge}
                        </div>
                      )}

                      <div
                        className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`w-8 h-8 ${colors.icon}`} />
                      </div>

                      <div className="text-xs font-bold text-slate-500 mb-2">
                        {product.typeLabel}
                      </div>

                      <h3 className="text-lg font-black text-slate-800 leading-snug mb-3 line-clamp-2 min-h-[3.5rem]">
                        {product.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">
                        {product.description}
                      </p>

                      {/* امتیاز و فروش */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-slate-700">
                            {product.rating.toLocaleString('fa-IR')}
                          </span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <div>
                          {toPersianNumber(product.salesCount)} فروش
                        </div>
                      </div>
                    </div>

                    {/* بخش پایین */}
                    <div className="px-7 pb-7 pt-5 bg-slate-50/50">
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          {product.originalPrice && (
                            <div className="text-xs text-slate-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </div>
                          )}
                          <div className="text-xl font-black text-brand-800">
                            {formatPrice(product.price)}
                          </div>
                        </div>

                        {product.originalPrice && (
                          <div className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-black">
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
                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-l ${colors.gradient} hover:shadow-lg transition-all`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        افزودن به سبد خرید
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">
                محصولی یافت نشد
              </h3>
              <p className="text-slate-500 mb-6">
                دسته‌بندی دیگری را انتخاب کنید
              </p>
              <button
                onClick={() => setActiveTab('all')}
                className="px-6 py-3 bg-brand-800 text-white rounded-xl font-bold hover:bg-brand-900 transition"
              >
                نمایش همه محصولات
              </button>
            </div>
          )}

          {/* دکمه بازگشت */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-800 text-brand-800 rounded-xl font-bold hover:bg-brand-800 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}