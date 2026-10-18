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
  Loader2,
  CreditCard,
} from 'lucide-react';
import { supabase } from '@/lib/supabase'; // 👈 ایمپورت Supabase

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
  status: string;
  paymentMethod: string;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
}

// 👈 وضعیت‌های متناسب با دیتابیس
const ORDER_STATUS_OPTIONS = [
  { value: 'pending', label: 'در انتظار پرداخت', color: 'amber' },
  { value: 'paid', label: 'پرداخت شده', color: 'blue' },
  { value: 'completed', label: 'تکمیل شده', color: 'green' },
  { value: 'cancelled', label: 'لغو شده', color: 'red' },
];

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
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>(initialStatus);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // دریافت اطلاعات از Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const mappedOrders: Order[] = data.map((o: any) => {
            return {
              id: o.id,
              orderNumber: o.order_number,
              userId: o.user_id,
              userName: 'کاربر', // چون اسم کاربر توی جدول orders نیست، اینجا قرار میدیم
              userEmail: '-',
              userPhone: '-',
              items: o.items || [],
              subtotal: o.total_amount,
              discount: 0,
              total: o.total_amount,
              status: o.status,
              paymentMethod: o.payment_method === 'zarinpal' ? 'زرین‌پال' : 
                             o.payment_method === 'idpay' ? 'آیدی‌پی' : 
                             o.payment_method === 'wallet' ? 'کیف پول' : 'پرداخت آنلاین',
              trackingCode: '-',
              createdAt: new Date(o.created_at).toLocaleDateString('fa-IR'),
              updatedAt: new Date(o.updated_at).toLocaleDateString('fa-IR'),
            };
          });
          setOrders(mappedOrders);
        }
      } catch (err) {
        console.error('خطا در دریافت سفارشات:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // آمار
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      paid: orders.filter((o) => o.status === 'paid').length,
      completed: orders.filter((o) => o.status === 'completed').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
      revenue: orders
        .filter((o) => o.status === 'completed' || o.status === 'paid')
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
          o.userName.toLowerCase().includes(q)
      );
    }

    return result;
  }, [orders, activeTab, searchQuery]);

  // تغییر وضعیت در دیتابیس
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error('خطا در تغییر وضعیت:', err);
      alert('خطا در تغییر وضعیت سفارش');
    }
  };

  // حذف از دیتابیس
  const handleDelete = async (orderId: string) => {
    if (!confirm('آیا از حذف این سفارش مطمئن هستید؟')) return;
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      console.error('خطا در حذف سفارش:', err);
      alert('خطا در حذف سفارش');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-brand-800 mx-auto mb-4" />
          <p className="text-slate-500">در حال دریافت سفارشات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* هدر */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <ShoppingBag className="w-7 h-7 text-brand-800 dark:text-brand-400" />
            مدیریت سفارشات
          </h1>
          <p className="text-sm text-slate-500 mt-1">
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
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="جستجو بر اساس شماره سفارش یا نام..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-sm text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {/* تب‌ها */}
        <div className="flex flex-wrap gap-2">
          <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="همه" count={stats.total} />
          <TabButton active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} label="در انتظار" count={stats.pending} />
          <TabButton active={activeTab === 'paid'} onClick={() => setActiveTab('paid')} label="پرداخت شده" count={stats.paid} />
          <TabButton active={activeTab === 'completed'} onClick={() => setActiveTab('completed')} label="تکمیل شده" count={stats.completed} />
          <TabButton active={activeTab === 'cancelled'} onClick={() => setActiveTab('cancelled')} label="لغو شده" count={stats.cancelled} />
        </div>
      </div>

      {/* جدول */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-slate-500">سفارشی یافت نشد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr className="text-right">
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">شماره سفارش</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">مشتری</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">مبلغ</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">وضعیت</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">تاریخ</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300 text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOrders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    expanded={expandedId === order.id}
                    onToggle={() => setExpandedId((prev) => prev === order.id ? null : order.id)}
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

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'green' | 'amber' | 'blue' | 'red'; }) {
  const colorMap = {
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
          <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number; }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${
        active
          ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
      }`}
    >
      {label}
      <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-900 text-slate-500'}`}>
        {count.toLocaleString('fa-IR')}
      </span>
    </button>
  );
}

function OrderRow({ order, expanded, onToggle, onStatusChange, onDelete }: { order: Order; expanded: boolean; onToggle: () => void; onStatusChange: (id: string, status: string) => void; onDelete: (id: string) => void; }) {
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
    paid: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
    completed: 'bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300',
  };

  const statusLabels: Record<string, string> = {
    pending: 'در انتظار',
    paid: 'پرداخت شده',
    completed: 'تکمیل شده',
    cancelled: 'لغو شده',
  };

  return (
    <>
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
        <td className="px-4 py-3 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{order.orderNumber}</td>
        <td className="px-4 py-3">
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-100">{order.userName}</p>
            <p className="text-xs text-slate-500">{order.userEmail}</p>
          </div>
        </td>
        <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-100">{formatPrice(order.total)}</td>
        <td className="px-4 py-3">
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || statusColors.pending}`}>
            {statusLabels[order.status] || order.status}
          </span>
        </td>
        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{order.createdAt}</td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1.5">
            <div className="relative group">
              <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 min-w-[140px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                {ORDER_STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onStatusChange(order.id, opt.value)}
                    disabled={order.status === opt.value}
                    className="w-full text-right px-4 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-200"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors" title="مشاهده جزئیات">
              <Eye className="w-4 h-4" />
            </button>

            <button onClick={() => onDelete(order.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-colors" title="حذف">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-slate-50/50 dark:bg-slate-800/20">
          <td colSpan={6} className="px-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                <Filter className="w-4 h-4" />
                جزئیات سفارش
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">شناسه کاربر</p>
                  <p className="font-medium font-mono text-xs" dir="ltr">{order.userId}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">روش پرداخت</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">مبلغ نهایی</p>
                  <p className="font-bold text-brand-800 dark:text-brand-300">{formatPrice(order.total)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">آیتم‌های سفارش</p>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800 text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {item.type === 'course' ? 'دوره' : 'محصول'}
                          {item.mode && ` • ${item.mode}`}
                          {` • تعداد: ${item.quantity}`}
                        </p>
                      </div>
                      <p className="font-bold whitespace-nowrap mr-3 text-slate-800 dark:text-slate-100">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-brand-800" />
      </div>
    }>
      <OrdersPageContent />
    </Suspense>
  );
}