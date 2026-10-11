'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Users,
  Trash2,
  Shield,
  GraduationCap,
  User as UserIcon,
  UserCheck,
  UserX,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';
import { getCollection, updateItem, deleteItem } from '@/lib/api/db';
import {
  UserRoleBadge,
  USER_ROLE_OPTIONS,
  type UserRole,
} from '@/components/admin/UserRoleBadge';

/* ============================================================
   📦 تایپ‌ها
   ============================================================ */

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  isActive: boolean;
  createdAt: string;
}

/* ============================================================
   🎯 کامپوننت اصلی
   ============================================================ */

function UsersPageContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'all';

  const [users, setUsers] = useState<User[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(initialRole);
  const [searchQuery, setSearchQuery] = useState('');

  // بارگذاری کاربران
  useEffect(() => {
    setMounted(true);
    const data = getCollection<User>('users');
    // مرتب‌سازی نزولی بر اساس id
    const sorted = [...data].sort((a, b) => Number(b.id) - Number(a.id));
    setUsers(sorted);
  }, []);

  // آمار
  const stats = useMemo(() => {
    return {
      total: users.length,
      admin: users.filter((u) => u.role === 'admin').length,
      instructor: users.filter((u) => u.role === 'instructor').length,
      user: users.filter((u) => u.role === 'user').length,
      active: users.filter((u) => u.isActive).length,
      inactive: users.filter((u) => !u.isActive).length,
    };
  }, [users]);

  // فیلتر
  const filteredUsers = useMemo(() => {
    let result = users;

    if (activeTab !== 'all') {
      result = result.filter((u) => u.role === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(q)
      );
    }

    return result;
  }, [users, activeTab, searchQuery]);

  // تغییر نقش
  const handleRoleChange = (userId: string, newRole: UserRole) => {
    updateItem('users', userId, { role: newRole });
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  // تغییر وضعیت فعال/غیرفعال
  const handleToggleActive = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    const newStatus = !user.isActive;
    updateItem('users', userId, { isActive: newStatus });
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: newStatus } : u))
    );
  };

  // حذف
  const handleDelete = (userId: string) => {
    if (!confirm('آیا از حذف این کاربر مطمئن هستید؟')) return;
    deleteItem('users', userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
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
            <Users className="w-7 h-7 text-brand" />
            مدیریت کاربران
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {stats.total.toLocaleString('fa-IR')} کاربر ثبت شده
          </p>
        </div>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Shield className="w-5 h-5" />}
          label="مدیران"
          value={stats.admin.toLocaleString('fa-IR')}
          color="purple"
        />
        <StatCard
          icon={<GraduationCap className="w-5 h-5" />}
          label="اساتید"
          value={stats.instructor.toLocaleString('fa-IR')}
          color="blue"
        />
        <StatCard
          icon={<UserIcon className="w-5 h-5" />}
          label="دانشجویان"
          value={stats.user.toLocaleString('fa-IR')}
          color="gray"
        />
        <StatCard
          icon={<UserCheck className="w-5 h-5" />}
          label="فعال"
          value={stats.active.toLocaleString('fa-IR')}
          color="green"
        />
      </div>

      {/* نوار جستجو و فیلتر */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجو بر اساس نام، ایمیل یا تلفن..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
          />
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
            active={activeTab === 'admin'}
            onClick={() => setActiveTab('admin')}
            label="مدیران"
            count={stats.admin}
          />
          <TabButton
            active={activeTab === 'instructor'}
            onClick={() => setActiveTab('instructor')}
            label="اساتید"
            count={stats.instructor}
          />
          <TabButton
            active={activeTab === 'user'}
            onClick={() => setActiveTab('user')}
            label="دانشجویان"
            count={stats.user}
          />
        </div>
      </div>

      {/* جدول */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">کاربری یافت نشد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr className="text-right">
                  <th className="px-4 py-3 font-semibold">کاربر</th>
                  <th className="px-4 py-3 font-semibold">تماس</th>
                  <th className="px-4 py-3 font-semibold">نقش</th>
                  <th className="px-4 py-3 font-semibold">وضعیت</th>
                  <th className="px-4 py-3 font-semibold">تاریخ عضویت</th>
                  <th className="px-4 py-3 font-semibold text-left">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onRoleChange={handleRoleChange}
                    onToggleActive={handleToggleActive}
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
  color: 'purple' | 'blue' | 'gray' | 'green';
}) {
  const colorMap = {
    purple:
      'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    green:
      'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
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

function UserRow({
  user,
  onRoleChange,
  onToggleActive,
  onDelete,
}: {
  user: User;
  onRoleChange: (id: string, role: UserRole) => void;
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      {/* کاربر */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              user.isActive
                ? 'bg-brand/10 text-brand'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">#{user.id}</p>
          </div>
        </div>
      </td>

      {/* تماس */}
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs">
            <Mail className="w-3 h-3 text-muted-foreground" />
            <span dir="ltr">{user.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="w-3 h-3" />
            <span dir="ltr">{user.phone}</span>
          </div>
        </div>
      </td>

      {/* نقش */}
      <td className="px-4 py-3">
        <UserRoleBadge role={user.role} size="sm" />
      </td>

      {/* وضعیت */}
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
            user.isActive
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {user.isActive ? (
            <UserCheck className="w-3 h-3" />
          ) : (
            <UserX className="w-3 h-3" />
          )}
          {user.isActive ? 'فعال' : 'غیرفعال'}
        </span>
      </td>

      {/* تاریخ */}
      <td className="px-4 py-3 text-muted-foreground text-xs">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          {user.createdAt}
        </div>
      </td>

      {/* عملیات */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1">
          {/* تغییر نقش */}
          <div className="relative group">
            <button
              className="p-1.5 rounded-lg hover:bg-muted transition-colors flex items-center gap-1"
              title="تغییر نقش"
            >
              <Shield className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute left-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-lg py-1 min-w-[120px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {USER_ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onRoleChange(user.id, opt.value)}
                  disabled={user.role === opt.value}
                  className="w-full text-right px-3 py-1.5 text-xs hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* فعال/غیرفعال */}
          <button
            onClick={() => onToggleActive(user.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              user.isActive
                ? 'hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600'
                : 'hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600'
            }`}
            title={user.isActive ? 'غیرفعال کردن' : 'فعال کردن'}
          >
            {user.isActive ? (
              <UserX className="w-4 h-4" />
            ) : (
              <UserCheck className="w-4 h-4" />
            )}
          </button>

          {/* حذف */}
          <button
            onClick={() => onDelete(user.id)}
            className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ============================================================
   🎁 Export نهایی با Suspense
   ============================================================ */

export default function AdminUsersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
        </div>
      }
    >
      <UsersPageContent />
    </Suspense>
  );
}