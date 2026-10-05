'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { WishlistItem } from '@/types';
import { mockWishlist } from '@/data/wishlist';

interface WishlistContextType {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  toggle: (item: WishlistItem) => void;
  has: (id: string) => boolean;
  clear: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'saramad_wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        setItems(mockWishlist);
      }
    } catch {
      setItems(mockWishlist);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const add = (item: WishlistItem) => {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggle = (item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const has = (id: string) => items.some((i) => i.id === id);

  const clear = () => setItems([]);

  return (
    <WishlistContext.Provider
      value={{ items, add, remove, toggle, has, clear, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}