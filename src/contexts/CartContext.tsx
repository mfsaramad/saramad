'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  type: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // بارگذاری سبد خرید از localStorage فقط در سمت کلاینت (بعد از لود شدن)
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem('saramad_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error('Error loading cart', error);
    }
  }, []);

  // ذخیره سبد خرید در localStorage هنگام تغییر
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('saramad_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
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