import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'جزئیات محصول',
  description: 'مشاهده جزئیات محصول در فروشگاه سرآمد',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}