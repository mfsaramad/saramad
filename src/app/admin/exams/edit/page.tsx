'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { ExamForm, type ExamFormData } from '@/components/admin/ExamForm';
import { supabase } from '@/lib/supabase';

function EditExamContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') || '';

  const [examData, setExamData] = useState<Partial<ExamFormData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (data) {
          // تبدیل دیتای دیتابیس به فرمت فرم (camelCase)
          setExamData({
            slug: data.slug,
            title: data.title,
            description: data.description,
            longDescription: data.long_description,
            type: data.type,
            typeLabel: data.type_label,
            icon: data.icon,
            color: data.color,
            duration: data.duration,
            level: data.level,
            price: data.price,
            participants: data.participants,
            rating: data.rating,
            successRate: data.success_rate,
            certificate: data.certificate,
            tags: data.tags || [],
            examData: data.exam_data || { questions: [] },
            isActive: data.is_active,
          });
        }
      } catch (error) {
        console.error('خطا در دریافت اطلاعات آزمون:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  const handleSubmit = async (data: ExamFormData) => {
    setIsSubmitting(true);
    try {
      // تبدیل دیتای فرم به ساختار دیتابیس
      const payload = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        long_description: data.longDescription || data.description,
        type: data.type,
        type_label: data.typeLabel,
        icon: data.icon,
        color: data.color,
        questions_count: data.examData?.questions?.length || 0,
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

      const { error } = await supabase
        .from('exams')
        .update(payload)
        .eq('id', id);

      if (error) throw error;

      alert('آزمون با موفقیت ویرایش شد!');
      router.push('/admin/exams');
    } catch (error: any) {
      console.error('خطا در ویرایش آزمون:', error);
      alert('خطا در ویرایش آزمون: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!id || !examData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">آزمون یافت نشد</h2>
        <Link href="/admin/exams" className="text-blue-600 dark:text-blue-400 hover:underline">بازگشت به لیست</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/exams" className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ویرایش آزمون</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{examData.title}</p>
        </div>
      </div>

      {isSubmitting ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : (
        <ExamForm
          initialData={examData}
          onSubmit={handleSubmit}
          mode="edit"
        />
      )}
    </div>
  );
}

export default function EditExamPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    }>
      <EditExamContent />
    </Suspense>
  );
}