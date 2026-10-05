'use client';

import Link from 'next/link';
import {
  ShoppingBag,
  BookOpen,
  FileText,
  Bell,
  Tag,
  Award,
  Trash2,
  Circle,
} from 'lucide-react';
import { Notification, NotificationType } from '@/types';
import { useNotifications } from '@/contexts/NotificationsContext';
const typeConfig: Record<
  NotificationType,
  { icon: any; bg: string; color: string }
> = {
  order: {
    icon: ShoppingBag,
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    color: 'text-blue-600 dark:text-blue-400',
  },
  course: {
    icon: BookOpen,
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    color: 'text-purple-600 dark:text-purple-400',
  },
  exam: {
    icon: FileText,
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    color: 'text-orange-600 dark:text-orange-400',
  },
  system: {
    icon: Bell,
    bg: 'bg-gray-100 dark:bg-gray-800',
    color: 'text-gray-600 dark:text-gray-400',
  },
  promo: {
    icon: Tag,
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    color: 'text-pink-600 dark:text-pink-400',
  },
  certificate: {
    icon: Award,
    bg: 'bg-green-50 dark:bg-green-900/20',
    color: 'text-green-600 dark:text-green-400',
  },
};

export function NotificationItem({ notification }: { notification: Notification }) {
  const { markAsRead, remove } = useNotifications();
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.read) markAsRead(notification.id);
  };

  const content = (
    <div
      onClick={handleClick}
      className={`group relative flex gap-4 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
        notification.read
          ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
          : 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
      } hover:shadow-md`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${config.bg}`}
      >
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`font-semibold ${
              notification.read
                ? 'text-gray-700 dark:text-gray-300'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {notification.title}
          </h3>
          {!notification.read && (
            <Circle className="w-2.5 h-2.5 fill-blue-500 text-blue-500 shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {notification.message}
        </p>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          {notification.createdAt}
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          remove(notification.id);
        }}
        aria-label="حذف"
        className="opacity-0 group-hover:opacity-100 self-start w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>;
  }
  return content;
}