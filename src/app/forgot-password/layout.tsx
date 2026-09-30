import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'فراموشی رمز عبور',
  description: 'بازیابی رمز عبور حساب کاربری آموزشگاه سرآمد',
  keywords: ['فراموشی رمز', 'بازیابی رمز', 'ریست پسورد'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}