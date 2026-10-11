'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InstructorForm, type InstructorFormData } from '@/components/admin/InstructorForm';
import { useDb } from '@/hooks/useDb';

export default function NewInstructorPage() {
  const { add } = useDb('instructors');

  const handleSubmit = async (data: InstructorFormData) => {
    add(data as any);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/instructors"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            افزودن استاد جدید
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            اطلاعات استاد رو پر کن و ذخیره کن
          </p>
        </div>
      </div>

      <InstructorForm onSubmit={handleSubmit} mode="create" />
    </div>
  );
}
