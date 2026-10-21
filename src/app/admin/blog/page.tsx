'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  created_at: string;
  read_time: number;
  is_active?: boolean;
}

export default function AdminBlogPage() {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // دریافت مقالات از دیتابیس
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return posts;
    return posts.filter(
      (p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.author?.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف «${title}» مطمئن هستی؟`)) return;
    setDeletingId(id);
    
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    
    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('خطا در حذف مقاله');
    }
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
            مدیریت مقالات
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {posts.length.toLocaleString('fa-IR')} مقاله ثبت شده
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          افزودن مقاله
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="جستجو در مقالات..."
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
                <th className="text-right px-5 py-3 font-medium">دسته</th>
                <th className="text-right px-5 py-3 font-medium">نویسنده</th>
                <th className="text-right px-5 py-3 font-medium">تاریخ</th>
                <th className="text-right px-5 py-3 font-medium">زمان مطالعه</th>
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
                    <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    مقاله‌ای یافت نشد
                    {posts.length === 0 && (
                      <div className="mt-3">
                        <Link
                          href="/admin/blog/new"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          افزودن اولین مقاله
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                        {post.category || 'عمومی'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {post.author || 'مدیر سیستم'}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {post.created_at ? new Date(post.created_at).toLocaleDateString('fa-IR') : '—'}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {(post.read_time || 0).toLocaleString('fa-IR')} دقیقه
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.is_active !== false
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {post.is_active !== false ? 'منتشر شده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                          aria-label="مشاهده"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/edit?id=${post.id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
                          aria-label="ویرایش"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                          aria-label="حذف"
                        >
                          {deletingId === post.id ? (
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