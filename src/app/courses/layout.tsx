import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'دوره‌های آموزشی',
  description:
    'مشاهده همه دوره‌های آموزشی سرآمد در تبریز - دوره‌های حضوری، آنلاین و ترکیبی در زمینه‌های برنامه‌نویسی، گرافیک، حسابداری، زبان، موسیقی و کسب‌وکار',
  keywords: [
    'دوره‌های آموزشی سرآمد',
    'دوره برنامه‌نویسی تبریز',
    'دوره گرافیک تبریز',
    'دوره حسابداری',
    'دوره آنلاین',
    'دوره حضوری',
  ],
  openGraph: {
    title: 'دوره‌های آموزشی سرآمد',
    description: 'همه دوره‌های حضوری، آنلاین و ترکیبی سرآمد',
    type: 'website',
  },
};

export default function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}