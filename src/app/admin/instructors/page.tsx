'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  GraduationCap,
  Loader2,
  Mail,
  Phone,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export default function AdminInstructorsPage() {
  const [search, setSearch] = useState('');
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInstructors = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'instructor')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setInstructors(data);
    } catch (error) {
      console.error('خطا در دریافت اساتید:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`آیا از حذف استاد «${name}» مطمئن هستی؟`)) return;
    setDeletingId(id);
    
    try {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (error) throw error;
      setInstructors((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error('خطا در حذف استاد:', error);
      alert('خطا در حذف استاد (ممکن است دوره‌ای به این استاد متصل باشد)');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = instructors.filter((i) =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            مدیریت اساتید
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {instructors.length.toLocaleString('fa-IR')} استاد ثبت شده
          </p>
        </div>
        <Link
          href="/admin/instructors/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          افزودن استاد
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="جستجو در اساتید..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-blue-500 outline-none text-sm transition"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-950/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-right px-5 py-3 font-medium">نام استاد</th>
                <th className="text-right px-5 py-3 font-medium">تماس</th>
                <th className="text-right px-5 py-3 font-medium">تاریخ عضویت</th>
                <th className="text-right px-5 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center text-gray-500 dark:text-gray-400">
                    <GraduationCap className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    استادی یافت نشد
                  </td>
                </tr>
              ) : (
                filtered.map((instructor) => (
                  <tr key={instructor.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          {instructor.name?.charAt(0) || 'ا'}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{instructor.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span dir="ltr">{instructor.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span dir="ltr">{instructor.phone || '—'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300 text-xs">
                      {new Date(instructor.created_at).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/instructors/edit?id=${instructor.id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(instructor.id, instructor.name)}
                          disabled={deletingId === instructor.id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                        >
                          {deletingId === instructor.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}