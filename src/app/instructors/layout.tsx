import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'اساتید',
  description:
    'با اساتید مجرب و حرفه‌ای آموزشگاه سرآمد تبریز آشنا شوید - متخصصان برنامه‌نویسی، گرافیک، حسابداری، زبان و موسیقی',
  keywords: [
    'اساتید سرآمد',
    'مدرس برنامه‌نویسی',
    'مدرس گرافیک',
    'اساتید تبریز',
  ],
  openGraph: {
    title: 'اساتید آموزشگاه سرآمد',
    description: 'با بهترین اساتید سرآمد یاد بگیر',
    type: 'website',
  },
};

export default function InstructorsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}