'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ShoppingBag,
  Loader2,
  Star,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  slug: string;
  title: string;
  type_label: string;
  price: number;
  original_price?: number;
  rating: number;
  sales_count: number;
  badge?: string;
  is_active?: boolean;
}

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // دریافت محصولات از دیتابیس
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return products;
    return products.filter((p) =>
      p.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف «${title}» مطمئن هستی؟`)) return;
    setDeletingId(id);
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('خطا در حذف محصول');
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
            مدیریت محصولات
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {products.length.toLocaleString('fa-IR')} محصول ثبت شده
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          افزودن محصول
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="جستجو در محصولات..."
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
                <th className="text-right px-5 py-3 font-medium">قیمت</th>
                <th className="text-right px-5 py-3 font-medium">امتیاز</th>
                <th className="text-right px-5 py-3 font-medium">فروش</th>
                <th className="text-right px-5 py-3 font-medium">برچسب</th>
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
                    <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    محصولی یافت نشد
                    {products.length === 0 && (
                      <div className="mt-3">
                        <Link
                          href="/admin/products/new"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          افزودن اولین محصول
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                      {product.title}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {product.type_label || '—'}
                    </td>
                    <td className="px-5 py-4 text-gray-900 dark:text-white">
                      {(product.price || 0).toLocaleString('fa-IR')} تومان
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {(product.rating || 0).toLocaleString('fa-IR')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {(product.sales_count || 0).toLocaleString('fa-IR')}
                    </td>
                    <td className="px-5 py-4">
                      {product.badge ? (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.is_active !== false
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {product.is_active !== false ? 'فعال' : 'غیرفعال'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/shop/${product.slug}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                          aria-label="مشاهده"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/products/edit?id=${product.id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
                          aria-label="ویرایش"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id, product.title)}
                          disabled={deletingId === product.id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                          aria-label="حذف"
                        >
                          {deletingId === product.id ? (
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