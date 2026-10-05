import Link from 'next/link';
import {
  Users,
  BookOpen,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';

const recentOrders = [
  { id: '1', orderNumber: 'SRM-14040701-001', name: 'علی رضایی', amount: 2500000, status: 'completed' },
  { id: '2', orderNumber: 'SRM-14040628-002', name: 'زهرا محمدی', amount: 1800000, status: 'processing' },
  { id: '3', orderNumber: 'SRM-14040620-003', name: 'حسن کریمی', amount: 900000, status: 'pending' },
  { id: '4', orderNumber: 'SRM-14040615-004', name: 'مریم حسینی', amount: 2700000, status: 'cancelled' },
];

const statusLabels: Record<string, { label: string; className: string }> = {
  pending: { label: 'در انتظار', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  processing: { label: 'در حال پردازش', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  completed: { label: 'تکمیل شده', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  cancelled: { label: 'لغو شده', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          داشبورد مدیریت
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          نمای کلی از وضعیت سایت
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="کاربران" value={1284} change={12} icon={Users} color="blue" />
        <StatCard title="دوره‌ها" value={42} change={5} icon={BookOpen} color="purple" />
        <StatCard title="سفارشات" value={356} change={-3} icon={ShoppingBag} color="orange" />
        <StatCard title="درآمد (تومان)" value="۴۵٫۲M" change={18} icon={DollarSign} color="green" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">
              سفارشات اخیر
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              آخرین تراکنش‌های ثبت شده
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            مشاهده همه
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-950/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-right px-5 py-3 font-medium">شماره سفارش</th>
                <th className="text-right px-5 py-3 font-medium">مشتری</th>
                <th className="text-right px-5 py-3 font-medium">مبلغ</th>
                <th className="text-right px-5 py-3 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentOrders.map((order) => {
                const status = statusLabels[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-5 py-4 text-gray-900 dark:text-white font-medium">
                      {order.orderNumber}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {order.name}
                    </td>
                    <td className="px-5 py-4 text-gray-900 dark:text-white">
                      {order.amount.toLocaleString('fa-IR')} تومان
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/courses"
          className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl transition shadow-lg shadow-blue-500/20"
        >
          <BookOpen className="w-8 h-8 mb-3" />
          <div className="font-bold">مدیریت دوره‌ها</div>
          <div className="text-sm opacity-90 mt-1">افزودن، ویرایش و حذف دوره‌ها</div>
        </Link>

        <Link
          href="/admin/users"
          className="p-5 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl transition shadow-lg shadow-purple-500/20"
        >
          <Users className="w-8 h-8 mb-3" />
          <div className="font-bold">مدیریت کاربران</div>
          <div className="text-sm opacity-90 mt-1">مشاهده و مدیریت کاربران</div>
        </Link>

        <Link
          href="/admin/orders"
          className="p-5 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl transition shadow-lg shadow-green-500/20"
        >
          <TrendingUp className="w-8 h-8 mb-3" />
          <div className="font-bold">مدیریت سفارشات</div>
          <div className="text-sm opacity-90 mt-1">پیگیری تراکنش‌ها</div>
        </Link>
      </div>
    </div>
  );
}