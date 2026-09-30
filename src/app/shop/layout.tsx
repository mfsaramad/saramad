import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'فروشگاه',
  description:
    'فروشگاه آنلاین سرآمد - سوالات آزمون، جزوه‌های آموزشی و ویدیوهای دوره‌های فنی و حرفه‌ای',
  keywords: [
    'فروشگاه سرآمد',
    'سوالات آزمون',
    'جزوه آموزشی',
    'ویدیو آموزشی',
  ],
  openGraph: {
    title: 'فروشگاه سرآمد',
    description: 'منابع آموزشی و سوالات',
    type: 'website',
  },
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}