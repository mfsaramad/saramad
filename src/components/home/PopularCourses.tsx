'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { courses } from '@/lib/data';
import SectionTitle from '@/components/shared/SectionTitle';
import CourseCard from '@/components/shared/CourseCard';
import { cn } from '@/lib/utils';

type ModeFilter = 'all' | 'in-person' | 'online' | 'hybrid';

const tabs: { id: ModeFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'همه دوره‌ها', icon: '🎓' },
  { id: 'in-person', label: 'حضوری', icon: '🏢' },
  { id: 'online', label: 'آنلاین', icon: '💻' },
  { id: 'hybrid', label: 'ترکیبی', icon: '🔄' },
];

export default function PopularCourses() {
  const [activeTab, setActiveTab] = useState<ModeFilter>('all');

  const filteredCourses =
    activeTab === 'all'
      ? courses.slice(0, 6)
      : courses.filter((c) => c.mode === activeTab).slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="دوره‌های محبوب"
          title="محبوب‌ترین دوره‌های سرآمد"
          description="دوره‌هایی که بیشترین رضایت دانشجویان را داشته‌اند و شما را به بازار کار نزدیک می‌کنند"
        />

        {/* تب‌ها */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1.5 bg-slate-100 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? 'bg-white text-brand-800 shadow-md'
                    : 'text-slate-600 hover:text-brand-800'
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* شبکه دوره‌ها */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-500">دوره‌ای در این دسته یافت نشد</p>
          </div>
        )}

        {/* دکمه مشاهده همه */}
        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-bold hover:shadow-lg hover:shadow-brand-800/30 hover:scale-105 transition-all"
          >
            مشاهده همه دوره‌ها
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}