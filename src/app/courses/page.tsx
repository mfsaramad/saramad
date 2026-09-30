'use client';

import { useState, useMemo } from 'react';
import { courses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import CourseCard from '@/components/shared/CourseCard';

type ModeFilter = 'all' | 'in-person' | 'online' | 'hybrid';
type LevelFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
type SortOption = 'newest' | 'popular' | 'cheapest' | 'expensive' | 'rating';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<ModeFilter>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // فیلتر و مرتب‌سازی دوره‌ها
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // جستجو
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // فیلتر نوع
    if (modeFilter !== 'all') {
      result = result.filter((c) => c.mode === modeFilter);
    }

    // فیلتر سطح
    if (levelFilter !== 'all') {
      result = result.filter((c) => c.level === levelFilter);
    }

    // مرتب‌سازی
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'cheapest': {
        const getMin = (c: typeof courses[0]) =>
          Math.min(
            ...Object.values(c.price).filter(
              (p): p is number => p !== undefined
            )
          );
        result.sort((a, b) => getMin(a) - getMin(b));
        break;
      }
      case 'expensive': {
        const getMin = (c: typeof courses[0]) =>
          Math.min(
            ...Object.values(c.price).filter(
              (p): p is number => p !== undefined
            )
          );
        result.sort((a, b) => getMin(b) - getMin(a));
        break;
      }
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [searchQuery, modeFilter, levelFilter, sortBy]);

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
            🎓 {toPersianNumber(courses.length)} دوره آموزشی
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
            دوره‌های آموزشگاه سرآمد
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            دوره‌های حضوری، آنلاین و ترکیبی در زمینه‌های فنی و حرفه‌ای
            <br />
            برای همه علاقه‌مندان بالای ۱۲ سال
          </p>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* نوار جستجو + مرتب‌سازی */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {/* نوار جستجو */}
              <div className="md:col-span-2 relative">
                <input
                  type="text"
                  placeholder="جستجو در دوره‌ها... (مثلاً: پایتون، گرافیک، حسابداری)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition"
                />
                <svg
                  className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* مرتب‌سازی */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white transition cursor-pointer"
              >
                <option value="newest">جدیدترین</option>
                <option value="popular">محبوب‌ترین</option>
                <option value="rating">بیشترین امتیاز</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* ===== فیلترها (کنار - دسکتاپ) ===== */}
            <aside className="hidden lg:block">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sticky top-24">
                <h3 className="font-black text-slate-800 mb-5 pb-4 border-b border-slate-100">
                  فیلترها
                </h3>

                {/* فیلتر نوع */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">
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
                          onChange={() => setModeFilter(item.id as ModeFilter)}
                          className="w-4 h-4 text-brand-800 focus:ring-brand-500"
                        />
                        <span className="text-sm text-slate-700 group-hover:text-brand-800 transition">
                          {item.icon} {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* فیلتر سطح */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">
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
                          onChange={() => setLevelFilter(item.id as LevelFilter)}
                          className="w-4 h-4 text-brand-800 focus:ring-brand-500"
                        />
                        <span className="text-sm text-slate-700 group-hover:text-brand-800 transition">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* دکمه پاک کردن */}
                {(modeFilter !== 'all' ||
                  levelFilter !== 'all' ||
                  searchQuery) && (
                  <button
                    onClick={() => {
                      setModeFilter('all');
                      setLevelFilter('all');
                      setSearchQuery('');
                    }}
                    className="w-full py-2.5 text-sm font-bold text-red-600 border-2 border-red-100 rounded-xl hover:bg-red-50 transition"
                  >
                    پاک کردن فیلترها
                  </button>
                )}
              </div>
            </aside>

            {/* ===== شبکه دوره‌ها ===== */}
            <div className="lg:col-span-3">
              {/* دکمه فیلتر موبایل */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                فیلترها
              </button>

              {/* نتیجه */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-brand-800">
                    {toPersianNumber(filteredCourses.length)}
                  </span>{' '}
                  دوره یافت شد
                </p>
              </div>

              {/* شبکه */}
              {filteredCourses.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">
                    دوره‌ای یافت نشد
                  </h3>
                  <p className="text-slate-500 mb-6">
                    فیلترها یا جستجوی خود را تغییر دهید
                  </p>
                  <button
                    onClick={() => {
                      setModeFilter('all');
                      setLevelFilter('all');
                      setSearchQuery('');
                    }}
                    className="px-6 py-3 bg-brand-800 text-white rounded-xl font-bold hover:bg-brand-900 transition"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== فیلتر موبایل (Drawer) ===== */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-80 max-w-full bg-white shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-slate-800">فیلترها</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* فیلتر نوع */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-700 mb-3">
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
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mode-mobile"
                        checked={modeFilter === item.id}
                        onChange={() => setModeFilter(item.id as ModeFilter)}
                        className="w-4 h-4 text-brand-800"
                      />
                      <span className="text-sm text-slate-700">
                        {item.icon} {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* فیلتر سطح */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-700 mb-3">
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
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="level-mobile"
                        checked={levelFilter === item.id}
                        onChange={() => setLevelFilter(item.id as LevelFilter)}
                        className="w-4 h-4 text-brand-800"
                      />
                      <span className="text-sm text-slate-700">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-brand-800 text-white rounded-xl font-bold"
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