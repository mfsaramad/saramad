import { supabase } from '@/lib/supabase';
import TeacherCourseContentClient from './TeacherCourseContentClient'; // اگر کامپوننت جدا دارید

export async function generateStaticParams() {
  const { data: courses } = await supabase.from('courses').select('id');
  return (courses || []).map((course) => ({
    id: course.id,
  }));
}

export default function TeacherCourseContentPage({ params }: { params: { id: string } }) {
  return <TeacherCourseContentClient id={params.id} />;
}