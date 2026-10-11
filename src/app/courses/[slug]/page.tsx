import { courses } from '@/lib/data';
import CourseDetailClient from './CourseDetailClient';

// ✅ برای Static Export
export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function CourseDetailPage() {
  return <CourseDetailClient />;
}