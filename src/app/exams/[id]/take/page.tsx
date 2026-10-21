import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ExamRunner from '@/components/exams/ExamRunner';

export async function generateStaticParams() {
  const { data } = await supabase.from('exams').select('slug');
  if (!data || data.length === 0) return [{ id: 'placeholder' }];
  return data.map((exam) => ({ id: exam.slug }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TakeExamPage({ params }: Props) {
  const { id } = await params;

  // دریافت اطلاعات آزمون از دیتابیس
  const { data: examData } = await supabase
    .from('exams')
    .select('*')
    .eq('slug', id)
    .single();

  if (!examData) {
    notFound();
  }

  // مپ کردن دیتا به فرمت مورد نیاز ExamRunner
  const exam = {
    id: examData.id,
    slug: examData.slug,
    title: examData.title,
    description: examData.description,
    duration: examData.duration,
    level: examData.level,
    icon: examData.icon,
    questions: examData.exam_data?.questions || [],
  };

  return <ExamRunner exam={exam} />;
}