'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  Loader2,
  Star,
} from 'lucide-react';
import { useDb } from '@/hooks/useDb';

interface Exam {
  id: string;
  slug: string;
  title: string;
  typeLabel: string;
  duration: number;
  questions: number;
  price: number;
  participants: number;
  rating: number;
  certificate: boolean;
  isActive?: boolean;
}

export default function AdminExamsPage() {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { items: exams, remove, isLoading } = useDb<Exam>('exams');

  const filtered = useMemo(() => {
    if (!search) return exams;
    return exams.filter((e) =>
      e.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [exams, search]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف «${title}» مطمئن هستی؟`)) return;
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            مدیریت آزمون‌ها
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {exams.length.toLocaleString('fa-IR')} آزمون ثبت شده
          </p>
        </div>
        <Link
          href="/admin/exams/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          افزودن آزمون
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="جستجو در آزمون‌ها..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-blue-500 outline-none text-sm transition"
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-950/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-right px-5 py-3 font-medium">عنوان</th>
                <th className="text-right px-5 py-3 font-medium">نوع</th>
                <th className="text-right px-5 py-3 font-medium">سوالات</th>
                <th className="text-right px-5 py-3 font-medium">مدت</th>
                <th className="text-right px-5 py-3 font-medium">قیمت</th>
                <th className="text-right px-5 py-3 font-medium">شرکت‌کننده</th>
                <th className="text-right px-5 py-3 font-medium">امتیاز</th>
                <th className="text-right px-5 py-3 font-medium">مدرک</th>
                <th className="text-right px-5 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-5 py-16 text-center text-gray-500 dark:text-gray-400"
                  >
                    <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    آزمونی یافت نشد
                    {exams.length === 0 && (
                      <div className="mt-3">
                        <Link
                          href="/admin/exams/new"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          افزودن اولین آزمون
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((exam) => (
                  <tr
                    key={exam.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                      {exam.title}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {exam.typeLabel}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {(exam.questions || 0).toLocaleString('fa-IR')}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {(exam.duration || 0).toLocaleString('fa-IR')} د
                    </td>
                    <td className="px-5 py-4 text-gray-900 dark:text-white">
                      {exam.price === 0
                        ? 'رایگان'
                        : `${exam.price.toLocaleString('fa-IR')} تومان`}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {(exam.participants || 0).toLocaleString('fa-IR')}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {(exam.rating || 0).toLocaleString('fa-IR')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          exam.certificate
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {exam.certificate ? 'دارد' : 'ندارد'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/exams/${exam.slug}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                          aria-label="مشاهده"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/exams/edit?id=${exam.id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
                          aria-label="ویرایش"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(exam.id, exam.title)}
                          disabled={deletingId === exam.id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                          aria-label="حذف"
                        >
                          {deletingId === exam.id ? (
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