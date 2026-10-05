import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'سبد خرید',
  description:
    'سبد خرید آموزشگاه سرآمد - مشاهده و مدیریت دوره‌ها و محصولات انتخابی',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}