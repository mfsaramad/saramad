'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { CourseForm, type CourseFormData } from '@/components/admin/CourseForm';
import { supabase } from '@/lib/supabase';

interface Instructor {
  id: string;
  name: string;
}

interface Course {
  id: string;
  [key: string]: any;
}

function EditCourseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') || '';

  const [course, setCourse] = useState<Course | null>(null);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. دریافت لیست اساتید
        const { data: instData } = await supabase
          .from('users')
          .select('id, name')
          .eq('role', 'instructor');
        if (instData) setInstructors(instData);

        // 2. دریافت اطلاعات دوره مورد نظر
        if (id) {
          const { data: courseData, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', id)
            .single();
          
          if (error) throw error;
          if (courseData) {
            setCourse({
              ...courseData,
              instructorId: courseData.instructor_id, // برای هماهنگی با فرم
            });
          }
        }
      } catch (error) {
        console.error('خطا در دریافت اطلاعات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('courses')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      alert('دوره با موفقیت ویرایش شد!');
      router.push('/admin/courses');
    } catch (error: any) {
      console.error('خطا در ویرایش دوره:', error);
      alert('خطا در ویرایش دوره: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!id || !course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">دوره یافت نشد</h2>
        <Link href="/admin/courses" className="text-blue-600 dark:text-blue-400 hover:underline">بازگشت به لیست</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/courses" className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ویرایش دوره</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{course.title}</p>
        </div>
      </div>

      {isSubmitting ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : (
        <CourseForm
          initialData={course}
          instructors={instructors}
          onSubmit={handleSubmit}
          mode="edit"
        />
      )}
    </div>
  );
}

export default function EditCoursePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <EditCourseContent />
    </Suspense>
  );
}