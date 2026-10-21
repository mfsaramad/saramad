'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
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
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // دریافت دوره‌ها از دیتابیس
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            users:instructor_id (name)
          `)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const mappedCourses = data.map((c: any) => ({
            ...c,
            studentsCount: c.students_count || 0,
            shortDescription: c.short_description || '',
            remainingCapacity: c.remaining_capacity || 0,
            certificate: c.certificate || false,
            instructor: { name: c.users?.name || 'استاد' },
          }));
          setCourses(mappedCourses);
        }
      } catch (error) {
        console.error('خطا در دریافت دوره‌ها:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses =
    activeTab === 'all'
      ? courses.slice(0, 6)
      : courses.filter((c) => c.mode === activeTab).slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="دوره‌های محبوب"
          title="محبوب‌ترین دوره‌های سرآمد"
          description="دوره‌هایی که بیشترین رضایت دانشجویان را داشته‌اند و شما را به بازار کار نزدیک می‌کنند"
        />

        {/* تب‌ها */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-900 text-brand-800 dark:text-brand-300 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-brand-800 dark:hover:text-brand-300'
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* شبکه دوره‌ها */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-brand-800 animate-spin" />
          </div>
        ) : filteredCourses.length > 0 ? (
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