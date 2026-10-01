import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  BookOpen,
  Share2,
  Send,
  Tag,
  ChevronLeft,
} from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import Badge from '@/components/shared/Badge';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ✅ اضافه شده برای Static Export
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ===== Hero مقاله ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-blue-100 mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition">
              خانه
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition">
              وبلاگ
            </Link>
            <span>/</span>
            <span className="text-white font-bold line-clamp-1">
              {post.title}
            </span>
          </div>

          {/* دسته‌بندی */}
          <div className="mb-5">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold">
              📁 {post.category}
            </span>
          </div>

          {/* عنوان */}
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-8">
            {post.title}
          </h1>

          {/* اطلاعات */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-orange-500 flex items-center justify-center text-white font-black">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="text-xs text-blue-200">نویسنده</div>
                <div className="font-bold text-white">{post.author}</div>
              </div>
            </div>

            <div className="w-px h-10 bg-white/20" />

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>{post.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>{toPersianNumber(post.readTime)} دقیقه مطالعه</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ستون چپ - محتوای مقاله */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                {/* تصویر کاور */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand-100 via-teal-100 to-orange-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-brand-800/20" />
                  </div>
                </div>

                {/* متن مقاله */}
                <div className="p-8 lg:p-10">
                  {/* خلاصه */}
                  <div className="mb-8 p-5 bg-gradient-to-l from-brand-50 to-teal-50 rounded-2xl border-r-4 border-brand-800">
                    <p className="text-slate-700 leading-relaxed font-bold">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* متن اصلی */}
                  <div className="space-y-6 text-slate-700 leading-loose">
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                      شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می‌باشد.
                    </p>

                    <h2 className="text-2xl font-black text-slate-800 mt-10 mb-4">
                      چرا این موضوع اهمیت دارد؟
                    </h2>

                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است. کتابهای
                      زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                      جامعه و متخصصان را می‌طلبد.
                    </p>

                    <ul className="space-y-3 my-6">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                        <span>
                          با نرم‌افزارها شناخت بیشتری را برای طراحان رایانه
                          ایجاد می‌کند
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                        <span>
                          و همچنین شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                          متنوع
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                        <span>با هدف بهبود ابزارهای کاربردی می‌باشد</span>
                      </li>
                    </ul>

                    <h2 className="text-2xl font-black text-slate-800 mt-10 mb-4">
                      چگونه شروع کنیم؟
                    </h2>

                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است. اگر می‌خواهید در این
                      زمینه حرفه‌ای شوید، باید تمرین و پشتکار داشته باشید و از
                      منابع معتبر استفاده کنید.
                    </p>

                    <blockquote className="border-r-4 border-teal-500 bg-teal-50 p-6 rounded-l-2xl my-8">
                      <p className="text-slate-700 font-bold italic">
                        «مسیر حرفه‌ای شدن از سرآمد شروع می‌شود. تنها کافیست
                        اولین قدم را برداری.»
                      </p>
                    </blockquote>

                    <p>
                      در پایان، اگر علاقه‌مند به یادگیری عمیق‌تر هستید، می‌توانید
                      در دوره‌های آموزشگاه سرآمد شرکت کنید و زیر نظر اساتید مجرب
                      این مسیر را طی کنید.
                    </p>
                  </div>

                  {/* برچسب‌ها */}
                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                      <Tag className="w-5 h-5 text-brand-800" />
                      <span className="font-black text-slate-800">
                        برچسب‌ها:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[post.category, 'آموزش', 'سرآمد', 'حرفه‌ای'].map(
                        (tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-1.5 bg-slate-100 hover:bg-brand-100 text-slate-700 hover:text-brand-800 rounded-full text-sm font-bold transition cursor-pointer"
                          >
                            #{tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* اشتراک‌گذاری */}
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                      <Share2 className="w-5 h-5 text-brand-800" />
                      <span className="font-black text-slate-800">
                        اشتراک‌گذاری این مقاله:
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        aria-label="تلگرام"
                        className="w-11 h-11 rounded-xl bg-sky-100 hover:bg-sky-500 text-sky-600 hover:text-white flex items-center justify-center transition"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                      <button
                        aria-label="توییتر"
                        className="w-11 h-11 rounded-xl bg-blue-100 hover:bg-blue-500 text-blue-600 hover:text-white flex items-center justify-center transition text-xl"
                      >
                        🐦
                      </button>
                      <button
                        aria-label="لینکدین"
                        className="w-11 h-11 rounded-xl bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition text-xl"
                      >
                        💼
                      </button>
                      <button
                        aria-label="واتساپ"
                        className="w-11 h-11 rounded-xl bg-green-100 hover:bg-green-500 text-green-600 hover:text-white flex items-center justify-center transition text-xl"
                      >
                        💬
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* ستون راست */}
            <aside className="space-y-6">
              {/* اطلاعات نویسنده */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sticky top-24">
                <h3 className="text-lg font-black text-slate-800 mb-5 pb-4 border-b border-slate-100">
                  نویسنده مقاله
                </h3>

                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-3xl font-black mb-4">
                    {post.author.charAt(0)}
                  </div>
                  <h4 className="font-black text-slate-800 mb-1">
                    {post.author}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    نویسنده و مدرس سرآمد
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    مدرس و متخصص در زمینه {post.category} با سال‌ها تجربه آموزشی
                    در آموزشگاه سرآمد.
                  </p>

                  <Link
                    href="/instructors"
                    className="flex items-center justify-center gap-2 w-full py-3 border-2 border-brand-800 text-brand-800 rounded-xl font-bold hover:bg-brand-800 hover:text-white transition text-sm"
                  >
                    <User className="w-4 h-4" />
                    مشاهده همه اساتید
                  </Link>
                </div>
              </div>

              {/* مقالات مرتبط */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                  <h3 className="text-lg font-black text-slate-800 mb-5 pb-4 border-b border-slate-100">
                    مقالات مرتبط
                  </h3>

                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="group block p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="brand" size="sm">
                            {related.category}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 line-clamp-2 group-hover:text-brand-800 transition mb-2">
                          {related.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{related.date}</span>
                          <ChevronLeft className="w-4 h-4 text-brand-800 group-hover:-translate-x-1 transition" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* بازگشت */}
              <Link
                href="/blog"
                className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-brand-800 text-brand-800 rounded-xl font-bold hover:bg-brand-800 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
                بازگشت به وبلاگ
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}