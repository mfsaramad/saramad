import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'تماس با ما',
  description:
    'تماس با آموزشگاه سرآمد تبریز - تلفن: ۰۹۳۶۲۸۴۷۹۲۲، آدرس: تبریز، خیابان بهار، روبروی تعاون روستایی',
  keywords: ['تماس با سرآمد', 'تلفن آموزشگاه', 'آدرس آموزشگاه تبریز'],
  openGraph: {
    title: 'تماس با آموزشگاه سرآمد',
    description: 'هر سؤالی داری، با ما در میان بذار',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}