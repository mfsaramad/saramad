import { OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending:    { label: 'در انتظار پرداخت', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  paid:       { label: 'پرداخت شده',      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  processing: { label: 'در حال پردازش',   className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  completed:  { label: 'تکمیل شده',      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  cancelled:  { label: 'لغو شده',         className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  refunded:   { label: 'بازگشت داده شده', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}