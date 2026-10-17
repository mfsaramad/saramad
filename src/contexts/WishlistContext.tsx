'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (itemId: string, itemType: 'course' | 'product') => Promise<void>;
  isInWishlist: (itemId: string) => boolean;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWishlistIds([]);
      setIsLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const { data, error } = await supabase
          .from('wishlists')
          .select('item_id')
          .eq('user_id', user.id);

        if (data) {
          setWishlistIds(data.map((item) => item.item_id));
        }
      } catch (error) {
        console.error('خطا در دریافت علاقه‌مندی‌ها:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (itemId: string, itemType: 'course' | 'product') => {
    if (!user) {
      alert('برای افزودن به علاقه‌مندی‌ها ابتدا وارد حساب کاربری خود شوید.');
      return;
    }

    const isCurrentlyIn = wishlistIds.includes(itemId);

    // آپدیت خوش‌بینانه (Optimistic Update)
    if (isCurrentlyIn) {
      setWishlistIds((prev) => prev.filter((id) => id !== itemId));
      await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', itemId);
    } else {
      setWishlistIds((prev) => [...prev, itemId]);
      await supabase
        .from('wishlists')
        .insert({ user_id: user.id, item_id: itemId, item_type: itemType });
    }
  };

  const isInWishlist = (itemId: string) => wishlistIds.includes(itemId);

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isInWishlist, isLoading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}