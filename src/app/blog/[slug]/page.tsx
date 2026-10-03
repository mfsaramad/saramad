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
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import Badge from '@/components/shared/Badge';
import FadeIn from '@/components/animations/FadeIn';

// ✅ برای Static Export
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  const shareButtons = [
    {
      label: 'تلگرام',
      icon: Send,
      bg: 'bg-sky-100 dark:bg-sky-950/50',
      hoverBg: 'hover:bg-sky-500',
      color: 'text-sky-600 dark:text-sky-300',
    },
    {
      label: 'توییتر',
      emoji: '🐦',
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      hoverBg: 'hover:bg-blue-500',
      color: 'text-blue-600 dark:text-blue-300',
    },
    {
      label: 'لینکدین',
      emoji: '💼',
      bg: 'bg-indigo-100 dark:bg-indigo-950/50',
      hoverBg: 'hover:bg-indigo-600',
      color: 'text-indigo-600 dark:text-indigo-300',
    },
    {
      label: 'واتساپ',
      emoji: '💬',
      bg: 'bg-green-100 dark:bg-green-950/50',
      hoverBg: 'hover:bg-green-500',
      color: 'text-green-600 dark:text-green-300',
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
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

        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn>
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
          </FadeIn>

          {/* دسته‌بندی */}
          <FadeIn delay={0.1}>
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold">
                <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                {post.category}
              </span>
            </div>
          </FadeIn>

          {/* عنوان */}
          <FadeIn delay={0.15}>
            <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-8">
              {post.title}
            </h1>
          </FadeIn>

          {/* اطلاعات */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center gap-5 text-sm text-blue-100">
              <div className="flex items-center gap-2 group">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-orange-500 flex items-center justify-center text-white font-black shadow-lg group-hover:scale-110 transition-transform">
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

              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-teal-400" />
                <span>{toPersianNumber(1240)} بازدید</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ستون چپ - محتوای مقاله */}
            <article className="lg:col-span-2">
              <FadeIn>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                  {/* تصویر کاور */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand-100 via-teal-100 to-orange-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-24 h-24 text-brand-800/20 dark:text-slate-600 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* افکت درخشش */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
                  </div>

                  {/* متن مقاله */}
                  <div className="p-8 lg:p-10">
                    {/* خلاصه */}
                    <div className="mb-8 p-6 bg-gradient-to-l from-brand-50 to-teal-50 dark:from-brand-950/30 dark:to-teal-950/30 rounded-2xl border-r-4 border-brand-800 dark:border-brand-300">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-brand-800 dark:text-brand-300 flex-shrink-0 mt-1" />
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* متن اصلی */}
                    <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-loose">
                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                        برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می‌باشد.
                      </p>

                      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-brand-800 to-teal-500 rounded-full" />
                        چرا این موضوع اهمیت دارد؟
                      </h2>

                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                        کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت
                        فراوان جامعه و متخصصان را می‌طلبد.
                      </p>

                      <ul className="space-y-3 my-6">
                        {[
                          'با نرم‌افزارها شناخت بیشتری را برای طراحان رایانه ایجاد می‌کند',
                          'و همچنین شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع',
                          'با هدف بهبود ابزارهای کاربردی می‌باشد',
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-3 group">
                            <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-300" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-brand-800 to-teal-500 rounded-full" />
                        چگونه شروع کنیم؟
                      </h2>

                      <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است. اگر می‌خواهید در
                        این زمینه حرفه‌ای شوید، باید تمرین و پشتکار داشته باشید
                        و از منابع معتبر استفاده کنید.
                      </p>

                      <blockquote className="border-r-4 border-teal-500 bg-gradient-to-l from-teal-50 to-brand-50 dark:from-teal-950/30 dark:to-brand-950/30 p-6 rounded-l-2xl my-8 relative">
                        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center shadow-lg">
                          <span className="text-white text-2xl font-black leading-none">
                            "
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-bold italic">
                          «مسیر حرفه‌ای شدن از سرآمد شروع می‌شود. تنها کافیست
                          اولین قدم را برداری.»
                        </p>
                      </blockquote>

                      <p>
                        در پایان، اگر علاقه‌مند به یادگیری عمیق‌تر هستید،
                        می‌توانید در دوره‌های آموزشگاه سرآمد شرکت کنید و زیر نظر
                        اساتید مجرب این مسیر را طی کنید.
                      </p>
                    </div>

                    {/* برچسب‌ها */}
                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-4">
                        <Tag className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                        <span className="font-black text-slate-800 dark:text-slate-100">
                          برچسب‌ها:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[post.category, 'آموزش', 'سرآمد', 'حرفه‌ای'].map(
                          (tag, index) => (
                            <span
                              key={index}
                              className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-950/50 text-slate-700 dark:text-slate-300 hover:text-brand-800 dark:hover:text-brand-300 rounded-full text-sm font-bold transition cursor-pointer"
                            >
                              #{tag}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* اشتراک‌گذاری */}
                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-4">
                        <Share2 className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                        <span className="font-black text-slate-800 dark:text-slate-100">
                          اشتراک‌گذاری این مقاله:
                        </span>
                      </div>
                      <div className="flex gap-3">
                        {shareButtons.map((btn, index) => {
                          const Icon = btn.icon;
                          return (
                            <button
                              key={index}
                              aria-label={btn.label}
                              className={`w-12 h-12 rounded-xl ${btn.bg} ${btn.hoverBg} ${btn.color} hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm hover:shadow-lg text-xl`}
                            >
                              {Icon ? (
                                <Icon className="w-5 h-5" />
                              ) : (
                                btn.emoji
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </article>

            {/* ستون راست */}
            <aside className="space-y-6">
              {/* اطلاعات نویسنده */}
              <FadeIn direction="left">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 lg:sticky lg:top-24">
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    نویسنده مقاله
                  </h3>

                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-4xl font-black mb-4 shadow-lg">
                      {post.author.charAt(0)}
                    </div>
                    <h4 className="font-black text-slate-800 dark:text-slate-100 mb-1">
                      {post.author}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      نویسنده و مدرس سرآمد
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                      مدرس و متخصص در زمینه {post.category} با سال‌ها تجربه
                      آموزشی در آموزشگاه سرآمد.
                    </p>

                    <Link
                      href="/instructors"
                      className="flex items-center justify-center gap-2 w-full py-3 border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 rounded-xl font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition text-sm hover:gap-3"
                    >
                      <User className="w-4 h-4" />
                      مشاهده همه اساتید
                    </Link>
                  </div>
                </div>
              </FadeIn>

              {/* مقالات مرتبط */}
              {relatedPosts.length > 0 && (
                <FadeIn direction="left" delay={0.15}>
                  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                      مقالات مرتبط
                    </h3>

                    <div className="space-y-4">
                      {relatedPosts.map((related, index) => (
                        <FadeIn
                          key={related.id}
                          delay={index * 0.1}
                          direction="left"
                        >
                          <Link
                            href={`/blog/${related.slug}`}
                            className="group block p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="brand" size="sm">
                                {related.category}
                              </Badge>
                            </div>
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition mb-2">
                              {related.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                              <span>{related.date}</span>
                              <ChevronLeft className="w-4 h-4 text-brand-800 dark:text-brand-300 group-hover:-translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* CTA */}
              <FadeIn direction="left" delay={0.25}>
                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-6 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />

                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-orange-300" />
                    </div>

                    <h4 className="font-black text-lg mb-2">
                      این موضوع رو عمیق یاد بگیر
                    </h4>
                    <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                      دوره‌های تخصصی سرآمد رو ببین و مهارت جدید یاد بگیر
                    </p>

                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-brand-800 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all hover:gap-3"
                    >
                      <BookOpen className="w-4 h-4" />
                      مشاهده دوره‌ها
                    </Link>
                  </div>
                </div>
              </FadeIn>

              {/* بازگشت */}
              <FadeIn direction="left" delay={0.3}>
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 rounded-xl font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition-all hover:gap-3 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  بازگشت به وبلاگ
                </Link>
              </FadeIn>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}