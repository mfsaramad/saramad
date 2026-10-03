'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  BookOpen,
  Sparkles,
  FileText,
  Users,
  TrendingUp,
  Mail,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import Badge from '@/components/shared/Badge';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 6;

const categories = [
  { id: 'all', label: 'همه مقالات', icon: '📚' },
  { id: 'برنامه‌نویسی', label: 'برنامه‌نویسی', icon: '💻' },
  { id: 'طراحی', label: 'طراحی', icon: '🎨' },
  { id: 'کسب‌وکار', label: 'کسب‌وکار', icon: '💼' },
];

type SortOption = 'newest' | 'oldest';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const filteredPosts = useMemo(() => {
    let result = [...blogPosts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    } else {
      result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleFilterChange = () => setCurrentPage(1);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    activeCategory !== 'all' || searchQuery.trim() !== '';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
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

        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span>وبلاگ سرآمد</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                آخرین مقالات و مطالب آموزشی
              </h1>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                با جدیدترین مقالات آموزشی و اخبار دنیای فنی و حرفه‌ای به‌روز
                بمان
              </p>
            </div>
          </FadeIn>

          {/* آمار */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  {toPersianNumber(blogPosts.length)}
                </div>
                <div className="text-xs text-blue-200 mt-1">مقاله</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۳
                </div>
                <div className="text-xs text-blue-200 mt-1">دسته‌بندی</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۱۰٬۰۰۰+
                </div>
                <div className="text-xs text-blue-200 mt-1">خواننده</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۹۸٪
                </div>
                <div className="text-xs text-blue-200 mt-1">رضایت</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Sort Bar */}
          <FadeIn>
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-5 mb-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                  <input
                    type="text"
                    placeholder="جستجو در مقالات..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full pr-12 pl-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition cursor-pointer"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="oldest">قدیمی‌ترین</option>
                </select>
              </div>
            </div>
          </FadeIn>

          {/* Tabs */}
          <FadeIn>
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      handleFilterChange();
                    }}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                      activeCategory === cat.id
                        ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    )}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Result Count */}
          <FadeIn>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-bold text-brand-800 dark:text-brand-300">
                  {toPersianNumber(filteredPosts.length)}
                </span>{' '}
                مقاله یافت شد
              </p>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                >
                  <X className="w-3.5 h-3.5" />
                  پاک کردن فیلترها
                </button>
              )}
            </div>
          </FadeIn>

          {/* Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post, index) => (
                <FadeIn
                  key={post.id}
                  delay={index * 0.08}
                  direction="up"
                  className="h-full"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                  >
                    {/* تصویر */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-teal-100 to-orange-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-20 h-20 text-brand-800/30 dark:text-slate-600 group-hover:scale-110 transition-transform duration-500" />
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
                      <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition min-h-[3.5rem]">
                        {post.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 line-clamp-2 min-h-[2.5rem]">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{toPersianNumber(post.readTime)} دقیقه</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-xs font-black">
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {post.author}
                          </span>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-slate-800 group-hover:bg-brand-800 flex items-center justify-center transition">
                          <ArrowLeft className="w-4 h-4 text-brand-800 dark:text-brand-300 group-hover:text-white transition" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
                  مقاله‌ای یافت نشد
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  فیلترها یا جستجوی خود را تغییر دهید
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition"
                >
                  <X className="w-4 h-4" />
                  پاک کردن فیلترها
                </button>
              </div>
            </FadeIn>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn>
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2.5 rounded-xl font-bold text-sm transition',
                    currentPage === 1
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  <ChevronRight className="w-4 h-4" />
                  قبلی
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          'w-10 h-10 rounded-xl font-bold text-sm transition',
                          pageNum === currentPage
                            ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        )}
                      >
                        {toPersianNumber(pageNum)}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2.5 rounded-xl font-bold text-sm transition',
                    currentPage === totalPages
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  بعدی
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5">
                  <Mail className="w-8 h-8 text-orange-300" />
                </div>

                <h2 className="text-2xl lg:text-3xl font-black mb-3">
                  عضویت در خبرنامه سرآمد
                </h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  با عضویت در خبرنامه، از جدیدترین مقالات و دوره‌ها باخبر شو
                </p>

                {isSubscribed ? (
                  <div className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-teal-300" />
                    <span className="font-bold">
                      با موفقیت عضو شدی! 🎉
                    </span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <div className="relative flex-1">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ایمیل خود را وارد کنید"
                        className="w-full pr-12 pl-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:bg-white/20 focus:border-white/40 transition"
                      />
                      <Mail className="w-5 h-5 text-blue-200 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                    >
                      <Send className="w-5 h-5" />
                      عضویت
                    </button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}