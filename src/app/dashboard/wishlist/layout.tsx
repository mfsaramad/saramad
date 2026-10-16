import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'علاقه‌مندی‌ها',
  description: 'لیست دوره‌ها و محصولات مورد علاقه شما در آموزشگاه سرآمد',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}