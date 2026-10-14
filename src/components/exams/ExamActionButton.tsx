'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlayCircle, ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface ExamInfo {
  id: string;
  slug: string;
  title: string;
  price: number;
  questions: number;
  duration: number;
  isFree?: boolean;
}

interface Props {
  exam: ExamInfo;
  gradientClass: string;
  variant?: 'primary' | 'secondary';
}

export default function ExamActionButton({
  exam,
  gradientClass,
  variant = 'primary',
}: Props) {
  const { user } = useAuth();
  const { addItem, isInCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isFree = exam.isFree || exam.price === 0;
  const cartId = `exam-${exam.id}`;
  const inCart = isInCart(cartId);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBuy = () => {
    if (!user) {
      window.location.href = `/login?redirect=/exams/${exam.slug}`;
      return;
    }

    if (inCart) return;

    setLoading(true);

    addItem({
      id: cartId,
      slug: exam.slug,
      title: exam.title,
      type: 'exam',
      price: exam.price,
      quantity: 1,
    });

    setTimeout(() => setLoading(false), 600);
  };

  if (!mounted) {
    return (
      <div className="w-full h-14 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse mb-3" />
    );
  }

  // ============ آزمون رایگان ============
  if (isFree) {
    if (!user) {
      return (
        <Link
          href={`/login?redirect=/exams/${exam.slug}/take`}
          className={cn(
            'flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-white bg-gradient-to-l',
            gradientClass,
            'hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3 mb-3'
          )}
        >
          <PlayCircle className="w-5 h-5" />
          شروع آزمون رایگان
        </Link>
      );
    }

    return (
      <Link
        href={`/exams/${exam.slug}/take`}
        className={cn(
          'flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-white bg-gradient-to-l',
          gradientClass,
          'hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3 mb-3'
        )}
      >
        <PlayCircle className="w-5 h-5" />
        شروع آزمون
      </Link>
    );
  }

  // ============ آزمون پول‌دار ============
  if (inCart) {
    return (
      <Link
        href="/cart"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-white bg-gradient-to-l from-teal-500 to-teal-700 hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3 mb-3"
      >
        <Check className="w-5 h-5" />
        در سبد خرید — تکمیل خرید
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBuy}
      disabled={loading}
      className={cn(
        'flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-white bg-gradient-to-l',
        gradientClass,
        'hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3 mb-3',
        loading && 'opacity-70 cursor-wait'
      )}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          در حال افزودن...
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          خرید آزمون — {exam.price.toLocaleString('fa-IR')} تومان
        </>
      )}
    </button>
  );
}