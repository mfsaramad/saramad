'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, BookOpen, Plus, Edit, Users, Clock, ArrowLeft, Award } from 'lucide-react';
import Link from 'next/link';

export default function TeacherCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('instructor_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setCourses(data || []);
      } catch (err) {
        console.error('خطا در دریافت دوره‌ها:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/teacher" className="text-slate-400 hover:text-slate-800"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-black text-slate-800">دوره‌های من</h1>
            <p className="text-sm text-slate-500">مدیریت دوره‌هایی که تدریس می‌کنید.</p>
          </div>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">هنوز دوره‌ای به شما اختصاص داده نشده است</h2>
          <p className="text-slate-500">لطفاً با مدیر سیستم تماس بگیرید.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
              <div className="h-32 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-blue-300" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-black text-lg text-slate-800 mb-2">{course.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.short_description || 'بدون توضیح'}</p>
                
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration || 0} ساعت</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students_count || 0} دانشجو</span>
                </div>
                
                <div className="mt-auto flex gap-2">
                  <Link href={`/admin/courses/${course.id}/content`} className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 py-2.5 rounded-xl text-sm font-bold transition">
                    <Edit className="w-4 h-4" /> مدیریت محتوا
                  </Link>
                  <Link href={`/admin/exams/new?courseId=${course.id}`} className="flex items-center justify-center bg-orange-50 text-orange-700 hover:bg-orange-100 px-4 py-2.5 rounded-xl text-sm font-bold transition" title="ساخت آزمون برای این دوره">
                    <Award className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}