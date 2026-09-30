import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'شعبه‌ها',
  description:
    'شعبه مرکزی آموزشگاه سرآمد در تبریز - خیابان بهار، روبروی تعاون روستایی',
  keywords: ['شعبه سرآمد', 'آموزشگاه تبریز', 'آدرس آموزشگاه'],
  openGraph: {
    title: 'شعبه‌های سرآمد',
    description: 'در شعبه سرآمد منتظرت هستیم',
    type: 'website',
  },
};

export default function BranchesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}