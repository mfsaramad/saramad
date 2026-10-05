'use client';

import { useMemo, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { OrderCard } from '@/components/dashboard/OrderCard';
import { OrderStatus } from '@/types';

type FilterType = 'all' | OrderStatus;

interface OrderItem {
  id: string;
  title: string;
  type: 'course' | 'exam' | 'product';
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  discount: number;
  finalAmount: number;
  status: OrderStatus;
  paymentMethod?: 'zarinpal' | 'idpay' | 'wallet';
  trackingCode?: string;
  createdAt: string;
  updatedAt: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'SRM-14040701-001',
    items: [
      {
        id: 'c1',
        title: 'دوره جامع React و Next.js',
        type: 'course',
        price: 2500000,
        quantity: 1,
      },
    ],
    totalAmount: 2500000,
    discount: 0,
    finalAmount: 2500000,
    status: 'completed',
    paymentMethod: 'zarinpal',
    trackingCode: 'ZP-987654321',
    createdAt: '1404/07/01',
    updatedAt: '1404/07/01',
  },
  {
    id: '2',
    orderNumber: 'SRM-14040628-002',
    items: [
      {
        id: 'c2',
        title: 'دوره Python مقدماتی',
        type: 'course',
        price: 1800000,
        quantity: 1,
      },
      {
        id: 'e1',
        title: 'آزمون تعیین سطح Python',
        type: 'exam',
        price: 200000,
        quantity: 1,
      },
    ],
    totalAmount: 2000000,
    discount: 200000,
    finalAmount: 1800000,
    status: 'processing',
    paymentMethod: 'zarinpal',
    createdAt: '1404/06/28',
    updatedAt: '1404/06/29',
  },
  {
    id: '3',
    orderNumber: 'SRM-14040620-003',
    items: [
      {
        id: 'p1',
        title: 'کتاب آموزش TypeScript',
        type: 'product',
        price: 450000,
        quantity: 2,
      },
    ],
    totalAmount: 900000,
    discount: 0,
    finalAmount: 900000,
    status: 'pending',
    createdAt: '1404/06/20',
    updatedAt: '1404/06/20',
  },
  {
    id: '4',
    orderNumber: 'SRM-14040615-004',
    items: [
      {
        id: 'c3',
        title: 'دوره UI/UX Design',
        type: 'course',
        price: 3200000,
        quantity: 1,
      },
    ],
    totalAmount: 3200000,
    discount: 500000,
    finalAmount: 2700000,
    status: 'cancelled',
    createdAt: '1404/06/15',
    updatedAt: '1404/06/16',
  },
];

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'همه' },
  { key: 'pending', label: 'در انتظار پرداخت' },
  { key: 'processing', label: 'در حال پردازش' },
  { key: 'completed', label: 'تکمیل شده' },
  { key: 'cancelled', label: 'لغو شده' },
];

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return mockOrders;
    return mockOrders.filter((o) => o.status === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          سفارشات من
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          تاریخچه خریدها و وضعیت سفارشات شما
        </p>
      </div>

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

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            سفارشی در این دسته یافت نشد
          </p>
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