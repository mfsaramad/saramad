import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'قوانین و مقررات',
  description: 'قوانین و مقررات استفاده از خدمات آموزشگاه سرآمد',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}