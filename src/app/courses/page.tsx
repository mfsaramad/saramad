'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Users,
  Award,
  TrendingUp,
} from 'lucide-react';
import { courses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import CourseCard from '@/components/shared/CourseCard';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

type ModeFilter = 'all' | 'in-person' | 'online' | 'hybrid';
type LevelFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
type PriceFilter = 'all' | 'low' | 'mid' | 'high' | 'premium';
type SortOption = 'newest' | 'popular' | 'cheapest' | 'expensive' | 'rating';

const ITEMS_PER_PAGE = 6;

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<ModeFilter>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const getMinPrice = (course: typeof courses[0]) =>
    Math.min(
      ...Object.values(course.price).filter((p): p is number => p !== undefined)
    );

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (modeFilter !== 'all') {
      result = result.filter((c) => c.mode === modeFilter);
    }

    if (levelFilter !== 'all') {
      result = result.filter((c) => c.level === levelFilter);
    }

    if (priceFilter !== 'all') {
      result = result.filter((c) => {
        const price = getMinPrice(c);
        if (priceFilter === 'low') return price < 3000000;
        if (priceFilter === 'mid') return price >= 3000000 && price < 4500000;
        if (priceFilter === 'high') return price >= 4500000 && price < 6000000;
        return price >= 6000000;
      });
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'cheapest':
        result.sort((a, b) => getMinPrice(a) - getMinPrice(b));
        break;
      case 'expensive':
        result.sort((a, b) => getMinPrice(b) - getMinPrice(a));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [searchQuery, modeFilter, levelFilter, priceFilter, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setModeFilter('all');
    setLevelFilter('all');
    setPriceFilter('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    modeFilter !== 'all' ||
    levelFilter !== 'all' ||
    priceFilter !== 'all' ||
    searchQuery.trim() !== '';

  const FiltersContent = () => (
    <>
      {/* Mode Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          نوع دوره
        </h4>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'همه دوره‌ها', icon: '🎓' },
            { id: 'in-person', label: 'حضوری', icon: '🏢' },
            { id: 'online', label: 'آنلاین', icon: '💻' },
            { id: 'hybrid', label: 'ترکیبی', icon: '🔄' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="mode"
                checked={modeFilter === item.id}
                onChange={() => {
                  setModeFilter(item.id as ModeFilter);
                  handleFilterChange();
                }}
                className="w-4 h-4 text-brand-800 focus:ring-brand-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                {item.icon} {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Level Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          سطح دوره
        </h4>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'همه سطوح' },
            { id: 'beginner', label: 'مقدماتی' },
            { id: 'intermediate', label: 'متوسط' },
            { id: 'advanced', label: 'پیشرفته' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="level"
                checked={levelFilter === item.id}
                onChange={() => {
                  setLevelFilter(item.id as LevelFilter);
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

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          محدوده قیمت
        </h4>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'همه قیمت‌ها' },
            { id: 'low', label: 'زیر ۳ میلیون' },
            { id: 'mid', label: '۳ تا ۴.۵ میلیون' },
            { id: 'high', label: '۴.۵ تا ۶ میلیون' },
            { id: 'premium', label: 'بالای ۶ میلیون' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="price"
                checked={priceFilter === item.id}
                onChange={() => {
                  setPriceFilter(item.id as PriceFilter);
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
                <span>{toPersianNumber(courses.length)} دوره آموزشی</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                دوره‌های آموزشگاه سرآمد
              </h1>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                دوره‌های حضوری، آنلاین و ترکیبی در زمینه‌های فنی و حرفه‌ای
                <br />
                برای همه علاقه‌مندان بالای ۱۲ سال
              </p>
            </div>
          </FadeIn>

          {/* آمار */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  {toPersianNumber(courses.length)}
                </div>
                <div className="text-xs text-blue-200 mt-1">دوره فعال</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۵٬۰۰۰+
                </div>
                <div className="text-xs text-blue-200 mt-1">دانشجو</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۵۰+
                </div>
                <div className="text-xs text-blue-200 mt-1">استاد</div>
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
                    placeholder="جستجو در دوره‌ها..."
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
                  <option value="popular">محبوب‌ترین</option>
                  <option value="rating">بیشترین امتیاز</option>
                  <option value="cheapest">ارزان‌ترین</option>
                  <option value="expensive">گران‌ترین</option>
                </select>
              </div>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block">
              <FadeIn>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <SlidersHorizontal className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                    <h3 className="font-black text-slate-800 dark:text-slate-100">
                      فیلترها
                    </h3>
                  </div>
                  <FiltersContent />
                </div>
              </FadeIn>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Filter Button + Count */}
              <FadeIn>
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
                      {toPersianNumber(filteredCourses.length)}
                    </span>{' '}
                    دوره یافت شد
                  </p>
                </div>
              </FadeIn>

              {/* Courses Grid */}
              {paginatedCourses.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedCourses.map((course, index) => (
                    <FadeIn
                      key={course.id}
                      delay={index * 0.08}
                      direction="up"
                      className="h-full"
                    >
                      <CourseCard course={course} />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <FadeIn>
                  <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
                      دوره‌ای یافت نشد
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
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
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