'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useParams } from 'next/navigation';
import { Loader2, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function InstructorCourseDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const courseId = params.id as string;

  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();
        
        if (error) throw error;
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (courseId) fetchCourse();
  }, [courseId]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  if (!course) return <div className="text-center py-20 text-red-500">دوره یافت نشد.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/instructor" className="text-slate-400 hover:text-slate-800"><ArrowRight className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-black text-slate-800">جزئیات دوره: {course.title}</h1>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-slate-600">{course.description || 'توضیحاتی برای این دوره ثبت نشده است.'}</p>
        <Link href={`/instructor/courses/${courseId}/content`} className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition">
          <BookOpen className="w-5 h-5" /> مدیریت محتوای دوره
        </Link>
      </div>
    </div>
  );
}