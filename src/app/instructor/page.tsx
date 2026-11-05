'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, BookOpen, ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      if (!user) return;
      try {
        // گرفتن دسترسی‌های دوره‌ای که به این استاد داده شده
        const { data: accessData, error: accessError } = await supabase
          .from('user_resource_access')
          .select('resource_id')
          .eq('user_id', user.id)
          .eq('resource_type', 'course');

        if (accessError) throw accessError;

        const courseIds = accessData?.map(a => a.resource_id) || [];

        if (courseIds.length > 0) {
          // دریافت جزئیات دوره‌ها
          const { data: coursesData } = await supabase
            .from('courses')
            .select('*')
            .in('id', courseIds);
          
          setCourses(coursesData || []);
        }
      } catch (error) {
        console.error('خطا در دریافت دوره‌های استاد:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructorCourses();
  }, [user]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="bg-gradient-to-l from-blue-900 to-teal-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div>
            <h1 className="text-2xl font-black mb-2">سلام {user?.name} 👋</h1>
            <p className="text-blue-100 text-sm">به پنل اختصاصی اساتید سرآمد خوش آمدید. در اینجا دوره‌های تخصیص‌یافته به شما را مشاهده می‌کنید.</p>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold mb-1">دوره‌های تخصیص‌یافته</p>
              <p className="text-3xl font-black text-slate-800">{courses.length} <span className="text-sm font-normal text-slate-500">دوره</span></p>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-700" /> دوره‌های من
          </h2>
          
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="border border-slate-100 rounded-2xl p-4 hover:shadow-md transition-shadow bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 mb-2">{course.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{course.short_description || 'بدون توضیحات'}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400">مدیریت دوره</span>
                    <Link href={`/admin/courses/edit/${course.id}`} className="text-sm font-bold text-blue-700 hover:underline flex items-center gap-1">
                      ورود <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">هنوز دوره‌ای به شما تخصیص نیافته است</h3>
              <p className="text-sm text-slate-500">برای دسترسی به دوره‌ها، لطفاً با مدیر سیستم تماس بگیرید.</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}