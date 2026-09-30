import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'کلاس‌های آنلاین',
  description:
    'کلاس‌های زنده و کارگاه‌های آنلاین سرآمد - شرکت در کلاس‌های زنده از هر جای ایران',
  keywords: ['کلاس آنلاین', 'کلاس زنده', 'کارگاه آنلاین'],
  openGraph: {
    title: 'کلاس‌های آنلاین سرآمد',
    description: 'کلاس‌های زنده و کارگاه‌های آنلاین',
    type: 'website',
  },
};

export default function LiveLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}