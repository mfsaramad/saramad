import CourseDetailClient from './CourseDetailClient';

export const dynamic = 'force-dynamic';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  return <CourseDetailClient />;
}