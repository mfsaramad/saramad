'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { ExamForm, type ExamFormData } from '@/components/admin/ExamForm';
import { supabase } from '@/lib/supabase';

export default function NewExamPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ExamFormData) => {
    setIsSubmitting(true);
    try {
      // تبدیل دیتای فرم به ساختار دیتابیس (snake_case)
      const payload = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        long_description: data.longDescription || data.description,
        type: data.type,
        type_label: data.typeLabel,
        icon: data.icon,
        color: data.color,
        questions_count: data.examData?.questions?.length || 0, // 👈 تعداد سوالات از آرایه گرفته میشه
        duration: data.duration,
        level: data.level,
        price: data.price,
        participants: data.participants || 0,
        rating: data.rating || 5.0,
        success_rate: data.successRate || 100,
        certificate: data.certificate || false,
        tags: data.tags || [],
        exam_data: {
          questions: data.examData?.questions || [],
        },
      };

      const { error } = await supabase.from('exams').insert([payload]);
      
      if (error) throw error;

      alert('آزمون با موفقیت ایجاد شد!');
      router.push('/admin/exams');
      
    } catch (error: any) {
      console.error('خطا در ایجاد آزمون:', error);
      alert('خطا در ایجاد آزمون: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/exams"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            افزودن آزمون جدید
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            اطلاعات آزمون رو پر کن و ذخیره کن
          </p>
        </div>
      </div>

      {isSubmitting ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : (
        <ExamForm onSubmit={handleSubmit} mode="create" />
      )}
    </div>
  );
}