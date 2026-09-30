'use client';

import { useState, useMemo } from 'react';
import { instructors } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import InstructorCard from '@/components/shared/InstructorCard';

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInstructors = useMemo(() => {
    if (!searchQuery.trim()) return instructors;
    const query = searchQuery.toLowerCase();
    return instructors.filter(
      (i) =>
        i.name.toLowerCase().includes(query) ||
        i.title.toLowerCase().includes(query) ||
        i.specialties.some((s) => s.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const totalStudents = instructors.reduce(
    (sum, i) => sum + i.studentsCount,
    0
  );
  const totalCourses = instructors.reduce(
    (sum, i) => sum + i.coursesCount,
    0
  );

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
            👨‍🏫 تیم آموزش سرآمد
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
            با بهترین اساتید یاد بگیر
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
            اساتید مجرب و حرفه‌ای سرآمد با سال‌ها تجربه در کنار شما هستند
          </p>

          {/* آمار */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
              <div className="text-3xl font-black text-white">
                {toPersianNumber(instructors.length)}
              </div>
              <div className="text-xs text-blue-200 mt-1">استاد حرفه‌ای</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
              <div className="text-3xl font-black text-white">
                {toPersianNumber(totalCourses)}+
              </div>
              <div className="text-xs text-blue-200 mt-1">دوره آموزشی</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
              <div className="text-3xl font-black text-white">
                {toPersianNumber(totalStudents)}+
              </div>
              <div className="text-xs text-blue-200 mt-1">دانشجو</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* نوار جستجو */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی استاد... (نام، تخصص)"
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
          </div>

          {/* نتیجه */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-600">
              <span className="font-bold text-brand-800">
                {toPersianNumber(filteredInstructors.length)}
              </span>{' '}
              استاد یافت شد
            </p>
          </div>

          {/* شبکه اساتید */}
          {filteredInstructors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInstructors.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  instructor={instructor}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">
                استادی یافت نشد
              </h3>
              <p className="text-slate-500 mb-6">
                جستجوی خود را تغییر دهید
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-brand-800 text-white rounded-xl font-bold hover:bg-brand-900 transition"
              >
                پاک کردن جستجو
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}