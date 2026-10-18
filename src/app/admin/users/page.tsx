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
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase'; // 👈 ایمپورت Supabase
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
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>(initialRole);
  const [searchQuery, setSearchQuery] = useState('');

  // دریافت کاربران از Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const mappedUsers: User[] = data.map((u: any) => ({
            id: u.id,
            name: u.name || 'کاربر ناشناس',
            email: u.email || '-',
            phone: u.phone || '-',
            role: (u.role as UserRole) || 'user',
            avatar: u.avatar || '',
            isActive: true, // فعلاً چون ستون فعال/غیرفعال در دیتابیس نداریم، همه را فعال در نظر می‌گیریم
            createdAt: new Date(u.created_at).toLocaleDateString('fa-IR'),
          }));
          setUsers(mappedUsers);
        }
      } catch (err) {
        console.error('خطا در دریافت کاربران:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
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

  // تغییر نقش در دیتابیس
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error('خطا در تغییر نقش:', err);
      alert('خطا در تغییر نقش کاربر');
    }
  };

  // تغییر وضعیت فعال/غیرفعال
  // 👈 فعلاً چون ستونی در دیتابیس نداریم، فقط در ظاهر تغییر می‌کند
  const handleToggleActive = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
  };

  // حذف از دیتابیس
  const handleDelete = async (userId: string) => {
    if (!confirm('آیا از حذف این کاربر مطمئن هستید؟')) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error('خطا در حذف کاربر:', err);
      alert('خطا در حذف کاربر');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-brand-800 dark:text-brand-400 mb-4" />
        <p className="text-slate-500 font-bold">در حال دریافت کاربران...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* هدر */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <Users className="w-7 h-7 text-brand-800 dark:text-brand-400" />
            مدیریت کاربران
          </h1>
          <p className="text-sm text-slate-500 mt-1">
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
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو بر اساس نام، ایمیل یا تلفن..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-sm text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* تب‌ها */}
        <div className="flex flex-wrap gap-2">
          <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="همه" count={stats.total} />
          <TabButton active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} label="مدیران" count={stats.admin} />
          <TabButton active={activeTab === 'instructor'} onClick={() => setActiveTab('instructor')} label="اساتید" count={stats.instructor} />
          <TabButton active={activeTab === 'user'} onClick={() => setActiveTab('user')} label="دانشجویان" count={stats.user} />
        </div>
      </div>

      {/* جدول */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-slate-500">کاربری یافت نشد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <tr className="text-right">
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">کاربر</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">تماس</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">نقش</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">وضعیت</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">تاریخ عضویت</th>
                  <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300 text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
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

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'purple' | 'blue' | 'gray' | 'green'; }) {
  const colorMap = {
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    gray: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
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

function UserRow({ user, onRoleChange, onToggleActive, onDelete }: { user: User; onRoleChange: (id: string, role: UserRole) => void; onToggleActive: (id: string) => void; onDelete: (id: string) => void; }) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      {/* کاربر */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.isActive ? 'bg-brand-100 text-brand-800 dark:bg-brand-950/50 dark:text-brand-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
            <p className="text-[10px] text-slate-400 font-mono" dir="ltr">#{user.id.slice(0, 8)}</p>
          </div>
        </div>
      </td>

      {/* تماس */}
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <Mail className="w-3 h-3 text-slate-400" />
            <span dir="ltr">{user.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Phone className="w-3 h-3 text-slate-400" />
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
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          {user.isActive ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
          {user.isActive ? 'فعال' : 'غیرفعال'}
        </span>
      </td>

      {/* تاریخ */}
      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {user.createdAt}
        </div>
      </td>

      {/* عملیات */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1.5">
          {/* تغییر نقش */}
          <div className="relative group">
            <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 text-slate-600 dark:text-slate-300" title="تغییر نقش">
              <Shield className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 min-w-[120px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {USER_ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onRoleChange(user.id, opt.value)}
                  disabled={user.role === opt.value}
                  className="w-full text-right px-4 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-200"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* فعال/غیرفعال */}
          <button
            onClick={() => onToggleActive(user.id)}
            className={`p-1.5 rounded-lg transition-colors ${user.isActive ? 'hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600' : 'hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600'}`}
            title={user.isActive ? 'غیرفعال کردن' : 'فعال کردن'}
          >
            {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
          </button>

          {/* حذف */}
          <button onClick={() => onDelete(user.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-colors" title="حذف">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-brand-800" />
      </div>
    }>
      <UsersPageContent />
    </Suspense>
  );
}