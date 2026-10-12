'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: {
    id: string;
    slug: string;
    title: string;
    price: number;
    originalPrice?: number;
    icon?: string;
  };
  gradientClass: string;
}

export default function AddToCartButton({
  product,
  gradientClass,
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const inCart = isInCart(`product-${product.id}`);

  const handleAddToCart = () => {
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

  if (inCart) {
    return (
      <Link
        href="/cart"
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-white bg-gradient-to-l from-teal-500 to-teal-700 hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3 mb-3"
      >
        <Check className="w-5 h-5" />
        در سبد خرید — مشاهده سبد
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className={cn(
        'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-white bg-gradient-to-l cursor-pointer',
        gradientClass,
        'hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3 mb-3',
        isAdding && 'opacity-70 cursor-wait'
      )}
    >
      {isAdding ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          در حال افزودن...
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          افزودن به سبد خرید
        </>
      )}
    </button>
  );
}