'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Percent,
  CheckCircle2,
  Shield,
  Sparkles,
  BookOpen,
  Package,
  AlertCircle,
} from 'lucide-react';
import { useCart, type CartItem } from '@/contexts/CartContext';
import {
  toPersianNumber,
  formatPrice,
  getModeIcon,
  getModeLabel,
} from '@/lib/format';
import { courses } from '@/lib/data';
import CourseCard from '@/components/shared/CourseCard';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const handleApplyDiscount = () => {
    setDiscountError('');
    if (discountCode.toUpperCase() === 'SARAMAD') {
      setAppliedDiscount(25);
    } else if (discountCode.toUpperCase().startsWith('S')) {
      setAppliedDiscount(15);
    } else {
      setAppliedDiscount(0);
      setDiscountError('کد تخفیف نامعتبر است');
    }
  };

  const discountAmount = Math.round((totalPrice * appliedDiscount) / 100);
  const afterDiscount = totalPrice - discountAmount;
  const taxAmount = Math.round(afterDiscount * 0.09);
  const finalPrice = afterDiscount + taxAmount;

  // اگه سبد خالیه
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <ShoppingBag className="w-16 h-16 text-slate-400" />
              </div>
              <h1 className="text-3xl font-black text-slate-800 mb-4">
                سبد خرید شما خالیه! 🛒
              </h1>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                هنوز هیچ دوره یا محصولی به سبد خرید اضافه نکردی.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  مشاهده دوره‌ها
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-blue-800 text-blue-800 rounded-xl font-bold hover:bg-blue-800 hover:text-white transition-all"
                >
                  <Package className="w-5 h-5" />
                  فروشگاه
                </Link>
              </div>
            </div>
          </FadeIn>

          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-black text-slate-800">
                دوره‌های پیشنهادی
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {courses.slice(0, 2).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-4">
              <ShoppingBag className="w-4 h-4" />
              <span>سبد خرید</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-800 mb-3">
              سبد خرید شما
            </h1>
            <p className="text-slate-600">
              {toPersianNumber(items.length)} آیتم در سبد خرید
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <FadeIn>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-black text-slate-800">
                  آیتم‌های سبد خرید
                </h2>
                <button
                  onClick={clearCart}
                  className="inline-flex items-center gap-1 text-sm font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف همه
                </button>
              </div>
            </FadeIn>

            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onUpdateQuantity={(q) => updateQuantity(item.id, q)}
              />
            ))}

            <Link
              href="/courses"
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-600 font-bold hover:border-blue-500 hover:text-blue-800 transition-all hover:gap-3 group"
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              افزودن دوره یا محصول جدید
            </Link>
          </div>

          <div className="lg:col-span-1">
            <FadeIn direction="left" delay={0.1}>
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                  <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-blue-800" />
                    خلاصه سفارش
                  </h3>

                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5" />
                      کد تخفیف
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="مثلاً SARAMAD"
                        className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
                      />
                      <button
                        onClick={handleApplyDiscount}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition"
                      >
                        اعمال
                      </button>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-teal-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        کد تخفیف {toPersianNumber(appliedDiscount)}٪ اعمال شد
                      </div>
                    )}
                    {discountError && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-red-600 font-bold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {discountError}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-5 pb-5 border-b border-slate-100 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">جمع کل</span>
                      <span className="font-bold text-slate-800">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex items-center justify-between text-teal-600">
                        <span>تخفیف ({toPersianNumber(appliedDiscount)}٪)</span>
                        <span className="font-bold">
                          − {formatPrice(discountAmount)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">مالیات (۹٪)</span>
                      <span className="font-bold text-slate-800">
                        {formatPrice(taxAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="font-black text-slate-800">
                      مبلغ قابل پرداخت
                    </span>
                    <div className="text-left">
                      <div className="text-2xl font-black text-blue-800">
                        {formatPrice(finalPrice)}
                      </div>
                      <div className="text-xs text-slate-500">تومان</div>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:gap-3 mb-3"
                  >
                    رفتن به پرداخت
                    <ArrowLeft className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/courses"
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
                  >
                    ادامه خرید
                  </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Shield className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      پرداخت امن و رمزنگاری‌شده
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      ضمانت بازگشت وجه تا ۷ روز
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      پشتیبانی ۲۴/۷
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// کامپوننت کارت آیتم
// ============================================================
function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (q: number) => void;
}) {
  return (
    <div className="group bg-white rounded-3xl shadow-sm border border-slate-100 p-5 hover:shadow-lg transition-all">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center text-3xl flex-shrink-0">
          {item.icon || (item.type === 'course' ? '🎓' : '📦')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold mb-2">
                {item.type === 'course' ? 'دوره آموزشی' : 'محصول'}
              </span>
              <h3 className="font-black text-slate-800 line-clamp-2 mb-1">
                {item.title}
              </h3>
              {item.instructor && (
                <div className="text-xs text-slate-500">
                  مدرس: {item.instructor}
                </div>
              )}
              {item.mode && (
                <div className="text-xs text-slate-500 mt-1">
                  {getModeIcon(item.mode)} {getModeLabel(item.mode)}
                </div>
              )}
            </div>

            <button
              onClick={onRemove}
              className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 transition flex-shrink-0"
              aria-label="حذف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
            {item.type === 'product' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity((item.quantity || 1) - 1)}
                  disabled={(item.quantity || 1) <= 1}
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition',
                    (item.quantity || 1) <= 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  )}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-black text-slate-800">
                  {toPersianNumber(item.quantity || 1)}
                </span>
                <button
                  onClick={() => onUpdateQuantity((item.quantity || 1) + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                دسترسی مادام‌العمر
              </div>
            )}

            <div className="text-left">
              {item.originalPrice && (
                <div className="text-xs text-slate-400 line-through">
                  {formatPrice(item.originalPrice)}
                </div>
              )}
              <div className="text-lg font-black text-blue-800">
                {formatPrice(item.price * (item.quantity || 1))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}