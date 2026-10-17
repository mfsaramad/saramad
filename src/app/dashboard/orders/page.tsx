'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  X,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
  Package,
  ArrowLeft,
  Eye,
  Download,
  Calendar,
  TrendingUp,
  Award,
  Receipt,
  Loader2,
} from 'lucide-react';
import { toPersianNumber, formatPrice } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext'; // 👈 اضافه شد
import { supabase } from '@/lib/supabase'; // 👈 اضافه شد

type OrderStatus = 'pending' | 'paid' | 'completed' | 'cancelled';
type FilterType = 'all' | OrderStatus;

interface Order {
  id: string;
  orderNumber: string;
  title: string;
  type: 'course' | 'product' | 'exam';
  typeLabel: string;
  price: number;
  discount: number;
  tax: number;
  finalPrice: number;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
  items: { title: string; price: number }[];
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    color: 'teal' | 'brand' | 'accent' | 'red';
  }
> = {
  pending: { label: 'در انتظار پرداخت', icon: Clock, color: 'accent' },
  paid: { label: 'پرداخت شده', icon: CreditCard, color: 'brand' },
  completed: { label: 'تکمیل شده', icon: CheckCircle2, color: 'teal' },
  cancelled: { label: 'لغو شده', icon: XCircle, color: 'red' },
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]); // 👈 استیت برای سفارشات
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 👈 دریافت سفارشات از Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          // تبدیل دیتای Supabase به ساختاری که UI انتظار دارد
          const formattedOrders: Order[] = data.map((item: any) => {
            const orderItems = item.items || [];
            const firstItem = orderItems[0] || {};
            
            // تشخیص نوع سفارش از روی اولین آیتم
            let orderType: 'course' | 'product' | 'exam' = 'product';
            let typeLabel = 'محصول';
            if (firstItem.type === 'course') {
              orderType = 'course';
              typeLabel = 'دوره آموزشی';
            } else if (firstItem.type === 'exam') {
              orderType = 'exam';
              typeLabel = 'آزمون';
            }

            return {
              id: item.id,
              orderNumber: item.order_number,
              title: orderItems.length > 1 
                ? `${firstItem.title} و ${orderItems.length - 1} آیتم دیگر` 
                : firstItem.title || 'سفارش',
              type: orderType,
              typeLabel: typeLabel,
              price: item.total_amount,
              discount: 0,
              tax: 0,
              finalPrice: item.total_amount,
              status: (item.status as OrderStatus) || 'pending',
              date: new Date(item.created_at).toLocaleDateString('fa-IR'),
              paymentMethod: item.payment_method === 'zarinpal' ? 'زرین‌پال' : 
                             item.payment_method === 'idpay' ? 'آیدی‌پی' : 
                             item.payment_method === 'wallet' ? 'کیف پول' : 'پرداخت آنلاین',
              items: orderItems.map((i: any) => ({ title: i.title, price: i.price })),
            };
          });
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error('خطا در دریافت سفارشات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (activeTab !== 'all') {
      result = result.filter((o) => o.status === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.orderNumber.toLowerCase().includes(q)
      );
    }

    return result;
  }, [orders, activeTab, searchQuery]);

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    paid: orders.filter((o) => o.status === 'paid').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  const totalSpent = orders
    .filter((o) => o.status === 'completed' || o.status === 'paid')
    .reduce((sum, o) => sum + o.finalPrice, 0);

  const tabs = [
    { id: 'all' as FilterType, label: 'همه', icon: '📦', count: counts.all },
    { id: 'completed' as FilterType, label: 'تکمیل شده', icon: '✅', count: counts.completed },
    { id: 'paid' as FilterType, label: 'پرداخت شده', icon: '💳', count: counts.paid },
    { id: 'pending' as FilterType, label: 'در انتظار', icon: '⏳', count: counts.pending },
    { id: 'cancelled' as FilterType, label: 'لغو شده', icon: '❌', count: counts.cancelled },
  ];

  const stats = [
    { icon: ShoppingBag, value: toPersianNumber(orders.length), label: 'کل سفارشات', color: 'brand' as const },
    { icon: CheckCircle2, value: toPersianNumber(counts.completed), label: 'تکمیل شده', color: 'teal' as const },
    { icon: Clock, value: toPersianNumber(counts.pending), label: 'در انتظار', color: 'accent' as const },
    { icon: TrendingUp, value: formatPrice(totalSpent), label: 'مجموع خرید', color: 'purple' as const },
  ];

  const statColorMap = {
    brand: { bg: 'bg-blue-100 dark:bg-blue-950/50', icon: 'text-blue-800 dark:text-blue-300' },
    teal: { bg: 'bg-teal-100 dark:bg-teal-950/50', icon: 'text-teal-600 dark:text-teal-300' },
    accent: { bg: 'bg-orange-100 dark:bg-orange-950/50', icon: 'text-orange-600 dark:text-orange-300' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-950/50', icon: 'text-purple-600 dark:text-purple-300' },
  };

  const statusColorMap = {
    teal: 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300',
    brand: 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300',
    accent: 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300',
    red: 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300',
  };

  // 👈 حالت لودینگ
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-800 dark:text-brand-400 animate-spin mb-4" />
        <p className="text-slate-500 dark:text-slate-400 font-bold">در حال دریافت سفارشات...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold mb-3">
              <Receipt className="w-3.5 h-3.5 text-orange-300" />
              <span>سفارشات من</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black mb-2">
              سفارشات من 📦
            </h1>
            <p className="text-blue-100 text-sm lg:text-base">
              تمام سفارشات و تراکنش‌های شما در سرآمد
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = statColorMap[stat.color];

          return (
            <FadeIn key={index} delay={index * 0.08}>
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center mb-3',
                    colors.bg
                  )}
                >
                  <Icon className={cn('w-5 h-5', colors.icon)} />
                </div>
                <div className="text-lg lg:text-xl font-black text-slate-800 dark:text-slate-100 mb-1 line-clamp-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Search */}
      <FadeIn delay={0.15}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در سفارشات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.2}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-100 dark:border-slate-800 inline-flex flex-wrap gap-1 max-w-full overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-[10px]',
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                )}
              >
                {toPersianNumber(tab.count)}
              </span>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => {
            const statusInfo = statusConfig[order.status];
            const StatusIcon = statusInfo.icon;

            return (
              <FadeIn key={order.id} delay={index * 0.05} direction="up">
                <div className="group bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-xl transition-all p-5 lg:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl',
                          order.type === 'course' && 'bg-blue-100 dark:bg-blue-950/50',
                          order.type === 'product' && 'bg-teal-100 dark:bg-teal-950/50',
                          order.type === 'exam' && 'bg-orange-100 dark:bg-orange-950/50'
                        )}
                      >
                        {order.type === 'course' && '🎓'}
                        {order.type === 'product' && '📦'}
                        {order.type === 'exam' && '📝'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {order.typeLabel}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                            {order.orderNumber}
                          </span>
                        </div>
                        <h3 className="font-black text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                          {order.title}
                        </h3>
                      </div>
                    </div>

                    {/* Status */}
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black flex-shrink-0',
                        statusColorMap[statusInfo.color]
                      )}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.label}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{order.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" />
                      <span>{toPersianNumber(order.items.length)} آیتم</span>
                    </div>
                  </div>

                  {/* Price + Actions */}
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        مبلغ کل
                      </div>
                      <div className="text-lg font-black text-brand-800 dark:text-brand-300">
                        {formatPrice(order.finalPrice)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition-all">
                        <Eye className="w-4 h-4" />
                        جزئیات
                      </button>

                      {order.status === 'completed' && (
                        <button className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                          <Download className="w-4 h-4" />
                          فاکتور
                        </button>
                      )}

                      {order.status === 'pending' && (
                        <Link
                          href="/checkout"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-l from-orange-500 to-orange-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
                        >
                          <CreditCard className="w-4 h-4" />
                          پرداخت
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })
        ) : (
          <FadeIn>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
                سفارشی یافت نشد
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                {orders.length === 0 
                  ? 'شما هنوز هیچ سفارشی ثبت نکرده‌اید.' 
                  : 'فیلتر یا جستجوی خود را تغییر دهید.'}
              </p>
              {orders.length === 0 ? (
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition hover:gap-3"
                >
                  مشاهده دوره‌ها
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setActiveTab('all');
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition hover:gap-3"
                >
                  <X className="w-4 h-4" />
                  پاک کردن فیلترها
                </button>
              )}
            </div>
          </FadeIn>
        )}
      </div>

      {/* CTA */}
      {filteredOrders.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-orange-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">
                    دوره جدید می‌خوای؟
                  </h3>
                  <p className="text-sm text-blue-100">
                    دوره‌های جدید سرآمد رو ببین و مهارت جدید یاد بگیر
                  </p>
                </div>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-800 rounded-xl font-black hover:bg-blue-50 transition-all hover:gap-3 group"
              >
                مشاهده دوره‌ها
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}