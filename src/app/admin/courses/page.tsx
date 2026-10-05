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
} from 'lucide-react';

interface AdminCourse {
  id: string;
  title: string;
  instructor: string;
  price: number;
  students: number;
  type: 'in-person' | 'online' | 'hybrid';
  status: 'published' | 'draft';
}

const mockCourses: AdminCourse[] = [
  {
    id: '1',
    title: 'دوره جامع React و Next.js',
    instructor: 'استاد محمدی',
    price: 2500000,
    students: 142,
    type: 'online',
    status: 'published',
  },
  {
    id: '2',
    title: 'دوره Python مقدماتی تا پیشرفته',
    instructor: 'استاد رضایی',
    price: 1800000,
    students: 98,
    type: 'online',
    status: 'published',
  },
  {
    id: '3',
    title: 'دوره UI/UX Design',
    instructor: 'استاد کریمی',
    price: 3200000,
    students: 67,
    type: 'hybrid',
    status: 'published',
  },
  {
    id: '4',
    title: 'دوره TypeScript پیشرفته',
    instructor: 'استاد محمدی',
    price: 2200000,
    students: 0,
    type: 'online',
    status: 'draft',
  },
];

const typeLabels = {
  'in-person': 'حضوری',
  online: 'آنلاین',
  hybrid: 'ترکیبی',
};

export default function AdminCoursesPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return mockCourses;
    return mockCourses.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            مدیریت دوره‌ها
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {mockCourses.length.toLocaleString('fa-IR')} دوره ثبت شده
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
                  <td colSpan={7} className="px-5 py-16 text-center text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    دوره‌ای یافت نشد
                  </td>
                </tr>
              ) : (
                filtered.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {course.instructor}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {typeLabels[course.type]}
                    </td>
                    <td className="px-5 py-4 text-gray-900 dark:text-white">
                      {course.price.toLocaleString('fa-IR')} تومان
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {course.students.toLocaleString('fa-IR')}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          course.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {course.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/courses/${course.id}`}
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
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                          aria-label="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
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