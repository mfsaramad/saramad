'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { ProductForm, type ProductFormData } from '@/components/admin/ProductForm';
import { useDb } from '@/hooks/useDb';

interface Product {
  id: string;
  [key: string]: any;
}

function EditProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  const { items: products, update, isLoading } = useDb<Product>('products');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!isLoading && id) {
      const found = products.find((p) => p.id === id);
      if (found) setProduct(found);
    }
  }, [id, products, isLoading]);

  const handleSubmit = async (data: ProductFormData) => {
    if (id) update(id, data as any);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!id) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          شناسه محصول مشخص نشده
        </h2>
        <Link
          href="/admin/products"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          بازگشت به لیست
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          محصول یافت نشد
        </h2>
        <Link
          href="/admin/products"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          بازگشت به لیست
        </Link>
      </div>
    );
  }

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
            ویرایش محصول
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {product.title}
          </p>
        </div>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <EditProductContent />
    </Suspense>
  );
}
