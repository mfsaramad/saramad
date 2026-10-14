'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import { OrderCard, type Order } from '@/components/dashboard/OrderCard';

type FilterType = 'all' | 'pending' | 'processing' | 'completed' | 'cancelled';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'همه' },
  { key: 'pending', label: 'در انتظار پرداخت' },
  { key: 'processing', label: 'در حال پردازش' },
  { key: 'completed', label: 'تکمیل شده' },
  { key: 'cancelled', label: 'لغو شده' },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const { data: allOrders, loading } = useCollection<Order>('orders');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [refreshKey, setRefreshKey] = useState(0);

  const orders = useMemo(() => {
    let result = allOrders;

    if (user) {
      result = result.filter(
        (o) => o.userId === user.id || o.userEmail === user.email
      );
    }

    if (activeFilter !== 'all') {
      result = result.filter((o) => o.status === activeFilter);
    }

    return result;
  }, [allOrders, user, activeFilter, refreshKey]);

  const handleUpdate = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          سفارشات من
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          تاریخچه خریدها و وضعیت سفارشات شما
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeFilter === f.key
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            سفارشی یافت نشد
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {activeFilter === 'all'
              ? 'هنوز سفارشی ثبت نکرده‌اید'
              : 'سفارشی در این دسته‌بندی وجود ندارد'}
          </p>
          {activeFilter === 'all' && (
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              مشاهده دوره‌ها
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}