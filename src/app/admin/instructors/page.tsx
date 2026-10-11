'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  GraduationCap,
  Loader2,
  Star,
} from 'lucide-react';
import { useDb } from '@/hooks/useDb';

interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  specialties: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
  isActive?: boolean;
}

export default function AdminInstructorsPage() {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { items: instructors, remove, isLoading } = useDb<Instructor>('instructors');

  const filtered = useMemo(() => {
    if (!search) return instructors;
    return instructors.filter((i) =>
      i.name?.toLowerCase().includes(search.toLowerCase()) ||
      i.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [instructors, search]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`آیا از حذف «${name}» مطمئن هستی؟`)) return;
    setDeletingId(id);
    remove(id);
    setDeletingId(null);
  };

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                <th className="text-right px-5 py-3 font-medium">نام</th>
                <th className="text-right px-5 py-3 font-medium">عنوان</th>
                <th className="text-right px-5 py-3 font-medium">تخصص‌ها</th>
                <th className="text-right px-5 py-3 font-medium">دوره‌ها</th>
                <th className="text-right px-5 py-3 font-medium">دانشجو</th>
                <th className="text-right px-5 py-3 font-medium">امتیاز</th>
                <th className="text-right px-5 py-3 font-medium">وضعیت</th>
                <th className="text-right px-5 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-16 text-center text-gray-500 dark:text-gray-400"
                  >
                    <GraduationCap className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    استادی یافت نشد
                    {instructors.length === 0 && (
                      <div className="mt-3">
                        <Link
                          href="/admin/instructors/new"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          افزودن اولین استاد
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((instructor) => (
                  <tr
                    key={instructor.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                      {instructor.name}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {instructor.title}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {instructor.specialties?.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="inline-flex px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs"
                          >
                            {s}
                          </span>
                        ))}
                        {instructor.specialties?.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{instructor.specialties.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {(instructor.coursesCount || 0).toLocaleString('fa-IR')}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {(instructor.studentsCount || 0).toLocaleString('fa-IR')}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {(instructor.rating || 0).toLocaleString('fa-IR')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          instructor.isActive !== false
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {instructor.isActive !== false ? 'فعال' : 'غیرفعال'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/instructors/${instructor.id}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                          aria-label="مشاهده"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/instructors/edit?id=${instructor.id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
                          aria-label="ویرایش"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(instructor.id, instructor.name)}
                          disabled={deletingId === instructor.id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                          aria-label="حذف"
                        >
                          {deletingId === instructor.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
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
