import Link from 'next/link';
import { ArrowLeft, Star, Package } from 'lucide-react';
import { products } from '@/lib/data';
import { toPersianNumber, formatPrice } from '@/lib/format';
import SectionTitle from '@/components/shared/SectionTitle';
import { cn } from '@/lib/utils';

export default function ShopSection() {
  const topProducts = products.slice(0, 3);

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="فروشگاه سرآمد"
          title="منابع آموزشی و سوالات"
          description="جزوه، سوالات آزمون و ویدیوهای آموزشی را به‌صورت آنلاین تهیه کن"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {topProducts.map((product) => {
            const colors = colorMap[product.color];

            return (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={cn(
                    'relative aspect-[16/10] flex items-center justify-center text-[100px]',
                    colors.bg
                  )}
                >
                  {product.icon}

                  {product.badge && (
                    <div
                      className={cn(
                        'absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black text-white shadow-lg',
                        product.badge === 'تخفیف ویژه'
                          ? 'bg-red-500'
                          : 'bg-orange-500'
                      )}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                    {product.typeLabel}
                  </div>

                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                    {product.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {product.rating.toLocaleString('fa-IR')}
                      </span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <div>{toPersianNumber(product.salesCount)} فروش</div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      {product.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                      <div className="text-xl font-black text-brand-800 dark:text-brand-300">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-brand-800 flex items-center justify-center transition">
                      <Package className="w-4 h-4 text-brand-800 dark:text-brand-300 group-hover:text-white transition" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition-all hover:gap-3 group"
          >
            مشاهده همه محصولات
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}