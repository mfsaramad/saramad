'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { ProductForm, type ProductFormData } from '@/components/admin/ProductForm';
import { supabase } from '@/lib/supabase';

export default function NewProductPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    setIsSaving(true);
    try {
      // مپ کردن داده‌های فرم به ستون‌های دیتابیس
      const { error } = await supabase.from('products').insert({
        title: data.title,
        slug: data.slug || data.title.replace(/\s+/g, '-').toLowerCase(),
        description: data.description || '',
        long_description: data.longDescription || '',
        price: data.price,
        original_price: data.originalPrice,
        type_label: data.typeLabel,
        badge: data.badge,
        rating: data.rating || 0,
        sales_count: data.salesCount || 0,
        is_active: true,
      });

      if (error) throw error;

      alert('محصول با موفقیت اضافه شد');
      router.push('/admin/products');
    } catch (error: any) {
      console.error(error);
      alert('خطا در ذخیره محصول: ' + (error.message || 'نامشخص'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            افزودن محصول جدید
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            اطلاعات محصول رو پر کن و ذخیره کن
          </p>
        </div>
      </div>

      {isSaving && (
        <div className="p-4 bg-blue-50 text-blue-700 rounded-xl flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin" />
          در حال ذخیره‌سازی...
        </div>
      )}

      <ProductForm onSubmit={handleSubmit} mode="create" />
    </div>
  );
}