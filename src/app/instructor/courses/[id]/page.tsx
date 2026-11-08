import { supabase } from '@/lib/supabase';
import InstructorCourseDetailClient from './InstructorCourseDetailClient'; // اگر کامپوننت جدا دارید

// این تابع به Next.js می‌گوید چه IDهایی را از قبل بسازد
export async function generateStaticParams() {
  const { data: courses } = await supabase.from('courses').select('id');
  return (courses || []).map((course) => ({
    id: course.id,
  }));
}

export default function InstructorCourseDetailPage({ params }: { params: { id: string } }) {
  return <InstructorCourseDetailClient id={params.id} />;
}