import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'حریم خصوصی',
  description:
    'سیاست حریم خصوصی آموزشگاه سرآمد - نحوه جمع‌آوری و استفاده از اطلاعات کاربران',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}