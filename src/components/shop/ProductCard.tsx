'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Star, ShoppingCart, Check, Eye } from 'lucide-react';
import type { Product } from '@/lib/data';
import { toPersianNumber, formatPrice } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const inCart = isInCart(`product-${product.id}`);

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
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
  };

  const colors = colorMap[product.color];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) return;

    setIsAdding(true);

    addItem({
      id: `product-${product.id}`,
      slug: product.slug,
      title: product.title,
      type: 'product',
      price: product.price,
      originalPrice: product.originalPrice,
      icon: product.icon,
      quantity: 1,
    });

    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
      <Link
        href={`/shop/${product.slug}`}
        className="block flex-1 flex flex-col"
      >
        {/* تصویر */}
        <div
          className={cn(
            'relative aspect-[16/10] flex items-center justify-center text-[100px]',
            colors.bg
          )}
        >
          {product.icon}

          {product.badge && (
            <div
              className={cn(
                'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black text-white shadow-lg',
                product.badge === 'تخفیف ویژه'
                  ? 'bg-red-500'
                  : 'bg-orange-500'
              )}
            >
              {product.badge}
            </div>
          )}
        </div>

        {/* محتوا */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
            {product.typeLabel}
          </div>

          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
            {product.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>

          {/* امتیاز و فروش */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800 mt-auto">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {product.rating.toLocaleString('fa-IR')}
              </span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div>{toPersianNumber(product.salesCount)} فروش</div>
          </div>
        </div>
      </Link>

      {/* قیمت و دکمه‌ها */}
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-xl font-black text-brand-800 dark:text-brand-300">
              {formatPrice(product.price)}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/shop/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition-all"
          >
            <Eye className="w-4 h-4" />
            مشاهده
          </Link>

          {inCart ? (
            <Link
              href="/cart"
              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-gradient-to-l from-teal-500 to-teal-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-500/30 hover:shadow-xl transition-all"
            >
              <Check className="w-4 h-4" />
              در سبد
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-sm transition-all',
                isAdding
                  ? 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 cursor-wait'
                  : cn(
                      'bg-gradient-to-l text-white hover:shadow-xl hover:scale-[1.02] active:scale-95',
                      colors.gradient
                    )
              )}
            >
              {isAdding ? (
                <>
                  <Check className="w-4 h-4" />
                  اضافه شد
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  افزودن
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}