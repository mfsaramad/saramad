'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import SectionTitle from '@/components/shared/SectionTitle';
import Badge from '@/components/shared/Badge';
import { toPersianNumber } from '@/lib/format';

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        if (data) setPosts(data);
      } catch (error) {
        console.error('خطا در دریافت مقالات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="وبلاگ سرآمد"
          title="آخرین مقالات و مطالب آموزشی"
          description="با جدیدترین مقالات آموزشی و اخبار دنیای فنی و حرفه‌ای به‌روز بمان"
        />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-brand-800 animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-slate-500">هنوز مقاله‌ای ثبت نشده است</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* تصویر */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-teal-100 to-orange-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-brand-800/30 dark:text-slate-600/30" />
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
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition min-h-[3.5rem]">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 line-clamp-2 min-h-[2.5rem]">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(post.created_at).toLocaleDateString('fa-IR')}</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{toPersianNumber(post.read_time)} دقیقه</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-xs font-black">
                        {post.author?.charAt(0) || 'ن'}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {post.author || 'نویسنده'}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-950/50 group-hover:bg-brand-800 dark:group-hover:bg-brand-300 flex items-center justify-center transition">
                      <ArrowLeft className="w-4 h-4 text-brand-800 dark:text-brand-300 group-hover:text-white dark:group-hover:text-brand-900 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-900 transition"
          >
            مشاهده همه مقالات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}