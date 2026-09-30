'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, BookOpen, User } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import Badge from '@/components/shared/Badge';

const categories = [
  { id: 'all', label: 'همه مقالات', icon: '📚' },
  { id: 'برنامه‌نویسی', label: 'برنامه‌نویسی', icon: '💻' },
  { id: 'طراحی', label: 'طراحی', icon: '🎨' },
  { id: 'کسب‌وکار', label: 'کسب‌وکار', icon: '💼' },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return blogPosts;
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
            📰 وبلاگ سرآمد
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
            آخرین مقالات و مطالب آموزشی
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            با جدیدترین مقالات آموزشی و اخبار دنیای فنی و حرفه‌ای به‌روز بمان
          </p>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* تب‌های دسته‌بندی */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                      : 'text-slate-600 hover:text-brand-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* نتیجه */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-600">
              <span className="font-bold text-brand-800">
                {toPersianNumber(filteredPosts.length)}
              </span>{' '}
              مقاله یافت شد
            </p>
          </div>

          {/* شبکه مقالات */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-brand-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* تصویر */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-teal-100 to-orange-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-brand-800/30" />
                    </div>

                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="brand"
                        className="shadow-lg backdrop-blur-sm"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* محتوا */}
                  <div className="p-6">
                    <h3 className="text-lg font-black text-slate-800 leading-snug mb-3 line-clamp-2 group-hover:text-brand-800 transition min-h-[3.5rem]">
                      {post.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2 min-h-[2.5rem]">
                      {post.excerpt}
                    </p>

                    {/* اطلاعات */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-5 pb-5 border-b border-slate-100">
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

                    {/* نویسنده */}
                    <div className="flex items-center justify-between">
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
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">
                مقاله‌ای یافت نشد
              </h3>
              <p className="text-slate-500 mb-6">
                دسته‌بندی دیگری را انتخاب کنید
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-6 py-3 bg-brand-800 text-white rounded-xl font-bold hover:bg-brand-900 transition"
              >
                نمایش همه مقالات
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}