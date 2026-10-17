import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'تغییر رمز عبور',
  description: 'تنظیم رمز عبور جدید برای حساب کاربری سرآمد',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}