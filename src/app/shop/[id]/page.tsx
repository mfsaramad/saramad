import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Star,
  ShoppingCart,
  CheckCircle2,
  Download,
  FileText,
  Clock,
  Sparkles,
  Shield,
  Zap,
  Package,
} from 'lucide-react';
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/data';
import { toPersianNumber, formatPrice } from '@/lib/format';
import FadeIn from '@/components/animations/FadeIn';
import StarRating from '@/components/shared/StarRating';
import ProductCard from '@/components/shop/ProductCard';
import { cn } from '@/lib/utils';

// ✅ برای Static Export
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.slug,
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 3);

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      gradient: 'from-teal-500 to-teal-700',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      gradient: 'from-orange-500 to-orange-700',
    },
  };

  const colors = colorMap[product.color];
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== Hero ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-blue-100 mb-8 flex-wrap">
              <Link href="/" className="hover:text-white transition">
                خانه
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-white transition">
                فروشگاه
              </Link>
              <span>/</span>
              <span className="text-white font-bold line-clamp-1">
                {product.title}
              </span>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* آیکون بزرگ */}
            <FadeIn>
              <div className="relative">
                <div
                  className={cn(
                    'aspect-square rounded-3xl flex items-center justify-center text-[180px] shadow-2xl',
                    colors.bg
                  )}
                >
                  {product.icon}
                </div>
                {product.badge && (
                  <div
                    className={cn(
                      'absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-black text-white shadow-lg',
                      product.badge === 'تخفیف ویژه'
                        ? 'bg-red-500'
                        : 'bg-orange-500'
                    )}
                  >
                    {product.badge}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* اطلاعات */}
            <FadeIn delay={0.15}>
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold">
                    <Package className="w-3.5 h-3.5" />
                    {product.typeLabel}
                  </span>
                  {product.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/90 rounded-full text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      {product.badge}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-4">
                  {product.title}
                </h1>

                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* امتیاز */}
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <StarRating rating={product.rating} size="md" />
                  <span className="text-sm text-blue-200">
                    ({toPersianNumber(product.reviewsCount)} نظر)
                  </span>
                  <span className="w-px h-5 bg-white/20" />
                  <span className="text-sm text-blue-200">
                    {toPersianNumber(product.salesCount)} فروش
                  </span>
                </div>

                {/* اطلاعات سریع */}
                <div className="grid grid-cols-2 gap-4">
                  {product.format && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-200">فرمت</div>
                        <div className="font-black">{product.format}</div>
                      </div>
                    </div>
                  )}
                  {product.fileSize && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                        <Download className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-200">حجم</div>
                        <div className="font-black">{product.fileSize}</div>
                      </div>
                    </div>
                  )}
                  {product.pages && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-200">صفحات</div>
                        <div className="font-black">
                          {toPersianNumber(product.pages)}
                        </div>
                      </div>
                    </div>
                  )}
                  {product.duration && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-200">مدت</div>
                        <div className="font-black">
                          {toPersianNumber(product.duration)} ساعت
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ستون چپ */}
            <div className="lg:col-span-2 space-y-6">
              {/* توضیحات */}
              <FadeIn>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-5">
                    توضیحات کامل
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>
              </FadeIn>

              {/* ویژگی‌ها */}
              <FadeIn delay={0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-5">
                    ویژگی‌ها
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* نظرات */}
              {product.reviews.length > 0 && (
                <FadeIn delay={0.2}>
                  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-5">
                      نظرات کاربران
                    </h2>
                    <div className="space-y-4">
                      {product.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white font-black">
                              {review.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="font-black text-slate-800 dark:text-slate-100 text-sm">
                                {review.name}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                {review.date}
                              </div>
                            </div>
                            <StarRating
                              rating={review.rating}
                              size="sm"
                              showNumber={false}
                            />
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* برچسب‌ها */}
              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-bold hover:border-brand-500 transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* ستون راست - کارت خرید */}
            <div className="lg:col-span-1">
              <FadeIn direction="left" delay={0.15}>
                <div className="lg:sticky lg:top-24 space-y-4">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 p-6">
                    {/* قیمت */}
                    <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        قیمت
                      </div>
                      <div className="flex items-end gap-3 flex-wrap">
                        <div className="text-3xl font-black text-brand-800 dark:text-brand-300">
                          {formatPrice(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div className="text-sm text-slate-400 line-through mb-1">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-full text-xs font-black">
                          <Zap className="w-3 h-3" />
                          {toPersianNumber(discountPercent)}٪ تخفیف
                        </div>
                      )}
                    </div>

                    {/* دکمه */}
                    <button
                      className={cn(
                        'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-white bg-gradient-to-l',
                        colors.gradient,
                        'hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3 mb-3'
                      )}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      افزودن به سبد خرید
                    </button>

                    {/* مزایا */}
                    <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Download className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        دانلود آنی پس از پرداخت
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Shield className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        پرداخت امن
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                        پشتیبانی ۲۴/۷
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== محصولات مشابه ===== */}
      {relatedProducts.length > 0 && (
        <section className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                  🔗 محصولات مشابه
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">
                  محصولات مشابه
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  محصولات مشابه که ممکن است به آن‌ها علاقه‌مند باشید
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}