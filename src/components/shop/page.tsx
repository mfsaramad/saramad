'use client';

import { useMemo, useState } from 'react';
import { Search, Package } from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import ProductCard from '@/components/shop/ProductCard';
import SectionTitle from '@/components/shared/SectionTitle';

export default function ShopPage() {
  const { data: products, loading } = useCollection<any>('products');
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<string>('all');

  const types = [
    { id: 'all', label: 'همه' },
    { id: 'questions', label: 'سوالات' },
    { id: 'book', label: 'جزوه' },
    { id: 'video', label: 'ویدیو' },
    { id: 'package', label: 'پکیج' },
  ];

  const filtered = useMemo(() => {
    let result = products;

    if (activeType !== 'all') {
      result = result.filter((p: any) => p.type === activeType);
    }

    if (search.trim()) {
      result = result.filter((p: any) =>
        p.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [products, activeType, search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="فروشگاه سرآمد"
            title="منابع آموزشی و سوالات"
            description="جزوه، سوالات آزمون و ویدیوهای آموزشی را به‌صورت آنلاین تهیه کن"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="جستجو در محصولات..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                    activeType === type.id
                      ? 'bg-gradient-to-l from-blue-600 to-teal-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
                محصولی یافت نشد
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                {search ? 'جستجوی دیگری امتحان کن' : 'به‌زودی محصولات جدید اضافه می‌شوند'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}