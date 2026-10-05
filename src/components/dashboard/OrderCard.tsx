'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Package, CreditCard, Calendar, Hash } from 'lucide-react';
import { Order } from '@/types';
import { StatusBadge } from './StatusBadge';

function formatPrice(price: number): string {
  return price.toLocaleString('fa-IR');
}

export function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all hover:shadow-lg">
      {/* Header */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
              <Hash className="w-3.5 h-3.5 text-gray-400" />
              {order.orderNumber}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              {order.createdAt}
            </div>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Summary */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {order.items.length} آیتم • مبلغ نهایی:{' '}
          <span className="font-bold text-gray-900 dark:text-white">
            {formatPrice(order.finalAmount)} تومان
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {expanded ? 'بستن' : 'جزئیات'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Details */}
      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 p-4 sm:p-5 bg-gray-50/50 dark:bg-gray-950/30">
          {/* Items */}
          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    تعداد: {item.quantity}
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  {formatPrice(item.price * item.quantity)} تومان
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>جمع کل</span>
              <span>{formatPrice(order.totalAmount)} تومان</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>تخفیف</span>
                <span>- {formatPrice(order.discount)} تومان</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-200 dark:border-gray-800">
              <span>مبلغ پرداختی</span>
              <span>{formatPrice(order.finalAmount)} تومان</span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
            {order.paymentMethod && (
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                {order.paymentMethod === 'zarinpal' && 'زرین‌پال'}
                {order.paymentMethod === 'idpay' && 'آیدی‌پی'}
                {order.paymentMethod === 'wallet' && 'کیف پول'}
              </div>
            )}
            {order.trackingCode && (
              <div>کد رهگیری: {order.trackingCode}</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {order.status === 'pending' && (
              <Link
                href={`/checkout?order=${order.id}`}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
              >
                تکمیل پرداخت
              </Link>
            )}
            <Link
              href={`/dashboard/orders/${order.id}`}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              مشاهده کامل
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}