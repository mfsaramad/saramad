'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import Badge from '@/components/shared/Badge';

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  const FiltersContent = () => (
    <>
      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          دسته‌بندی
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                checked={activeCategory === cat.id}
                onChange={() => {
                  setActiveCategory(cat.id);
                  handleFilterChange();
                }}
                className="w-4 h-4 text-brand-800 focus:ring-brand-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                {cat.icon} {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          مرتب‌سازی
        </h4>
        <div className="space-y-2">
          {[
            { id: 'newest', label: 'جدیدترین' },
            { id: 'oldest', label: 'قدیمی‌ترین' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="sort"
                checked={sortBy === item.id}
                onChange={() => {
                  setSortBy(item.id as SortOption);
                  handleFilterChange();
                }}
                className="w-4 h-4 text-brand-800 focus:ring-brand-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 text-sm font-bold text-red-600 dark:text-red-400 border-2 border-red-100 dark:border-red-900/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          پاک کردن فیلترها
        </button>
      )}
    </>
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
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

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="hidden lg:block">
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <SlidersHorizontal className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                  <h3 className="font-black text-slate-800 dark:text-slate-100">
                    فیلترها
                  </h3>
                </div>
                <FiltersContent />
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between gap-3 mb-6">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200 text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  فیلترها
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                  )}
                </button>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-brand-800 dark:text-brand-300">
                    {toPersianNumber(filteredPosts.length)}
                  </span>{' '}
                  مقاله یافت شد
                </p>
              </div>

              {paginatedPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-teal-100 to-orange-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-brand-800/30 dark:text-slate-600" />
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
                            <span>
                              {toPersianNumber(post.readTime)} دقیقه
                            </span>
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
                  ))}
                </div>
              ) : (
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
              )}

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
                      currentPage === 1
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
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
                          className={`w-10 h-10 rounded-xl font-bold text-sm transition ${
                            pageNum === currentPage
                              ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
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
                    className={`flex items-center gap-1 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
                      currentPage === totalPages
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    بعدی
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-80 max-w-full bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                    فیلترها
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
                >
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              <FiltersContent />

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full mt-6 py-3.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black"
              >
                اعمال فیلترها
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}