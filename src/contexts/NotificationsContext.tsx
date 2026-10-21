'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export type NotificationType =
  | 'order'
  | 'course'
  | 'exam'
  | 'system'
  | 'promo'
  | 'certificate';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  priority?: 'low' | 'normal' | 'high';
}

interface NotificationsContextType {
  items: Notification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  remove: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  add: (n: Omit<Notification, 'id' | 'createdAt'>) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(
  undefined
);

// تبدیل تاریخ میلادی به شمسی برای نمایش
function formatToPersianDate(isoDate: string): string {
  if (!isoDate) return '';
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoDate;
  }
}

// تشخیص لینک بر اساس نوع اعلان
function getLinkByType(type: string): string | undefined {
  switch (type) {
    case 'order': return '/dashboard/orders';
    case 'course': return '/dashboard/courses';
    case 'exam': return '/dashboard/exams';
    case 'certificate': return '/dashboard/certificates';
    case 'promo': return '/courses';
    default: return undefined;
  }
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!user) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedItems: Notification[] = data.map((n: any) => ({
          id: n.id,
          type: (n.type as NotificationType) || 'system',
          title: n.title,
          message: n.message,
          read: n.is_read || false,
          createdAt: formatToPersianDate(n.created_at),
          link: getLinkByType(n.type),
          priority: 'normal',
        }));
        setItems(mappedItems);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const markAsRead = async (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
  };

  const markAllAsRead = async () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    if (user) {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);
    }
  };

  const remove = async (id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
    await supabase.from('notifications').delete().eq('id', id);
  };

  const clearAll = async () => {
    setItems([]);
    if (user) {
      await supabase.from('notifications').delete().eq('user_id', user.id);
    }
  };

  const add = async (n: Omit<Notification, 'id' | 'createdAt'>) => {
    if (!user) return;
    const { error } = await supabase.from('notifications').insert({
      user_id: user.id,
      title: n.title,
      message: n.message,
      type: n.type,
      is_read: n.read || false,
    });

    if (!error) {
      fetchNotifications();
    }
  };

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{ items, unreadCount, isLoading, markAsRead, markAllAsRead, remove, clearAll, add }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
}