'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

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
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  remove: (id: string) => void;
  clearAll: () => void;
  add: (n: Notification) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'saramad_notifications';

const initialNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'order',
    title: 'سفارش شما تکمیل شد',
    message: 'سفارش SRM-14040701-001 با موفقیت پردازش و تکمیل شد.',
    link: '/dashboard/orders',
    read: false,
    createdAt: '1404/07/15 - 14:30',
    priority: 'high',
  },
  {
    id: 'n2',
    type: 'course',
    title: 'دوره جدید در دسترس شما',
    message: 'دوره «React پیشرفته» به لیست دوره‌های شما اضافه شد.',
    link: '/dashboard/courses',
    read: false,
    createdAt: '1404/07/14 - 10:15',
    priority: 'normal',
  },
  {
    id: 'n3',
    type: 'certificate',
    title: 'گواهی‌نامه صادر شد',
    message: 'گواهی‌نامه دوره Python آماده دانلود است.',
    link: '/dashboard/certificates',
    read: false,
    createdAt: '1404/07/13 - 16:45',
    priority: 'high',
  },
  {
    id: 'n4',
    type: 'exam',
    title: 'یادآوری آزمون',
    message: 'آزمون «تعیین سطح Python» فردا ساعت ۱۰ صبح برگزار می‌شود.',
    link: '/dashboard/exams',
    read: true,
    createdAt: '1404/07/12 - 09:00',
    priority: 'high',
  },
  {
    id: 'n5',
    type: 'promo',
    title: 'تخفیف ویژه پاییزه',
    message: 'تا پایان هفته ۳۰٪ تخفیف روی تمام دوره‌های برنامه‌نویسی.',
    link: '/courses',
    read: true,
    createdAt: '1404/07/10 - 12:00',
    priority: 'low',
  },
  {
    id: 'n6',
    type: 'system',
    title: 'به‌روزرسانی سیستم',
    message: 'پلتفرم در تاریخ ۱۴۰۴/۰۷/۲۰ از ساعت ۲ تا ۴ بامداد در دسترس نخواهد بود.',
    read: true,
    createdAt: '1404/07/08 - 18:00',
    priority: 'normal',
  },
];

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setItems(saved ? JSON.parse(saved) : initialNotifications);
    } catch {
      setItems(initialNotifications);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const markAsRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllAsRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const remove = (id: string) =>
    setItems((prev) => prev.filter((n) => n.id !== id));

  const clearAll = () => setItems([]);

  const add = (n: Notification) => setItems((prev) => [n, ...prev]);

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{ items, unreadCount, markAsRead, markAllAsRead, remove, clearAll, add }}
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