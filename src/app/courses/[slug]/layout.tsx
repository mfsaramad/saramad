import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { courses } from '@/lib/data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: 'دوره یافت نشد',
    };
  }

  return {
    title: course.title,
    description: course.shortDescription,
    keywords: course.tags,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      type: 'website',
    },
  };
}

export default function CourseDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}