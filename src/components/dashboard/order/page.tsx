'use client';

import { useMemo, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { mockOrders } from '@/data/orders';
import { OrderCard } from '@/components/dashboard/OrderCard';
import { OrderStatus } from '@/types';

type FilterType = 'all' | OrderStatus;

const filters: { key: FilterType; label: string }[] = [
  { key: 'all',        label: 'همه' },
  { key: 'pending',    label: 'در انتظار پرداخت' },
  { key: 'processing', label: 'در حال پردازش' },
  { key: 'completed',  label: 'تکمیل شده' },
  { key: 'cancelled',  label: 'لغو شده' },
];

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return mockOrders;
    return mockOrders.filter((o) => o.status === activeFilter);
  }, [activeFilter]);

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
        {filters.map((f) => (
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
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">سفارشی در این دسته یافت نشد</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}