'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Clock, Users, Calendar, Award, ShoppingCart, Check } from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';
import {
  formatPriceShort,
  formatCountShort,
  toPersianNumber,
  getModeLabel,
  getModeIcon,
  getModeColor,
} from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import Badge from './Badge';
import StarRating from './StarRating';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export default function CourseCard({
  course,
  variant = 'default',
  className,
}: CourseCardProps) {
  const { addItem, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const cartId = `course-${course.id}`;
  const inCart = isInCart(cartId);

  const modeColor = getModeColor(course.mode);

  const priceEntries = Object.entries(course.price).filter(
    ([_, v]) => v !== undefined
  ) as [string, number][];

  const [lowestMode, lowestPrice] = priceEntries.reduce(
    (min, curr) => (curr[1] < min[1] ? curr : min),
    priceEntries[0] || ['online', 0]
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) return;

    setIsAdding(true);

    addItem({
      id: cartId,
      slug: course.slug,
      title: course.title,
      type: 'course',
      price: lowestPrice,
      image: course.image,
      instructor: course.instructor?.name,
      mode: lowestMode as any,
      quantity: 1,
    });

    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div
      className={cn(
        'group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-brand-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col',
        className
      )}
    >
      <Link href={`/courses/${course.slug}`} className="block flex-1">
        {/* تصویر */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 to-teal-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-40">🎓</span>
          </div>

          {course.image && (
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Badge variant={modeColor} className="shadow-lg backdrop-blur-sm">
              <span>{getModeIcon(course.mode)}</span>
              {getModeLabel(course.mode)}
            </Badge>
            {course.remainingCapacity <= 5 && (
              <Badge variant="accent" className="shadow-lg backdrop-blur-sm">
                🔥 فقط {toPersianNumber(course.remainingCapacity)} نفر
              </Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 shadow-lg">
            <StarRating rating={course.rating} size="sm" />
          </div>

          {course.certificate && (
            <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-lg">
              <Award className="w-5 h-5 text-orange-500" />
            </div>
          )}
        </div>

        {/* محتوا */}
        <div className="p-6">
          {course.tags?.[0] && (
            <div className="text-xs font-bold text-brand-700 mb-2">
              {course.tags[0]}
            </div>
          )}

          <h3 className="text-lg font-black text-slate-800 leading-snug mb-3 line-clamp-2 group-hover:text-brand-800 transition">
            {course.title}
          </h3>

          {variant !== 'compact' && (
            <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
              {course.shortDescription}
            </p>
          )}

          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
              {course.instructor?.name?.charAt(0) || 'م'}
            </div>
            <span className="text-sm text-slate-600">
              {course.instructor?.name || 'استاد'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-700" />
              <span>{toPersianNumber(course.duration)} ساعت</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-700" />
              <span>{toPersianNumber(course.sessions)} جلسه</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-700" />
              <span>{formatCountShort(course.studentsCount)}</span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">
                شروع از
              </div>
              <div className="text-xl font-black text-brand-800">
                {formatPriceShort(lowestPrice)}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* دکمه افزودن به سبد */}
      <div className="px-6 pb-6">
        {inCart ? (
          <Link
            href="/cart"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-l from-teal-500 to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Check className="w-4 h-4" />
            در سبد خرید — مشاهده سبد
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all',
              isAdding
                ? 'bg-teal-100 text-teal-700 cursor-wait'
                : 'bg-gradient-to-l from-brand-800 to-teal-600 hover:shadow-lg hover:scale-[1.02]'
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
                افزودن به سبد
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}