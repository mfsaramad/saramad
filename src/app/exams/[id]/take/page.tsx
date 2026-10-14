import { notFound } from 'next/navigation';
import { exams, getExamBySlug } from '@/lib/data';
import ExamRunner from '@/components/exams/ExamRunner';

// برای Static Export
export function generateStaticParams() {
  return exams.map((exam) => ({
    id: exam.slug,
  }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TakeExamPage({ params }: Props) {
  const { id } = await params;
  const exam = getExamBySlug(id);

  if (!exam) {
    notFound();
  }

  return (
    <ExamRunner
      exam={{
        id: exam.id,
        slug: exam.slug,
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
        level: exam.level,
        icon: exam.icon,
        questions: exam.examData.questions,
      }}
    />
  );
}