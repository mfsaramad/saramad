import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'سوالات متداول',
  description: 'پاسخ سوالات پرتکرار درباره دوره‌ها، ثبت‌نام، پرداخت و پشتیبانی آموزشگاه سرآمد',
  keywords: ['سوالات متداول', 'FAQ', 'پاسخ سوالات', 'آموزشگاه سرآمد'],
  openGraph: {
    title: 'سوالات متداول | آموزشگاه سرآمد',
    description: 'پاسخ سوالات پرتکرار کاربران',
    type: 'website',
  },
};

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}