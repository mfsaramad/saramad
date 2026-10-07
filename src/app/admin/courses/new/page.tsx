'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CourseForm, type CourseFormData } from '@/components/admin/CourseForm';
import { useDb } from '@/hooks/useDb';

interface Instructor {
  id: string;
  name: string;
}

export default function NewCoursePage() {
  const { add } = useDb('courses');
  const { items: instructors } = useDb<Instructor>('instructors');

  const handleSubmit = async (data: CourseFormData) => {
    add(data as any);
  };

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
            افزودن دوره جدید
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            اطلاعات دوره رو پر کن و ذخیره کن
          </p>
        </div>
      </div>

      <CourseForm
        instructors={instructors}
        onSubmit={handleSubmit}
        mode="create"
      />
    </div>
  );
}
