import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'آزمون‌های آنلاین',
  description:
    'آزمون‌های آنلاین سرآمد - آزمون‌های تعیین سطح، آزمایشی و پایانی در زمینه‌های فنی و حرفه‌ای',
  keywords: ['آزمون آنلاین', 'آزمون تعیین سطح', 'آزمون آزمایشی'],
  openGraph: {
    title: 'آزمون‌های آنلاین سرآمد',
    description: 'خودت را محک بزن',
    type: 'website',
  },
};

export default function ExamsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}