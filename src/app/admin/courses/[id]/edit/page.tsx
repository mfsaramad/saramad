'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { CourseForm, type CourseFormData } from '@/components/admin/CourseForm';
import { useDb } from '@/hooks/useDb';

interface Instructor {
  id: string;
  name: string;
}

interface Course {
  id: string;
  [key: string]: any;
}

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { items: courses, update, isLoading } = useDb<Course>('courses');
  const { items: instructors } = useDb<Instructor>('instructors');

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (!isLoading) {
      const found = courses.find((c) => c.id === id);
      if (found) {
        // تبدیل instructor به instructorId برای فرم
        setCourse({
          ...found,
          instructorId: found.instructor?.id || found.instructorId || '',
        });
      }
    }
  }, [id, courses, isLoading]);

  const handleSubmit = async (data: CourseFormData) => {
    update(id, data as any);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          دوره یافت نشد
        </h2>
        <Link
          href="/admin/courses"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          بازگشت به لیست دوره‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/courses"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ویرایش دوره
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {course.title}
          </p>
        </div>
      </div>

      <CourseForm
        initialData={course}
        instructors={instructors}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  );
}