'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  ShoppingBag,
  Trash2,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from 'lucide-react';
import { getCollection, updateItem, deleteItem } from '@/lib/api/db';
import {
  OrderStatusBadge,
  ORDER_STATUS_OPTIONS,
  type OrderStatus,
} from '@/components/admin/OrderStatusBadge';

/* ============================================================
   📦 تایپ‌ها
   ============================================================ */

interface OrderItem {
  id: string;
  type: string;
  title: string;
  price: number;
  quantity: number;
  mode?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
}

/* ============================================================
   🔧 توابع کمکی
   ============================================================ */

function formatPrice(price: number): string {
  return price.toLocaleString('fa-IR') + ' تومان';
}

function formatNumber(n: number): string {
  return n.toLocaleString('fa-IR');
}

/* ============================================================
   🎯 کامپوننت اصلی
   ============================================================ */

function OrdersPageContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') || 'all';

  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(initialStatus);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // بارگذاری سفارشات
  useEffect(() => {
    setMounted(true);
    const data = getCollection<Order>('orders');
    // مرتب‌سازی نزولی بر اساس id (جدیدترین اول)
    const sorted = [...data].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );
    setOrders(sorted);
  }, []);

  // آمار
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      completed: orders.filter((o) => o.status === 'completed').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
      revenue: orders
        .filter((o) => o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0),
    };
  }, [orders]);

  // فیلتر
  const filteredOrders = useMemo(() => {
    let result = orders;

    if (activeTab !== 'all') {
      result = result.filter((o) => o.status === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.userName.toLowerCase().includes(q) ||
          o.userEmail.toLowerCase().includes(q) ||
          o.userPhone.includes(q)
      );
    }

    return result;
  }, [orders, activeTab, searchQuery]);

  // تغییر وضعیت
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateItem('orders', orderId, { status: newStatus });
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // حذف
  const handleDelete = (orderId: string) => {
    if (!confirm('آیا از حذف این سفارش مطمئن هستید؟')) return;
    deleteItem('orders', orderId);
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* هدر */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-brand" />
            مدیریت سفارشات
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {formatNumber(orders.length)} سفارش ثبت شده
          </p>
        </div>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="درآمد کل"
          value={formatPrice(stats.revenue)}
          color="green"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="در انتظار"
          value={formatNumber(stats.pending)}
          color="amber"
        />
        <StatCard
          icon={<CheckCircle2 className="w-5 h-5" />}
          label="تکمیل شده"
          value={formatNumber(stats.completed)}
          color="blue"
        />
        <StatCard
          icon={<XCircle className="w-5 h-5" />}
          label="لغو شده"
          value={formatNumber(stats.cancelled)}
          color="red"
        />
      </div>

      {/* نوار جستجو و فیلتر */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* جستجو */}
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="جستجو بر اساس شماره سفارش، نام، ایمیل یا تلفن..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
            />
          </div>
        </div>

        {/* تب‌ها */}
        <div className="flex flex-wrap gap-2">
          <TabButton
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            label="همه"
            count={stats.total}
          />
          <TabButton
            active={activeTab === 'pending'}
            onClick={() => setActiveTab('pending')}
            label="در انتظار"
            count={stats.pending}
          />
          <TabButton
            active={activeTab === 'processing'}
            onClick={() => setActiveTab('processing')}
            label="در حال پردازش"
            count={stats.processing}
          />
          <TabButton
            active={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
            label="تکمیل شده"
            count={stats.completed}
          />
          <TabButton
            active={activeTab === 'cancelled'}
            onClick={() => setActiveTab('cancelled')}
            label="لغو شده"
            count={stats.cancelled}
          />
        </div>
      </div>

      {/* جدول */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">سفارشی یافت نشد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr className="text-right">
                  <th className="px-4 py-3 font-semibold">شماره سفارش</th>
                  <th className="px-4 py-3 font-semibold">مشتری</th>
                  <th className="px-4 py-3 font-semibold">مبلغ</th>
                  <th className="px-4 py-3 font-semibold">وضعیت</th>
                  <th className="px-4 py-3 font-semibold">تاریخ</th>
                  <th className="px-4 py-3 font-semibold text-left">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    expanded={expandedId === order.id}
                    onToggle={() =>
                      setExpandedId((prev) =>
                        prev === order.id ? null : order.id
                      )
                    }
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   🧩 کامپوننت‌های فرعی
   ============================================================ */

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'green' | 'amber' | 'blue' | 'red';
}) {
  const colorMap = {
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-semibold truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
        active
          ? 'bg-brand text-white'
          : 'bg-muted hover:bg-muted/80 text-muted-foreground'
      }`}
    >
      {label}
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full ${
          active ? 'bg-white/20' : 'bg-background'
        }`}
      >
        {count.toLocaleString('fa-IR')}
      </span>
    </button>
  );
}

function OrderRow({
  order,
  expanded,
  onToggle,
  onStatusChange,
  onDelete,
}: {
  order: Order;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <tr className="hover:bg-muted/30 transition-colors">
        <td className="px-4 py-3 font-mono text-xs">{order.orderNumber}</td>
        <td className="px-4 py-3">
          <div>
            <p className="font-medium">{order.userName}</p>
            <p className="text-xs text-muted-foreground">{order.userEmail}</p>
          </div>
        </td>
        <td className="px-4 py-3 font-semibold">
          {formatPrice(order.total)}
        </td>
        <td className="px-4 py-3">
          <OrderStatusBadge status={order.status} size="sm" />
        </td>
        <td className="px-4 py-3 text-muted-foreground text-xs">
          {order.createdAt}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1">
            {/* تغییر وضعیت */}
            <div className="relative group">
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-1 text-xs">
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-lg py-1 min-w-[140px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {ORDER_STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onStatusChange(order.id, opt.value)}
                    disabled={order.status === opt.value}
                    className="w-full text-right px-3 py-1.5 text-xs hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* جزئیات */}
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              title="مشاهده جزئیات"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* حذف */}
            <button
              onClick={() => onDelete(order.id)}
              className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-colors"
              title="حذف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* جزئیات expand شده */}
      {expanded && (
        <tr className="bg-muted/20">
          <td colSpan={6} className="px-4 py-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Filter className="w-4 h-4" />
                جزئیات سفارش
              </div>

              {/* اطلاعات مشتری */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    نام مشتری
                  </p>
                  <p className="font-medium">{order.userName}</p>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">ایمیل</p>
                  <p className="font-medium" dir="ltr">
                    {order.userEmail}
                  </p>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    تلفن
                  </p>
                  <p className="font-medium" dir="ltr">
                    {order.userPhone}
                  </p>
                </div>
              </div>

              {/* آیتم‌ها */}
              <div>
                <p className="text-sm font-semibold mb-2">آیتم‌های سفارش</p>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-background rounded-lg p-3 text-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.type === 'course' ? 'دوره' : 'محصول'}
                          {item.mode && ` • ${item.mode}`}
                          {` • تعداد: ${item.quantity}`}
                        </p>
                      </div>
                      <p className="font-semibold whitespace-nowrap mr-3">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* جمع */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    جمع کل
                  </p>
                  <p className="font-semibold">
                    {formatPrice(order.subtotal)}
                  </p>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    تخفیف
                  </p>
                  <p className="font-semibold text-green-600">
                    {order.discount > 0
                      ? `- ${formatPrice(order.discount)}`
                      : '—'}
                  </p>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    مبلغ نهایی
                  </p>
                  <p className="font-bold text-brand">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* پرداخت */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    روش پرداخت
                  </p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    کد رهگیری
                  </p>
                  <p className="font-medium font-mono" dir="ltr">
                    {order.trackingCode || '—'}
                  </p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ============================================================
   🎁 Export نهایی با Suspense
   ============================================================ */

export default function AdminOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
        </div>
      }
    >
      <OrdersPageContent />
    </Suspense>
  );
}