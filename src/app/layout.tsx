import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { CartProvider } from '@/contexts/CartContext';

const siteUrl = 'https://mfsaramad.ir';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'آموزشگاه سرآمد | مجتمع آموزش فنی و حرفه‌ای تبریز',
    template: '%s | آموزشگاه سرآمد',
  },
  description:
    'آموزشگاه سرآمد در تبریز - برگزاری دوره‌های حضوری، آنلاین و ترکیبی فنی و حرفه‌ای برای همه گروه‌های سنی بالای ۱۲ سال.',
  keywords: [
    'آموزشگاه سرآمد',
    'آموزشگاه تبریز',
    'آموزش فنی و حرفه‌ای',
    'دوره برنامه‌نویسی',
    'دوره گرافیک',
    'دوره حسابداری',
    'دوره آنلاین',
    'دوره حضوری',
    'کلاس آنلاین',
    'آزمون آنلاین',
    'آموزشگاه تبریز بهار',
  ],
  authors: [{ name: 'آموزشگاه سرآمد', url: siteUrl }],
  creator: 'آموزشگاه سرآمد',
  publisher: 'آموزشگاه سرآمد',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteUrl,
    title: 'آموزشگاه سرآمد | مجتمع آموزش فنی و حرفه‌ای تبریز',
    description: 'مسیر حرفه‌ای شدن از سرآمد شروع می‌شود',
    siteName: 'آموزشگاه سرآمد',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'آموزشگاه سرآمد | مجتمع آموزش فنی و حرفه‌ای تبریز',
    description: 'مسیر حرفه‌ای شدن از سرآمد شروع می‌شود',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-vazir antialiased bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}