'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Package,
  CreditCard,
  Calendar,
  Hash,
  CheckCircle2,
  Clock,
  Loader2,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { updateItem } from '@/lib/api/db';

function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null || isNaN(price)) {
    return '۰';
  }
  return price.toLocaleString('fa-IR');
}

export interface OrderItem {
  id: string;
  type: string;
  title: string;
  price: number;
  quantity: number;
  mode?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  items: OrderItem[];
  subtotal?: number;
  discount?: number;
  total: number;
  status:
    | 'pending'
    | 'paid'
    | 'processing'
    | 'completed'
    | 'cancelled'
    | 'refunded';
  paymentMethod?: string;
  trackingCode?: string;
  createdAt: string;
  updatedAt?: string;
}

interface Props {
  order: Order;
  onUpdate?: () => void;
}

export function OrderCard({ order, onUpdate }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const items = order.items || [];
  const subtotal = order.subtotal ?? order.total ?? 0;
  const discount = order.discount ?? 0;
  const total = order.total ?? 0;
  const itemsCount = items.length;

  const handlePay = async () => {
    if (loading) return;
    if (order.status !== 'pending') return;

    setLoading(true);

    // شبیه‌سازی پرداخت (تأخیر ۱.۵ ثانیه)
    setTimeout(() => {
      updateItem('orders', order.id, {
        status: 'processing',
        updatedAt: new Date().toISOString(),
      });

      setLoading(false);

      if (onUpdate) onUpdate();
      else window.location.reload();
    }, 1500);
  };

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
              {order.orderNumber || '—'}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              {order.createdAt || '—'}
            </div>
          </div>
        </div>
        <StatusBadge status={order.status as any} />
      </div>

      {/* Summary */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {itemsCount.toLocaleString('fa-IR')} آیتم • مبلغ نهایی:{' '}
          <span className="font-bold text-gray-900 dark:text-white">
            {formatPrice(total)} تومان
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {expanded ? 'بستن' : 'جزئیات'}
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Details */}
      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 p-4 sm:p-5 bg-gray-50/50 dark:bg-gray-950/30">
          {/* Items */}
          {items.length > 0 && (
            <div className="space-y-3 mb-4">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {item.title || 'بدون عنوان'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      تعداد: {(item.quantity || 1).toLocaleString('fa-IR')}
                      {item.mode && ` • ${item.mode}`}
                    </div>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {formatPrice((item.price || 0) * (item.quantity || 1))} تومان
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>جمع کل</span>
              <span>{formatPrice(subtotal)} تومان</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>تخفیف</span>
                <span>- {formatPrice(discount)} تومان</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-200 dark:border-gray-800">
              <span>مبلغ پرداختی</span>
              <span>{formatPrice(total)} تومان</span>
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
              <div className="flex items-center gap-1.5">
                <span>کد رهگیری:</span>
                <span className="font-mono text-[10px]" dir="ltr">
                  {order.trackingCode}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        {/* Pending: دکمه پرداخت */}
        {order.status === 'pending' && (
          <button
            type="button"
            onClick={handlePay}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-l from-blue-600 to-teal-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                در حال پردازش...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                تکمیل پرداخت
              </>
            )}
          </button>
        )}

        {/* Processing: پیام */}
        {order.status === 'processing' && (
          <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 text-sm font-bold border border-purple-200 dark:border-purple-900/50">
            <Clock className="w-4 h-4" />
            در حال پردازش توسط تیم سرآمد
          </div>
        )}

        {/* Completed: پیام */}
        {order.status === 'completed' && (
          <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 text-sm font-bold border border-green-200 dark:border-green-900/50">
            <CheckCircle2 className="w-4 h-4" />
            سفارش تکمیل شده
          </div>
        )}

        {/* Cancelled/Refunded: پیام */}
        {(order.status === 'cancelled' || order.status === 'refunded') && (
          <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-sm font-bold border border-red-200 dark:border-red-900/50">
            سفارش {order.status === 'cancelled' ? 'لغو شده' : 'بازگشت داده شده'}
          </div>
        )}
      </div>
    </div>
  );
}