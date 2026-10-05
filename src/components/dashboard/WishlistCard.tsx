'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Clock, Trash2, ShoppingCart } from 'lucide-react';
import { WishlistItem } from '@/types';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

function formatPrice(price: number): string {
  return price.toLocaleString('fa-IR');
}

const typeLabels = {
  course: 'دوره',
  exam: 'آزمون',
  product: 'محصول',
};

export function WishlistCard({ item }: { item: WishlistItem }) {
  const { remove } = useWishlist();
  const { add: addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image,
      type: item.type,
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all">
      {/* Image */}
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            بدون تصویر
          </div>
        )}
        {/* Type Badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs font-medium text-gray-700 dark:text-gray-300">
          {typeLabels[item.type]}
        </span>
        {/* Remove */}
        <button
          onClick={() => remove(item.id)}
          aria-label="حذف از علاقه‌مندی‌ها"
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <Link
          href={`/courses/${item.slug}`}
          className="block font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-2"
        >
          {item.title}
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          {item.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>{item.rating.toLocaleString('fa-IR')}</span>
            </div>
          )}
          {item.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{item.duration}</span>
            </div>
          )}
          {item.instructor && (
            <span className="truncate">{item.instructor}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div>
            {item.originalPrice && item.originalPrice > item.price && (
              <div className="text-xs text-gray-400 line-through">
                {formatPrice(item.originalPrice)}
              </div>
            )}
            <div className="font-bold text-gray-900 dark:text-white">
              {formatPrice(item.price)}{' '}
              <span className="text-xs font-normal text-gray-500">تومان</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
          >
            <ShoppingCart className="w-4 h-4" />
            افزودن به سبد
          </button>
          <button
            onClick={() => remove(item.id)}
            aria-label="حذف"
            className="w-10 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}