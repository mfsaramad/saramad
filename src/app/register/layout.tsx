import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ثبت‌نام',
  description:
    'ثبت‌نام در آموزشگاه سرآمد - ساخت حساب کاربری برای دسترسی به دوره‌ها و کلاس‌های آنلاین',
  keywords: ['ثبت‌نام سرآمد', 'عضویت', 'حساب کاربری'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}