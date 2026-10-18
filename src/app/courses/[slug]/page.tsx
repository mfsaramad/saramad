import CourseDetailClient from './CourseDetailClient';
import { supabase } from '@/lib/supabase';

// 👈 دریافت slug ها از دیتابیس در زمان بیلد
export async function generateStaticParams() {
  const { data: courses } = await supabase.from('courses').select('slug');
  
  if (!courses || courses.length === 0) {
    return [{ slug: 'placeholder' }]; // جلوگیری از خطای بیلد اگر دیتابیس خالی بود
  }

  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  return <CourseDetailClient slug={params.slug} />;
}