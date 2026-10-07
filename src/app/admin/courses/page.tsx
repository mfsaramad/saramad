'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { useDb } from '@/hooks/useDb';

interface AdminCourse {
  id: string;
  slug: string;
  title: string;
  instructor?: { id: string; name: string };
  instructorId?: string;
  price: {
    'in-person'?: number;
    online?: number;
    hybrid?: number;
  };
  studentsCount?: number;
  mode: 'in-person' | 'online' | 'hybrid';
  isActive?: boolean;
}

const modeLabels = {
  'in-person': 'حضوری',
  online: 'آنلاین',
  hybrid: 'ترکیبی',
};

export default function AdminCoursesPage() {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { items: courses, remove, isLoading, refresh } = useDb<AdminCourse>('courses');

  const filtered = useMemo(() => {
    if (!search) return courses;
    return courses.filter((c) =>
      c.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [courses, search]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف «${title}» مطمئن هستی؟`)) return;
    setDeletingId(id);
    remove(id);
    setDeletingId(null);
  };

  const getPrice = (course: AdminCourse): number => {
    const p = course.price || {};
    return p['in-person'] || p.online || p.hybrid || 0;
  };

  const getInstructorName = (course: AdminCourse): string => {
    return course.instructor?.name || '—';
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
            مدیریت دوره‌ها
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {courses.length.toLocaleString('fa-IR')} دوره ثبت شده
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          افزودن دوره
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="جستجو در دوره‌ها..."
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
                <th className="text-right px-5 py-3 font-medium">عنوان</th>
                <th className="text-right px-5 py-3 font-medium">استاد</th>
                <th className="text-right px-5 py-3 font-medium">نوع</th>
                <th className="text-right px-5 py-3 font-medium">قیمت</th>
                <th className="text-right px-5 py-3 font-medium">دانشجو</th>
                <th className="text-right px-5 py-3 font-medium">وضعیت</th>
                <th className="text-right px-5 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center text-gray-500 dark:text-gray-400"
                  >
                    <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    دوره‌ای یافت نشد
                    {courses.length === 0 && (
                      <div className="mt-3">
                        <Link
                          href="/admin/courses/new"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          افزودن اولین دوره
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {getInstructorName(course)}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {modeLabels[course.mode] || course.mode}
                    </td>
                    <td className="px-5 py-4 text-gray-900 dark:text-white">
                      {getPrice(course).toLocaleString('fa-IR')} تومان
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {(course.studentsCount || 0).toLocaleString('fa-IR')}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.isActive !== false
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {course.isActive !== false ? 'منتشر شده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/courses/${course.slug}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                          aria-label="مشاهده"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/courses/${course.id}/edit`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
                          aria-label="ویرایش"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(course.id, course.title)}
                          disabled={deletingId === course.id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                          aria-label="حذف"
                        >
                          {deletingId === course.id ? (
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