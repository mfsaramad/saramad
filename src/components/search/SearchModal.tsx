'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  BookOpen,
  Users,
  FileText,
  ArrowLeft,
  TrendingUp,
} from 'lucide-react';
import { courses, instructors, blogPosts } from '@/lib/data';
import { toPersianNumber, formatPriceShort } from '@/lib/format';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResultType = 'course' | 'instructor' | 'blog';

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  description: string;
  href: string;
  icon: string;
  meta?: string;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // قفل کردن اسکرول وقتی modal بازه
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // بستن با کلید Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // ریست کردن query وقتی modal بسته می‌شه
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  // جستجو
  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const q = query.toLowerCase().trim();
    const items: SearchResult[] = [];

    // دوره‌ها
    courses.forEach((course) => {
      if (
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.tags.some((tag) => tag.toLowerCase().includes(q))
      ) {
        const lowestPrice = Math.min(
          ...Object.values(course.price).filter(
            (p): p is number => p !== undefined
          )
        );
        items.push({
          id: `course-${course.id}`,
          type: 'course',
          title: course.title,
          description: course.shortDescription,
          href: `/courses/${course.slug}`,
          icon: '📚',
          meta: `${formatPriceShort(lowestPrice)} • ${toPersianNumber(
            course.studentsCount
          )} دانشجو`,
        });
      }
    });

    // اساتید
    instructors.forEach((instructor) => {
      if (
        instructor.name.toLowerCase().includes(q) ||
        instructor.title.toLowerCase().includes(q) ||
        instructor.specialties.some((s) => s.toLowerCase().includes(q))
      ) {
        items.push({
          id: `instructor-${instructor.id}`,
          type: 'instructor',
          title: instructor.name,
          description: instructor.title,
          href: `/instructors/${instructor.id}`,
          icon: '👨‍🏫',
          meta: `${toPersianNumber(instructor.coursesCount)} دوره`,
        });
      }
    });

    // وبلاگ
    blogPosts.forEach((post) => {
      if (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      ) {
        items.push({
          id: `blog-${post.id}`,
          type: 'blog',
          title: post.title,
          description: post.excerpt,
          href: `/blog/${post.slug}`,
          icon: '📰',
          meta: `${post.category} • ${toPersianNumber(post.readTime)} دقیقه`,
        });
      }
    });

    return items;
  }, [query]);

  // محبوب‌ترین‌ها (وقتی جستجو خالیه)
  const popularSearches = [
    { label: 'برنامه‌نویسی پایتون', href: '/courses/python-programming' },
    { label: 'طراحی گرافیک', href: '/courses/graphic-design' },
    { label: 'حسابداری', href: '/courses/accounting-basics' },
    { label: 'مکالمه انگلیسی', href: '/courses/english-conversation' },
  ];

  if (!isOpen) return null;

  const groupedResults = {
    course: results.filter((r) => r.type === 'course'),
    instructor: results.filter((r) => r.type === 'instructor'),
    blog: results.filter((r) => r.type === 'blog'),
  };

  const typeLabels = {
    course: { label: 'دوره‌ها', icon: BookOpen, color: 'text-blue-800' },
    instructor: { label: 'اساتید', icon: Users, color: 'text-teal-600' },
    blog: { label: 'وبلاگ', icon: FileText, color: 'text-orange-600' },
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        {/* Header - Search Input */}
        <div className="relative border-b border-slate-100 p-4">
          <div className="relative">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو در دوره‌ها، اساتید، وبلاگ..."
              className="w-full pr-12 pl-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition text-base"
            />
            <Search className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
            <button
              onClick={onClose}
              className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition"
              aria-label="بستن"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* راهنمای کیبورد */}
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono">
                ESC
              </kbd>
              <span>بستن</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* حالت ۱: جستجو خالی */}
          {!query.trim() && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-brand-800" />
                <h3 className="font-black text-slate-800 text-sm">
                  جستجوهای محبوب
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-50 hover:bg-brand-50 hover:text-brand-800 border border-slate-100 rounded-xl text-sm text-slate-700 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="bg-gradient-to-br from-brand-50 to-teal-50 rounded-2xl p-5 border border-brand-100">
                <h4 className="font-black text-slate-800 mb-2 text-sm">
                  💡 راهنما
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  حداقل ۲ حرف تایپ کنید تا نتایج نمایش داده شوند. می‌توانید
                  در دوره‌ها، اساتید و مقالات وبلاگ جستجو کنید.
                </p>
              </div>
            </div>
          )}

          {/* حالت ۲: جستجو خیلی کوتاه */}
          {query.trim() && query.length < 2 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm">
                حداقل ۲ حرف تایپ کنید...
              </p>
            </div>
          )}

          {/* حالت ۳: نتایج پیدا نشد */}
          {query.length >= 2 && results.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-black text-slate-800 mb-2">
                نتیجه‌ای یافت نشد
              </h3>
              <p className="text-sm text-slate-500">
                برای «{query}» نتیجه‌ای پیدا نکردیم
              </p>
            </div>
          )}

          {/* حالت ۴: نتایج */}
          {query.length >= 2 && results.length > 0 && (
            <div className="space-y-5">
              {(Object.keys(groupedResults) as ResultType[]).map((type) => {
                const items = groupedResults[type];
                if (items.length === 0) return null;

                const typeInfo = typeLabels[type];
                const Icon = typeInfo.icon;

                return (
                  <div key={type}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`w-4 h-4 ${typeInfo.color}`} />
                      <h3 className="font-black text-slate-800 text-sm">
                        {typeInfo.label}
                      </h3>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">
                        {toPersianNumber(items.length)}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                        >
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-50 to-teal-50 flex items-center justify-center flex-shrink-0 text-xl">
                            {item.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-800 transition">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {item.description}
                            </div>
                            {item.meta && (
                              <div className="text-[10px] text-slate-400 mt-1">
                                {item.meta}
                              </div>
                            )}
                          </div>

                          <ArrowLeft className="w-4 h-4 text-slate-300 group-hover:text-brand-800 group-hover:-translate-x-1 transition flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* لینک مشاهده همه */}
              <div className="pt-3 border-t border-slate-100">
                <Link
                  href="/courses"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-brand-800 hover:bg-brand-50 rounded-xl transition"
                >
                  مشاهده همه دوره‌ها
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}