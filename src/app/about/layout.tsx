import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'درباره ما',
  description:
    'درباره آموزشگاه سرآمد تبریز - مجتمع آموزش فنی و حرفه‌ای با ۱۵ سال تجربه و بیش از ۵۰۰۰ دانشجوی موفق',
  keywords: ['درباره سرآمد', 'آموزشگاه تبریز', 'مجتمع آموزشی'],
  openGraph: {
    title: 'درباره آموزشگاه سرآمد',
    description: 'مسیر حرفه‌ای شدن از سرآمد شروع می‌شود',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}