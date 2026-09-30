import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import SectionTitle from '@/components/shared/SectionTitle';
import Badge from '@/components/shared/Badge';
import { toPersianNumber } from '@/lib/format';

export default function BlogSection() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="وبلاگ سرآمد"
          title="آخرین مقالات و مطالب آموزشی"
          description="با جدیدترین مقالات آموزشی و اخبار دنیای فنی و حرفه‌ای به‌روز بمان"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-brand-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* تصویر */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-teal-100 to-orange-100">
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-brand-800/30" />
                </div>

                {/* برچسب دسته */}
                <div className="absolute top-4 right-4">
                  <Badge variant="brand" className="shadow-lg backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* محتوا */}
              <div className="p-6">
                {/* عنوان */}
                <h3 className="text-lg font-black text-slate-800 leading-snug mb-3 line-clamp-2 group-hover:text-brand-800 transition min-h-[3.5rem]">
                  {post.title}
                </h3>

                {/* خلاصه */}
                <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2 min-h-[2.5rem]">
                  {post.excerpt}
                </p>

                {/* اطلاعات */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{toPersianNumber(post.readTime)} دقیقه</span>
                    </div>
                  </div>
                </div>

                {/* نویسنده و دکمه */}
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-xs font-black">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs text-slate-600">
                      {post.author}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-brand-50 group-hover:bg-brand-800 flex items-center justify-center transition">
                    <ArrowLeft className="w-4 h-4 text-brand-800 group-hover:text-white transition" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* دکمه مشاهده همه */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-800 text-brand-800 font-bold hover:bg-brand-800 hover:text-white transition"
          >
            مشاهده همه مقالات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}