import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'جزئیات کلاس زنده',
  description: 'مشاهده جزئیات کلاس آنلاین زنده در آموزشگاه سرآمد',
  robots: {
    index: true,
    follow: true,
  },
};

export default function LiveClassDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}