'use client';

import {
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

/* ============================================================
   🎨 انواع وضعیت سفارش
   ============================================================ */

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled';

interface StatusConfig {
  label: string;
  icon: LucideIcon;
  className: string;
}

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: 'در انتظار پرداخت',
    icon: Clock,
    className:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  processing: {
    label: 'در حال پردازش',
    icon: Loader2,
    className:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  completed: {
    label: 'تکمیل شده',
    icon: CheckCircle2,
    className:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  cancelled: {
    label: 'لغو شده',
    icon: XCircle,
    className:
      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
};

/* ============================================================
   🏷️ کامپوننت Badge
   ============================================================ */

interface OrderStatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export function OrderStatusBadge({
  status,
  size = 'md',
  showIcon = true,
}: OrderStatusBadgeProps) {
  const config =
    STATUS_CONFIG[status as OrderStatus] || STATUS_CONFIG.pending;
  const Icon = config.icon;

  const sizeClasses =
    size === 'sm'
      ? 'text-xs px-2 py-0.5 gap-1'
      : 'text-sm px-2.5 py-1 gap-1.5';

  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full whitespace-nowrap ${sizeClasses} ${config.className}`}
    >
      {showIcon && (
        <Icon
          size={iconSize}
          className={status === 'processing' ? 'animate-spin' : ''}
        />
      )}
      {config.label}
    </span>
  );
}

/* ============================================================
   📋 لیست وضعیت‌ها برای استفاده در dropdown
   ============================================================ */

export const ORDER_STATUS_OPTIONS: {
  value: OrderStatus;
  label: string;
}[] = [
  { value: 'pending', label: 'در انتظار پرداخت' },
  { value: 'processing', label: 'در حال پردازش' },
  { value: 'completed', label: 'تکمیل شده' },
  { value: 'cancelled', label: 'لغو شده' },
];