'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// تعریف دقیق ساختار آیتم سبد خرید بر اساس چیزی که CourseCard می‌فرستد
interface CartItem {
  id: string;
  slug?: string;
  title: string;
  price: number;
  type: string;
  quantity: number;
  image?: string;
  instructor?: string;
  mode?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem('saramad_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error('Error loading cart', error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('saramad_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // اگر از قبل بود، فقط تعدادش را زیاد کن
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      // اگر نبود، اضافه کن
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const isInCart = (id: string) => {
    return cart.some((item) => item.id === id);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart باید داخل CartProvider استفاده شود');
  }
  return context;
}
