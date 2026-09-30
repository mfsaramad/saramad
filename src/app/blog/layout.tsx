import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'وبلاگ',
  description:
    'آخرین مقالات و مطالب آموزشی سرآمد در زمینه برنامه‌نویسی، گرافیک، کسب‌وکار و مهارت‌های فنی و حرفه‌ای',
  keywords: [
    'وبلاگ سرآمد',
    'مقالات آموزشی',
    'آموزش برنامه‌نویسی',
    'آموزش گرافیک',
  ],
  openGraph: {
    title: 'وبلاگ آموزشگاه سرآمد',
    description: 'آخرین مقالات و مطالب آموزشی',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}