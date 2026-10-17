'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  Search,
  X,
  Star,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  BookOpen,
  Package,
  Sparkles,
  TrendingUp,
  Award,
  Eye,
  Check,
} from 'lucide-react';
import { toPersianNumber, formatPrice } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/contexts/WishlistContext';
import { courses, products } from '@/lib/data'; // 👈 ایمپورت دیتای اصلی

type ItemType = 'course' | 'product';
type FilterType = 'all' | ItemType;

interface WishlistItem {
  id: string;
  slug: string;
  title: string;
  type: ItemType;
  typeLabel: string;
  price: number;
  originalPrice?: number;
  icon: string;
  rating: number;
  reviewsCount: number;
  instructor?: string;
  color: 'brand' | 'teal' | 'accent';
  dateAdded: string;
}

export default function WishlistPage() {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // تبدیل شناسه‌های دیتابیس به اطلاعات کامل دوره/محصول
  useEffect(() => {
    const combinedItems = wishlistIds.map((id) => {
      if (id.startsWith('course-')) {
        const courseId = id.replace('course-', '');
        const course = courses.find((c) => c.id === courseId);
        if (course) {
          const priceEntries = Object.entries(course.price).filter(([_, v]) => v !== undefined) as [string, number][];
          const lowestPrice = priceEntries.length > 0 ? Math.min(...priceEntries.map(e => e[1])) : 0;
          
          return {
            id: course.id,
            slug: course.slug,
            title: course.title,
            type: 'course' as const,
            typeLabel: 'دوره آموزشی',
            price: lowestPrice,
            icon: '🎓',
            rating: course.rating,
            reviewsCount: 120,
            instructor: course.instructor?.name,
            color: 'brand' as const,
            dateAdded: 'اخیر',
          };
        }
      } else if (id.startsWith('product-')) {
        const productId = id.replace('product-', '');
        const product = products.find((p) => p.id === productId);
        if (product) {
          return {
            id: product.id,
            slug: product.slug,
            title: product.title,
            type: 'product' as const,
            typeLabel: 'محصول',
            price: product.price,
            originalPrice: product.originalPrice,
            icon: product.icon || '📦',
            rating: product.rating,
            reviewsCount: product.salesCount,
            color: product.color as 'brand' | 'teal' | 'accent',
            dateAdded: 'اخیر',
          };
        }
      }
      return null;
    }).filter(Boolean) as WishlistItem[];

    setItems(combinedItems);
  }, [wishlistIds]);

  const filteredItems = useMemo(() => {
    let result = [...items];
    if (activeTab !== 'all') result = result.filter((i) => i.type === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((i) => i.title.toLowerCase().includes(q));
    }
    return result;
  }, [items, activeTab, searchQuery]);

  const handleRemove = async (id: string, type: ItemType) => {
    await toggleWishlist(`${type}-${id}`, type);
  };

  const counts = {
    all: items.length,
    course: items.filter((i) => i.type === 'course').length,
    product: items.filter((i) => i.type === 'product').length,
  };

  const totalValue = items.reduce((sum, i) => sum + i.price, 0);

  const tabs = [
    { id: 'all' as FilterType, label: 'همه', icon: '❤️', count: counts.all },
    { id: 'course' as FilterType, label: 'دوره‌ها', icon: '🎓', count: counts.course },
    { id: 'product' as FilterType, label: 'محصولات', icon: '📦', count: counts.product },
  ];

  const stats = [
    { icon: Heart, value: toPersianNumber(items.length), label: 'کل علاقه‌مندی‌ها', color: 'brand' as const },
    { icon: BookOpen, value: toPersianNumber(counts.course), label: 'دوره', color: 'teal' as const },
    { icon: Package, value: toPersianNumber(counts.product), label: 'محصول', color: 'accent' as const },
    { icon: TrendingUp, value: formatPrice(totalValue), label: 'ارزش کل', color: 'purple' as const },
  ];

  const statColorMap = {
    brand: { bg: 'bg-blue-100 dark:bg-blue-950/50', icon: 'text-blue-800 dark:text-blue-300' },
    teal: { bg: 'bg-teal-100 dark:bg-teal-950/50', icon: 'text-teal-600 dark:text-teal-300' },
    accent: { bg: 'bg-orange-100 dark:bg-orange-950/50', icon: 'text-orange-600 dark:text-orange-300' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-950/50', icon: 'text-purple-600 dark:text-purple-300' },
  };

  const colorMap = {
    brand: { bg: 'bg-blue-100 dark:bg-blue-950/50', gradient: 'from-[#1e3a8a] to-[#1e40af]' },
    teal: { bg: 'bg-teal-100 dark:bg-teal-950/50', gradient: 'from-teal-500 to-teal-700' },
    accent: { bg: 'bg-orange-100 dark:bg-orange-950/50', gradient: 'from-orange-500 to-orange-700' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold mb-3">
              <Heart className="w-3.5 h-3.5 text-pink-300" />
              <span>علاقه‌مندی‌های من</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black mb-2">علاقه‌مندی‌های من ❤️</h1>
            <p className="text-blue-100 text-sm lg:text-base">دوره‌ها و محصولاتی که ذخیره کرده‌اید</p>
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = statColorMap[stat.color];
          return (
            <FadeIn key={index} delay={index * 0.08}>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-3', colors.bg)}>
                  <Icon className={cn('w-5 h-5', colors.icon)} />
                </div>
                <div className="text-lg lg:text-xl font-black text-slate-800 dark:text-slate-100 mb-1 line-clamp-1">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Search */}
      <FadeIn delay={0.15}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در علاقه‌مندی‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-100 dark:border-slate-800 inline-flex flex-wrap gap-1 max-w-full overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                activeTab === tab.id ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
              <span className={cn('px-2 py-0.5 rounded-full text-[10px]', activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400')}>
                {toPersianNumber(tab.count)}
              </span>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Wishlist Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => {
            const colors = colorMap[item.color];
            const discountPercent = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

            return (
              <FadeIn key={item.id} delay={index * 0.05} direction="up">
                <div className="group bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-pink-200 dark:hover:border-pink-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Icon */}
                  <div className={cn('relative aspect-[16/10] flex items-center justify-center text-[80px]', colors.bg)}>
                    {item.icon}
                    {discountPercent > 0 && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 rounded-full text-xs font-black text-white shadow-lg">
                        {toPersianNumber(discountPercent)}٪ تخفیف
                      </div>
                    )}
                    <button onClick={() => handleRemove(item.id, item.type)} className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-center text-red-500 hover:text-red-700 hover:scale-110 transition-all shadow-lg" aria-label="حذف">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300">{item.rating.toLocaleString('fa-IR')}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{item.typeLabel}</div>
                    <h3 className="font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 min-h-[3rem] group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">{item.title}</h3>
                    {item.instructor && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span>👨‍🏫</span>
                        <span>{item.instructor}</span>
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mb-4 mt-auto">اضافه شده در: {item.dateAdded}</div>

                    {/* Price */}
                    <div className="flex items-end justify-between gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        {item.originalPrice && (
                          <div className="text-xs text-slate-400 line-through">{formatPrice(item.originalPrice)}</div>
                        )}
                        <div className="text-lg font-black text-brand-800 dark:text-brand-300">{formatPrice(item.price)}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={item.type === 'course' ? `/courses/${item.slug}` : `/shop/${item.slug}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition-all">
                        <Eye className="w-4 h-4" />
                        مشاهده
                      </Link>
                      <button className={cn('flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-l text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all', colors.gradient)}>
                        <ShoppingCart className="w-4 h-4" />
                        افزودن
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      ) : (
        <FadeIn>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">علاقه‌مندی‌ای یافت نشد</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {items.length === 0 ? 'هنوز هیچ دوره یا محصولی رو به علاقه‌مندی‌ها اضافه نکردی' : 'فیلتر یا جستجوی خود را تغییر دهید'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition hover:gap-3">
                <BookOpen className="w-4 h-4" />
                مشاهده دوره‌ها
              </Link>
              <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <Package className="w-4 h-4" />
                فروشگاه
              </Link>
            </div>
          </div>
        </FadeIn>
      )}

      {/* CTA */}
      {filteredItems.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-pink-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">آماده‌ای علاقه‌مندی‌هات رو خریداری کنی؟</h3>
                  <p className="text-sm text-blue-100">همه رو یکجا به سبد خرید اضافه کن</p>
                </div>
              </div>
              <Link href="/cart" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-800 rounded-xl font-black hover:bg-blue-50 transition-all hover:gap-3 group">
                <ShoppingCart className="w-4 h-4" />
                مشاهده سبد خرید
              </Link>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}