import Link from 'next/link';
import {
  FileText,
  BookOpen,
  Video,
  Package,
  ArrowLeft,
  Star,
} from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';
import { formatPrice } from '@/lib/format';

const products = [
  {
    id: '1',
    title: 'پکیج سوالات آزمون فنی و حرفه‌ای',
    description: 'مجموعه کامل سوالات آزمون‌های فنی و حرفه‌ای با پاسخ تشریحی',
    type: 'سوالات',
    price: 350000,
    originalPrice: 500000,
    icon: FileText,
    color: 'brand' as const,
    rating: 4.9,
    salesCount: 1240,
    badge: 'پرفروش',
  },
  {
    id: '2',
    title: 'جزوه جامع برنامه‌نویسی پایتون',
    description: 'جزوه PDF کامل آموزش پایتون همراه با تمرین و پروژه',
    type: 'جزوه',
    price: 280000,
    originalPrice: null,
    icon: BookOpen,
    color: 'teal' as const,
    rating: 4.8,
    salesCount: 890,
    badge: null,
  },
  {
    id: '3',
    title: 'ویدیوهای ضبط‌شده دوره طراحی گرافیک',
    description: 'دسترسی مادام‌العمر به ویدیوهای ضبط‌شده دوره گرافیک',
    type: 'ویدیو',
    price: 1200000,
    originalPrice: 1800000,
    icon: Video,
    color: 'accent' as const,
    rating: 5.0,
    salesCount: 560,
    badge: 'تخفیف ویژه',
  },
];

export default function ShopSection() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="فروشگاه سرآمد"
          title="منابع آموزشی و سوالات"
          description="جزوه، سوالات آزمون و ویدیوهای آموزشی را به‌صورت آنلاین تهیه کن"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => {
            const Icon = product.icon;
            const colorClasses = {
              brand: {
                bg: 'bg-brand-100',
                icon: 'text-brand-800',
                gradient: 'from-brand-700 to-brand-900',
              },
              teal: {
                bg: 'bg-teal-100',
                icon: 'text-teal-600',
                gradient: 'from-teal-500 to-teal-700',
              },
              accent: {
                bg: 'bg-orange-100',
                icon: 'text-orange-600',
                gradient: 'from-orange-500 to-orange-700',
              },
            }[product.color];

            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative p-7 pb-5">
                  {product.badge && (
                    <div className="absolute top-5 left-5 px-3 py-1 gradient-accent text-white rounded-full text-xs font-black shadow-lg">
                      {product.badge}
                    </div>
                  )}

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${colorClasses.bg}`}
                  >
                    <Icon className={`w-8 h-8 ${colorClasses.icon}`} />
                  </div>

                  <div className="text-xs font-bold text-slate-500 mb-2">
                    {product.type}
                  </div>

                  <h3 className="text-lg font-black text-slate-800 leading-snug mb-3 line-clamp-2 min-h-[3.5rem]">
                    {product.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-5">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-slate-700">
                        {product.rating.toLocaleString('fa-IR')}
                      </span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <div>{product.salesCount.toLocaleString('fa-IR')} فروش</div>
                  </div>
                </div>

                <div className="px-7 pb-7 pt-5 border-t border-slate-100 bg-slate-50/50">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      {product.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                      <div className="text-xl font-black text-brand-800">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/shop/${product.id}`}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-l transition-all hover:shadow-lg ${colorClasses.gradient}`}
                  >
                    <Package className="w-4 h-4" />
                    افزودن به سبد
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-800 text-brand-800 font-bold hover:bg-brand-800 hover:text-white transition"
          >
            مشاهده همه محصولات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}