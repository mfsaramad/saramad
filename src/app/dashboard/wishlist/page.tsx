'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { WishlistCard } from '@/components/dashboard/WishlistCard';

export default function WishlistPage() {
  const { items, clear } = useWishlist();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            علاقه‌مندی‌های من
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {items.length > 0
              ? `${items.length.toLocaleString('fa-IR')} آیتم ذخیره شده`
              : 'هنوز چیزی ذخیره نکرده‌اید'}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            پاک کردن همه
          </button>
        )}
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <Heart className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            لیست علاقه‌مندی‌ها خالیه
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            دوره‌ها و محصولات موردعلاقه‌ت رو اینجا ذخیره کن
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            مشاهده دوره‌ها
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}