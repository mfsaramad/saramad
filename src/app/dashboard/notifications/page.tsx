'use client';

import { useMemo, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationsContext';
import { NotificationItem } from '@/components/dashboard/NotificationItem';

type Filter = 'all' | 'unread' | 'read';

export default function NotificationsPage() {
  const { items, unreadCount, markAllAsRead, clearAll } = useNotifications();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'unread') return items.filter((n) => !n.read);
    if (filter === 'read') return items.filter((n) => n.read);
    return items;
  }, [items, filter]);

  const tabs: { key: Filter; label: string; count?: number }[] = [
    { key: 'all', label: 'همه', count: items.length },
    { key: 'unread', label: 'خوانده‌نشده', count: unreadCount },
    { key: 'read', label: 'خوانده‌شده' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            اعلانات
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {unreadCount > 0
              ? `${unreadCount.toLocaleString('fa-IR')} اعلان خوانده‌نشده`
              : 'همه اعلانات خوانده شده‌اند'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
            >
              <CheckCheck className="w-4 h-4" />
              خواندن همه
            </button>
          )}
          {items.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-red-500 hover:text-red-600 transition px-2"
            >
              پاک کردن همه
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`relative px-4 py-2.5 text-sm font-medium transition ${
              filter === t.key
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs ${
                    filter === t.key
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {t.count.toLocaleString('fa-IR')}
                </span>
              )}
            </span>
            {filter === t.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <Bell className="w-14 h-14 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            اعلانی وجود ندارد
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filter === 'unread'
              ? 'همه اعلانات خوانده شده‌اند'
              : 'به‌زودی اعلانات جدید اینجا نمایش داده می‌شوند'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      )}
    </div>
  );
}