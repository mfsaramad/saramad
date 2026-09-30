import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ورود به حساب',
  description:
    'ورود به پنل کاربری آموزشگاه سرآمد - دسترسی به دوره‌ها، کلاس‌های آنلاین و مدارک',
  keywords: ['ورود سرآمد', 'پنل کاربری', 'لاگین'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}