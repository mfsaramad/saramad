import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const siteUrl = 'https://saramad.ir';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'آموزشگاه سرآمد | مجتمع آموزش فنی و حرفه‌ای تبریز',
    template: '%s | آموزشگاه سرآمد',
  },
  description:
    'آموزشگاه سرآمد در تبریز - برگزاری دوره‌های حضوری، آنلاین و ترکیبی فنی و حرفه‌ای برای همه گروه‌های سنی بالای ۱۲ سال. برنامه‌نویسی، گرافیک، حسابداری، زبان، موسیقی و کسب‌وکار.',
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
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteUrl,
    title: 'آموزشگاه سرآمد | مجتمع آموزش فنی و حرفه‌ای تبریز',
    description:
      'مسیر حرفه‌ای شدن از سرآمد شروع می‌شود - دوره‌های حضوری، آنلاین و ترکیبی فنی و حرفه‌ای در تبریز',
    siteName: 'آموزشگاه سرآمد',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'آموزشگاه سرآمد',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'آموزشگاه سرآمد | مجتمع آموزش فنی و حرفه‌ای تبریز',
    description: 'مسیر حرفه‌ای شدن از سرآمد شروع می‌شود',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'آموزشگاه سرآمد',
    alternateName: 'Saramad Educational Institute',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'مجتمع آموزش فنی و حرفه‌ای سرآمد در تبریز - برگزاری دوره‌های حضوری، آنلاین و ترکیبی',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'خیابان بهار، روبروی تعاون روستایی',
      addressLocality: 'تبریز',
      addressRegion: 'آذربایجان شرقی',
      addressCountry: 'IR',
    },
    telephone: '+989362847922',
    email: 'info@saramad.ir',
    sameAs: [
      'https://instagram.com/saramad',
      'https://t.me/saramad',
      'https://linkedin.com/company/saramad',
      'https://youtube.com/@saramad',
    ],
  };

  return (
    <html lang="fa" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-vazir antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}