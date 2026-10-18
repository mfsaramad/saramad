'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { CourseForm, type CourseFormData } from '@/components/admin/CourseForm';
import { supabase } from '@/lib/supabase';

interface Instructor {
  id: string;
  name: string;
}

export default function NewCoursePage() {
  const router = useRouter();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      const { data } = await supabase
        .from('users')
        .select('id, name')
        .eq('role', 'instructor');
      
      if (data) setInstructors(data);
    };
    fetchInstructors();
  }, []);

  const handleSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      // 👈 تبدیل دیتای فرم به ساختار دیتابیس (snake_case)
      const payload = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        short_description: data.shortDescription,
        mode: data.mode,
        level: data.level,
        duration: data.duration,
        sessions: data.sessions,
        price: data.price,
        image: data.image,
        instructor_id: data.instructorId,
        capacity: data.capacity,
        remaining_capacity: data.remainingCapacity,
        start_date: data.startDate,
        schedule: data.schedule,
        prerequisites: data.prerequisites,
        certificate: data.certificate,
        tags: data.tags,
        is_active: data.isActive,
      };

      const { error } = await supabase.from('courses').insert([payload]);
      if (error) throw error;
      
      alert('دوره با موفقیت ایجاد شد!');
      router.push('/admin/courses');
    } catch (error: any) {
      console.error('خطا در ایجاد دوره:', error);
      alert('خطا در ایجاد دوره: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/courses" className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">افزودن دوره جدید</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">اطلاعات دوره رو پر کن و ذخیره کن</p>
        </div>
      </div>

      {isSubmitting ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : (
        <CourseForm
          instructors={instructors}
          onSubmit={handleSubmit}
          mode="create"
        />
      )}
    </div>
  );
}